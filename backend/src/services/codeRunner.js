const vm = require('vm');

const MAX_CODE_LENGTH = 20000;

function normalize(value) {
  return String(value || '').trim().replace(/\s+/g, '').toLowerCase();
}

function runJavaScript(code, input) {
  if (typeof code !== 'string' || code.length > MAX_CODE_LENGTH) {
    throw new Error(`Code must be under ${MAX_CODE_LENGTH} characters`);
  }

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
    logs,
  };
}

async function runAgainstTests({ code, language, tests }) {
  if (language !== 'javascript') {
    return {
      error: 'Only JavaScript execution is available in the local MVP runner',
      results: [],
    };
  }

  const results = [];

  for (const [index, test] of tests.entries()) {
    try {
      const startedAt = Date.now();
      const result = runJavaScript(code, test.input);
      const runtime = Date.now() - startedAt;
      const passed = normalize(result.output) === normalize(test.expected_output);
      results.push({
        label: `Case ${index + 1}`,
        input: test.input,
        expected: test.expected_output,
        actual: result.output,
        status: passed ? 'passed' : 'failed',
        runtime,
      });
    } catch (err) {
      results.push({
        label: `Case ${index + 1}`,
        input: test.input,
        expected: test.expected_output,
        actual: '',
        status: 'error',
        error: err.message,
      });
    }
  }

  return { results };
}

module.exports = {
  runAgainstTests,
  normalize,
};
