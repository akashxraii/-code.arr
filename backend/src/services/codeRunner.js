const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const vm = require('vm');

const MAX_CODE_LENGTH = 30000;
const EXECUTION_TIMEOUT_MS = 2500;

function normalize(value) {
  return String(value || '').trim().replace(/\s+/g, '').toLowerCase();
}

function ensureCode(code) {
  if (typeof code !== 'string' || code.length > MAX_CODE_LENGTH) {
    throw new Error(`Code must be under ${MAX_CODE_LENGTH} characters`);
  }
}

function runJavaScript(code, input) {
  ensureCode(code);

  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.join(' ')),
    },
    module: { exports: {} },
    exports: {},
  };
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nmodule.exports = typeof solve === 'function' ? solve : module.exports;`, sandbox, {
    timeout: 1000,
  });

  const solve = sandbox.module.exports;
  if (typeof solve !== 'function') {
    throw new Error('Define a solve(input) function');
  }

  const output = solve(input);
  return {
    output: output === undefined ? logs.join('\n') : String(output),
  };
}

function runProcess(command, args, input, options = {}) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const child = spawn(command, args, {
      cwd: options.cwd,
      shell: false,
      windowsHide: true,
    });
    let stdout = '';
    let stderr = '';
    let settled = false;

    const timer = setTimeout(() => {
      settled = true;
      child.kill();
      resolve({
        output: stdout,
        error: `Execution timed out after ${EXECUTION_TIMEOUT_MS}ms`,
        runtime: Date.now() - startedAt,
      });
    }, EXECUTION_TIMEOUT_MS);

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        output: stdout,
        error: err.code === 'ENOENT' ? `${command} runtime is not installed or not on PATH` : err.message,
        runtime: Date.now() - startedAt,
      });
    });
    child.on('close', (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        output: stdout,
        error: code === 0 ? '' : stderr || `Process exited with code ${code}`,
        runtime: Date.now() - startedAt,
      });
    });

    child.stdin.end(input || '');
  });
}

async function withTempDir(task) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'technocode-'));
  try {
    return await task(dir);
  } finally {
    await fs.rm(dir, { force: true, recursive: true });
  }
}

function pythonWrapper(code) {
  return `${code}

if 'solve' not in globals():
    raise Exception('Define a solve(input) function')

import sys
result = solve(sys.stdin.read())
if result is not None:
    sys.stdout.write(str(result))
`;
}

function javaWrapper(code) {
  return `${code}

class Main {
  public static void main(String[] args) throws Exception {
    String input = new String(System.in.readAllBytes());
    String output = Solution.solve(input);
    if (output != null) System.out.print(output);
  }
}
`;
}

function twoSumJavaWrapper(code) {
  return `import java.util.*;

${code}

class Main {
  private static String readAll() throws Exception {
    return new String(System.in.readAllBytes());
  }

  private static String valueAfter(String input, String key) {
    for (String line : input.split("\\\\R")) {
      String trimmed = line.trim();
      if (trimmed.startsWith(key + " = ")) {
        return trimmed.substring((key + " = ").length()).trim();
      }
    }
    return "";
  }

  private static int[] parseIntArray(String raw) {
    raw = raw.replace("[", "").replace("]", "").trim();
    if (raw.isEmpty()) return new int[0];
    String[] parts = raw.split(",");
    int[] values = new int[parts.length];
    for (int i = 0; i < parts.length; i++) {
      values[i] = Integer.parseInt(parts[i].trim());
    }
    return values;
  }

  public static void main(String[] args) throws Exception {
    String input = readAll();
    int[] nums = parseIntArray(valueAfter(input, "nums"));
    int target = Integer.parseInt(valueAfter(input, "target"));
    int[] result = new Solution().twoSum(nums, target);
    System.out.print(Arrays.toString(result).replace(" ", ""));
  }
}
`;
}

function cppWrapper(code) {
  return `#include <bits/stdc++.h>
using namespace std;

${code}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  ostringstream buffer;
  buffer << cin.rdbuf();
  cout << solve(buffer.str());
  return 0;
}
`;
}

function cWrapper(code) {
  return `#include <stdio.h>
#include <stdlib.h>

${code}

int main(void) {
  size_t capacity = 4096;
  size_t length = 0;
  char *input = malloc(capacity);
  if (!input) return 1;
  int ch;
  while ((ch = getchar()) != EOF) {
    if (length + 1 >= capacity) {
      capacity *= 2;
      char *next = realloc(input, capacity);
      if (!next) {
        free(input);
        return 1;
      }
      input = next;
    }
    input[length++] = (char)ch;
  }
  input[length] = '\\0';
  char *output = solve(input);
  if (output) printf("%s", output);
  free(input);
  return 0;
}
`;
}

function goWrapper(code) {
  return `package main

import (
  "fmt"
  "io"
  "os"
)

${code}

func main() {
  input, _ := io.ReadAll(os.Stdin)
  fmt.Print(solve(string(input)))
}
`;
}

async function runPython(code, input) {
  return withTempDir(async (dir) => {
    const file = path.join(dir, 'solution.py');
    await fs.writeFile(file, pythonWrapper(code));
    return runProcess('python', [file], input, { cwd: dir });
  });
}

async function runJava(code, input, problem) {
  return withTempDir(async (dir) => {
    const file = path.join(dir, 'Main.java');
    await fs.writeFile(file, problem?.slug === 'two-sum' ? twoSumJavaWrapper(code) : javaWrapper(code));
    const compile = await runProcess('javac', [file], '', { cwd: dir });
    if (compile.error) return compile;
    return runProcess('java', ['-cp', dir, 'Main'], input, { cwd: dir });
  });
}

async function runCompiledCFamily(code, input, config) {
  return withTempDir(async (dir) => {
    const source = path.join(dir, config.source);
    const binary = path.join(dir, process.platform === 'win32' ? 'main.exe' : 'main');
    await fs.writeFile(source, config.wrap(code));
    const compile = await runProcess(config.compiler, [...config.args, source, '-o', binary], '', {
      cwd: dir,
    });
    if (compile.error) return compile;
    return runProcess(binary, [], input, { cwd: dir });
  });
}

async function runGo(code, input) {
  return withTempDir(async (dir) => {
    const file = path.join(dir, 'main.go');
    await fs.writeFile(file, goWrapper(code));
    return runProcess('go', ['run', file], input, { cwd: dir });
  });
}

const runners = {
  javascript: async (code, input) => runJavaScript(code, input),
  python: runPython,
  java: runJava,
  cpp: (code, input) =>
    runCompiledCFamily(code, input, {
      source: 'main.cpp',
      compiler: 'g++',
      args: ['-std=c++17', '-O2'],
      wrap: cppWrapper,
    }),
  c: (code, input) =>
    runCompiledCFamily(code, input, {
      source: 'main.c',
      compiler: 'gcc',
      args: ['-O2'],
      wrap: cWrapper,
    }),
  go: runGo,
};

async function runSingleCase({ code, language, input, problem }) {
  ensureCode(code);
  const runner = runners[language];
  if (!runner) {
    return {
      output: '',
      error: `${language} is not supported by this runner`,
      runtime: 0,
    };
  }

  const startedAt = Date.now();
  try {
    const result = await runner(code, input, problem);
    return {
      output: result.output || '',
      error: result.error || '',
      runtime: result.runtime ?? Date.now() - startedAt,
    };
  } catch (err) {
    return {
      output: '',
      error: err.message,
      runtime: Date.now() - startedAt,
    };
  }
}

async function runAgainstTests({ code, language, tests, problem }) {
  const results = [];

  for (const [index, test] of tests.entries()) {
    const result = await runSingleCase({ code, language, input: test.input, problem });
    const passed = !result.error && normalize(result.output) === normalize(test.expected_output);
    results.push({
      label: `Case ${index + 1}`,
      input: test.input,
      expected: test.expected_output,
      actual: result.output,
      status: result.error ? 'error' : passed ? 'passed' : 'failed',
      runtime: result.runtime,
      error: result.error,
    });
  }

  return {
    error: results.find((item) => item.error)?.error || '',
    results,
  };
}

module.exports = {
  runAgainstTests,
  normalize,
};
