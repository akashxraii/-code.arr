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

function getFunctionName(problem) {
  return problem?.functionName || problem?.function_name || 'solve';
}

function getInputSignature(problem) {
  return problem?.inputSignature || problem?.input_signature || [];
}

function getOutputSignature(problem) {
  return problem?.outputSignature || problem?.output_signature || 'string';
}

function isTypedProblem(problem) {
  return getFunctionName(problem) !== 'solve' && getInputSignature(problem).length > 0;
}

function parseCaseInput(input) {
  const values = {};
  for (const line of String(input || '').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_]\w*)\s*=\s*([\s\S]*?)\s*$/);
    if (match) values[match[1]] = parseRawValue(match[2]);
  }
  return values;
}

function parseRawValue(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  if (/^true$/i.test(value)) return true;
  if (/^false$/i.test(value)) return false;
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith('"') && value.endsWith('"')) return JSON.parse(value);
  if (value.startsWith('[')) return JSON.parse(value);
  return value;
}

function typedArgsFromInput(input, problem) {
  const values = parseCaseInput(input);
  return getInputSignature(problem).map((param) => values[param.name]);
}

function stableJson(value) {
  return JSON.stringify(value);
}

function serializeTypedOutput(value, type) {
  if (value === undefined || value === null) return type === 'string' ? '' : 'null';
  if (type === 'boolean') return String(Boolean(value)).toLowerCase();
  if (type === 'string') return String(value);
  if (type === 'double') return Number(value).toString();
  if (type === 'int' || type === 'long') return Math.trunc(Number(value)).toString();
  return stableJson(value);
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

function jsHelpers() {
  return `
class ListNode {
  constructor(val = 0, next = null) { this.val = val; this.next = next; }
}
class TreeNode {
  constructor(val = 0, left = null, right = null) { this.val = val; this.left = left; this.right = right; }
}
class Node {
  constructor(val = 0, neighbors = []) { this.val = val; this.neighbors = neighbors; }
}
function __buildList(values) {
  const dummy = new ListNode(0);
  let tail = dummy;
  for (const value of values || []) {
    tail.next = new ListNode(value);
    tail = tail.next;
  }
  return dummy.next;
}
function __listToArray(head) {
  const out = [];
  const seen = new Set();
  while (head && !seen.has(head)) {
    seen.add(head);
    out.push(head.val);
    head = head.next;
  }
  return out;
}
function __buildTree(values) {
  if (!values || values.length === 0 || values[0] == null) return null;
  const nodes = values.map((value) => value == null ? null : new TreeNode(value));
  for (let i = 0, child = 1; child < nodes.length; i++) {
    if (!nodes[i]) continue;
    nodes[i].left = nodes[child++] || null;
    if (child < nodes.length) nodes[i].right = nodes[child++] || null;
  }
  return nodes[0];
}
function __treeToArray(root) {
  if (!root) return [];
  const out = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (!node) {
      out.push(null);
      continue;
    }
    out.push(node.val);
    queue.push(node.left || null, node.right || null);
  }
  while (out.length && out[out.length - 1] == null) out.pop();
  return out;
}
function __buildGraph(adjList) {
  if (!adjList || adjList.length === 0) return null;
  const nodes = adjList.map((_, index) => new Node(index + 1));
  adjList.forEach((neighbors, index) => {
    nodes[index].neighbors = (neighbors || []).map((value) => nodes[value - 1]).filter(Boolean);
  });
  return nodes[0];
}
function __graphToAdjList(node) {
  if (!node) return [];
  const seen = new Map();
  const queue = [node];
  seen.set(node.val, node);
  for (let i = 0; i < queue.length; i++) {
    for (const neighbor of queue[i].neighbors || []) {
      if (!seen.has(neighbor.val)) {
        seen.set(neighbor.val, neighbor);
        queue.push(neighbor);
      }
    }
  }
  return [...seen.keys()].sort((a, b) => a - b).map((id) =>
    (seen.get(id).neighbors || []).map((neighbor) => neighbor.val).sort((a, b) => a - b)
  );
}
function __hydrate(value, type) {
  if (type === 'ListNode') return __buildList(value);
  if (type === 'TreeNode') return __buildTree(value);
  if (type === 'Node') return __buildGraph(value);
  return value;
}
function __serialize(value, type) {
  if (type === 'ListNode') return JSON.stringify(__listToArray(value));
  if (type === 'TreeNode') return JSON.stringify(__treeToArray(value));
  if (type === 'Node') return JSON.stringify(__graphToAdjList(value));
  if (type === 'boolean') return String(Boolean(value)).toLowerCase();
  if (type === 'string') return value == null ? '' : String(value);
  if (type === 'int' || type === 'long') return String(Math.trunc(Number(value)));
  if (type === 'double') return String(Number(value));
  return JSON.stringify(value);
}
`;
}

function runJavaScript(code, input, problem) {
  ensureCode(code);

  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.join(' ')),
    },
    module: { exports: {} },
    exports: {},
  };

  if (!isTypedProblem(problem)) {
    vm.createContext(sandbox);
    vm.runInContext(`${code}\nmodule.exports = typeof solve === 'function' ? solve : module.exports;`, sandbox, {
      timeout: 1000,
    });

    const solve = sandbox.module.exports;
    if (typeof solve !== 'function') throw new Error('Define a solve(input) function');

    const output = solve(input);
    return { output: output === undefined ? logs.join('\n') : String(output) };
  }

  const functionName = getFunctionName(problem);
  const inputSignature = getInputSignature(problem);
  const outputSignature = getOutputSignature(problem);
  const argsJson = JSON.stringify(typedArgsFromInput(input, problem));
  const typeJson = JSON.stringify(inputSignature.map((param) => param.type));

  vm.createContext(sandbox);
  vm.runInContext(
    `${jsHelpers()}
${code}
const __fn = typeof ${functionName} === 'function'
  ? ${functionName}
  : (typeof Solution === 'function' ? (...args) => new Solution().${functionName}(...args) : module.exports);
if (typeof __fn !== 'function') throw new Error('Define ${functionName}');
const __rawArgs = ${argsJson};
const __types = ${typeJson};
const __args = __rawArgs.map((value, index) => __hydrate(value, __types[index]));
module.exports = __serialize(__fn(...__args), ${JSON.stringify(outputSignature)});
`,
    sandbox,
    { timeout: 1000 },
  );

  return { output: String(sandbox.module.exports ?? logs.join('\n')) };
}

function pythonLiteral(value) {
  if (value === true) return 'True';
  if (value === false) return 'False';
  if (value === null) return 'None';
  if (Array.isArray(value)) return `[${value.map(pythonLiteral).join(', ')}]`;
  return JSON.stringify(value);
}

function pythonWrapper(code, input, problem) {
  if (!isTypedProblem(problem)) {
    return `${code}

if 'solve' not in globals():
    raise Exception('Define a solve(input) function')

import sys
result = solve(sys.stdin.read())
if result is not None:
    sys.stdout.write(str(result))
`;
  }

  const functionName = getFunctionName(problem);
  const args = typedArgsFromInput(input, problem);
  const types = getInputSignature(problem).map((param) => param.type);
  const outputType = getOutputSignature(problem);

  return `import json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def __build_list(values):
    dummy = ListNode()
    tail = dummy
    for value in values or []:
        tail.next = ListNode(value)
        tail = tail.next
    return dummy.next

def __list_to_array(head):
    out, seen = [], set()
    while head and id(head) not in seen:
        seen.add(id(head))
        out.append(head.val)
        head = head.next
    return out

def __build_tree(values):
    if not values or values[0] is None:
        return None
    nodes = [None if value is None else TreeNode(value) for value in values]
    child = 1
    for node in nodes:
        if node is None:
            continue
        if child < len(nodes):
            node.left = nodes[child]
            child += 1
        if child < len(nodes):
            node.right = nodes[child]
            child += 1
    return nodes[0]

def __tree_to_array(root):
    if not root:
        return []
    out, queue = [], [root]
    while queue:
        node = queue.pop(0)
        if node is None:
            out.append(None)
            continue
        out.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while out and out[-1] is None:
        out.pop()
    return out

def __build_graph(adj_list):
    if not adj_list:
        return None
    nodes = [Node(i + 1) for i in range(len(adj_list))]
    for i, neighbors in enumerate(adj_list):
        nodes[i].neighbors = [nodes[value - 1] for value in neighbors if 0 < value <= len(nodes)]
    return nodes[0]

def __graph_to_adj_list(node):
    if not node:
        return []
    seen, queue = {node.val: node}, [node]
    for item in queue:
        for neighbor in item.neighbors:
            if neighbor.val not in seen:
                seen[neighbor.val] = neighbor
                queue.append(neighbor)
    return [sorted(n.val for n in seen[key].neighbors) for key in sorted(seen)]

def __hydrate(value, type_name):
    if type_name == 'ListNode':
        return __build_list(value)
    if type_name == 'TreeNode':
        return __build_tree(value)
    if type_name == 'Node':
        return __build_graph(value)
    return value

def __serialize(value, type_name):
    if type_name == 'ListNode':
        return json.dumps(__list_to_array(value), separators=(',', ':'))
    if type_name == 'TreeNode':
        return json.dumps(__tree_to_array(value), separators=(',', ':'))
    if type_name == 'Node':
        return json.dumps(__graph_to_adj_list(value), separators=(',', ':'))
    if type_name == 'boolean':
        return str(bool(value)).lower()
    if type_name == 'string':
        return '' if value is None else str(value)
    if type_name in ('int', 'long'):
        return str(int(value))
    if type_name == 'double':
        return str(float(value)).rstrip('0').rstrip('.') if float(value) % 1 else str(int(value))
    return json.dumps(value, separators=(',', ':'))

${code}

__raw_args = ${pythonLiteral(args)}
__types = ${pythonLiteral(types)}
__args = [__hydrate(value, __types[index]) for index, value in enumerate(__raw_args)]
__solution = Solution()
__result = __solution.${functionName}(*__args)
print(__serialize(__result, ${pythonLiteral(outputType)}), end='')
`;
}

function javaType(type) {
  return {
    int: 'int',
    long: 'long',
    double: 'double',
    boolean: 'boolean',
    string: 'String',
    'int[]': 'int[]',
    'long[]': 'long[]',
    'double[]': 'double[]',
    'boolean[]': 'boolean[]',
    'string[]': 'String[]',
    'int[][]': 'int[][]',
    'string[][]': 'String[][]',
    ListNode: 'ListNode',
    TreeNode: 'TreeNode',
    Node: 'Node',
  }[type] || 'String';
}

function javaValue(value, type) {
  if (type === 'string') return JSON.stringify(String(value ?? ''));
  if (type === 'boolean') return value ? 'true' : 'false';
  if (type === 'long') return `${Math.trunc(Number(value))}L`;
  if (type === 'double') return `${Number(value)}`;
  if (type === 'int') return `${Math.trunc(Number(value))}`;
  if (type === 'int[]') return `new int[]{${(value || []).map((item) => javaValue(item, 'int')).join(',')}}`;
  if (type === 'string[]') return `new String[]{${(value || []).map((item) => javaValue(item, 'string')).join(',')}}`;
  if (type === 'int[][]') return `new int[][]{${(value || []).map((row) => javaValue(row, 'int[]')).join(',')}}`;
  if (type === 'string[][]') return `new String[][]{${(value || []).map((row) => javaValue(row, 'string[]')).join(',')}}`;
  if (type === 'ListNode') return `buildList(${javaValue(value, 'int[]')})`;
  if (type === 'TreeNode') return `buildTree(new Integer[]{${(value || []).map((item) => item === null ? 'null' : javaValue(item, 'int')).join(',')}})`;
  if (type === 'Node') return `buildGraph(${javaValue(value, 'int[][]')})`;
  return JSON.stringify(String(value ?? ''));
}

function splitJavaImports(code) {
  const imports = [];
  const body = String(code || '').replace(/^\s*import\s+[^;]+;\s*$/gm, (line) => {
    imports.push(line.trim());
    return '';
  });
  return {
    imports: [...new Set(imports)].join('\n'),
    body,
  };
}

function javaWrapper(code, input, problem) {
  const javaCode = splitJavaImports(code);
  if (!isTypedProblem(problem)) {
    return `${javaCode.imports}

${javaCode.body}

class Main {
  public static void main(String[] args) throws Exception {
    String input = new String(System.in.readAllBytes());
    String output = Solution.solve(input);
    if (output != null) System.out.print(output);
  }
}
`;
  }

  const functionName = getFunctionName(problem);
  const inputSignature = getInputSignature(problem);
  const outputSignature = getOutputSignature(problem);
  const args = typedArgsFromInput(input, problem);
  const declarations = inputSignature
    .map((param, index) => `    ${javaType(param.type)} ${param.name} = ${javaValue(args[index], param.type)};`)
    .join('\n');
  const callArgs = inputSignature.map((param) => param.name).join(', ');

  return `import java.util.*;
${javaCode.imports}

class ListNode {
  int val;
  ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;
  TreeNode() {}
  TreeNode(int val) { this.val = val; }
  TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Node {
  public int val;
  public List<Node> neighbors;
  public Node() { val = 0; neighbors = new ArrayList<>(); }
  public Node(int val) { this.val = val; neighbors = new ArrayList<>(); }
  public Node(int val, ArrayList<Node> neighbors) { this.val = val; this.neighbors = neighbors; }
}

${javaCode.body}

class Main {
  static ListNode buildList(int[] values) {
    ListNode dummy = new ListNode();
    ListNode tail = dummy;
    for (int value : values) {
      tail.next = new ListNode(value);
      tail = tail.next;
    }
    return dummy.next;
  }

  static String listToString(ListNode head) {
    ArrayList<Integer> out = new ArrayList<>();
    HashSet<ListNode> seen = new HashSet<>();
    while (head != null && !seen.contains(head)) {
      seen.add(head);
      out.add(head.val);
      head = head.next;
    }
    return out.toString().replace(" ", "");
  }

  static TreeNode buildTree(Integer[] values) {
    if (values.length == 0 || values[0] == null) return null;
    TreeNode[] nodes = new TreeNode[values.length];
    for (int i = 0; i < values.length; i++) if (values[i] != null) nodes[i] = new TreeNode(values[i]);
    for (int i = 0, child = 1; child < nodes.length; i++) {
      if (nodes[i] == null) continue;
      nodes[i].left = nodes[child++];
      if (child < nodes.length) nodes[i].right = nodes[child++];
    }
    return nodes[0];
  }

  static String treeToString(TreeNode root) {
    if (root == null) return "[]";
    ArrayList<String> out = new ArrayList<>();
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
      TreeNode node = queue.poll();
      if (node == null) {
        out.add("null");
      } else {
        out.add(String.valueOf(node.val));
        queue.add(node.left);
        queue.add(node.right);
      }
    }
    while (!out.isEmpty() && out.get(out.size() - 1).equals("null")) out.remove(out.size() - 1);
    return "[" + String.join(",", out) + "]";
  }

  static Node buildGraph(int[][] adjList) {
    if (adjList.length == 0) return null;
    Node[] nodes = new Node[adjList.length];
    for (int i = 0; i < adjList.length; i++) nodes[i] = new Node(i + 1);
    for (int i = 0; i < adjList.length; i++) {
      for (int neighbor : adjList[i]) if (neighbor > 0 && neighbor <= nodes.length) nodes[i].neighbors.add(nodes[neighbor - 1]);
    }
    return nodes[0];
  }

  static String graphToString(Node node) {
    if (node == null) return "[]";
    Map<Integer, Node> seen = new TreeMap<>();
    Queue<Node> queue = new ArrayDeque<>();
    seen.put(node.val, node);
    queue.add(node);
    while (!queue.isEmpty()) {
      Node current = queue.poll();
      for (Node neighbor : current.neighbors) {
        if (!seen.containsKey(neighbor.val)) {
          seen.put(neighbor.val, neighbor);
          queue.add(neighbor);
        }
      }
    }
    ArrayList<String> rows = new ArrayList<>();
    for (Node current : seen.values()) {
      ArrayList<Integer> values = new ArrayList<>();
      for (Node neighbor : current.neighbors) values.add(neighbor.val);
      Collections.sort(values);
      rows.add(values.toString().replace(" ", ""));
    }
    return "[" + String.join(",", rows) + "]";
  }

  static String stringArrayToString(String[] values) {
    ArrayList<String> out = new ArrayList<>();
    for (String value : values) out.add("\\"" + value + "\\"");
    return "[" + String.join(",", out) + "]";
  }

  static String stringMatrixToString(String[][] values) {
    ArrayList<String> out = new ArrayList<>();
    for (String[] row : values) out.add(stringArrayToString(row));
    return "[" + String.join(",", out) + "]";
  }

  static String serialize(Object value, String type) {
    if (value == null) return type.equals("string") ? "" : "null";
    if (type.equals("ListNode")) return listToString((ListNode) value);
    if (type.equals("TreeNode")) return treeToString((TreeNode) value);
    if (type.equals("Node")) return graphToString((Node) value);
    if (type.equals("string[][]")) return stringMatrixToString((String[][]) value);
    if (type.endsWith("[][]")) return Arrays.deepToString((Object[]) value).replace(" ", "");
    if (type.equals("int[]")) return Arrays.toString((int[]) value).replace(" ", "");
    if (type.equals("long[]")) return Arrays.toString((long[]) value).replace(" ", "");
    if (type.equals("double[]")) return Arrays.toString((double[]) value).replace(" ", "");
    if (type.equals("boolean[]")) return Arrays.toString((boolean[]) value).replace(" ", "");
    if (type.equals("string[]")) return stringArrayToString((String[]) value);
    return String.valueOf(value);
  }

  public static void main(String[] args) throws Exception {
${declarations}
    Object result = new Solution().${functionName}(${callArgs});
    System.out.print(serialize(result, ${JSON.stringify(outputSignature)}));
  }
}
`;
}

function cppType(type) {
  return {
    int: 'int',
    long: 'long long',
    double: 'double',
    boolean: 'bool',
    string: 'string',
    'int[]': 'vector<int>',
    'string[]': 'vector<string>',
    'int[][]': 'vector<vector<int>>',
    'string[][]': 'vector<vector<string>>',
    ListNode: 'ListNode*',
    TreeNode: 'TreeNode*',
    Node: 'Node*',
  }[type] || 'string';
}

function cppValue(value, type) {
  if (type === 'string') return JSON.stringify(String(value ?? ''));
  if (type === 'boolean') return value ? 'true' : 'false';
  if (type === 'long') return `${Math.trunc(Number(value))}LL`;
  if (type === 'double') return `${Number(value)}`;
  if (type === 'int') return `${Math.trunc(Number(value))}`;
  if (type === 'int[]') return `vector<int>{${(value || []).map((item) => cppValue(item, 'int')).join(',')}}`;
  if (type === 'string[]') return `vector<string>{${(value || []).map((item) => cppValue(item, 'string')).join(',')}}`;
  if (type === 'int[][]') return `vector<vector<int>>{${(value || []).map((row) => cppValue(row, 'int[]')).join(',')}}`;
  if (type === 'string[][]') return `vector<vector<string>>{${(value || []).map((row) => cppValue(row, 'string[]')).join(',')}}`;
  if (type === 'ListNode') return `buildList(${cppValue(value, 'int[]')})`;
  if (type === 'TreeNode') return `buildTree(vector<optional<int>>{${(value || []).map((item) => item === null ? 'nullopt' : `optional<int>{${cppValue(item, 'int')}}`).join(',')}})`;
  if (type === 'Node') return `buildGraph(${cppValue(value, 'int[][]')})`;
  return JSON.stringify(String(value ?? ''));
}

function cppWrapper(code, input, problem) {
  if (!isTypedProblem(problem)) {
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

  const functionName = getFunctionName(problem);
  const inputSignature = getInputSignature(problem);
  const outputSignature = getOutputSignature(problem);
  const args = typedArgsFromInput(input, problem);
  const declarations = inputSignature
    .map((param, index) => `  ${cppType(param.type)} ${param.name} = ${cppValue(args[index], param.type)};`)
    .join('\n');
  const callArgs = inputSignature.map((param) => param.name).join(', ');

  return `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
  int val;
  ListNode *next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode *next) : val(x), next(next) {}
};

struct TreeNode {
  int val;
  TreeNode *left;
  TreeNode *right;
  TreeNode() : val(0), left(nullptr), right(nullptr) {}
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Node {
public:
  int val;
  vector<Node*> neighbors;
  Node() : val(0), neighbors(vector<Node*>()) {}
  Node(int _val) : val(_val), neighbors(vector<Node*>()) {}
  Node(int _val, vector<Node*> _neighbors) : val(_val), neighbors(_neighbors) {}
};

${code}

ListNode* buildList(const vector<int>& values) {
  ListNode dummy;
  ListNode* tail = &dummy;
  for (int value : values) {
    tail->next = new ListNode(value);
    tail = tail->next;
  }
  return dummy.next;
}

TreeNode* buildTree(const vector<optional<int>>& values) {
  if (values.empty() || !values[0].has_value()) return nullptr;
  vector<TreeNode*> nodes(values.size(), nullptr);
  for (size_t i = 0; i < values.size(); i++) if (values[i].has_value()) nodes[i] = new TreeNode(values[i].value());
  for (size_t i = 0, child = 1; child < nodes.size(); i++) {
    if (!nodes[i]) continue;
    nodes[i]->left = nodes[child++];
    if (child < nodes.size()) nodes[i]->right = nodes[child++];
  }
  return nodes[0];
}

Node* buildGraph(const vector<vector<int>>& adjList) {
  if (adjList.empty()) return nullptr;
  vector<Node*> nodes;
  for (int i = 0; i < (int)adjList.size(); i++) nodes.push_back(new Node(i + 1));
  for (int i = 0; i < (int)adjList.size(); i++) {
    for (int neighbor : adjList[i]) if (neighbor > 0 && neighbor <= (int)nodes.size()) nodes[i]->neighbors.push_back(nodes[neighbor - 1]);
  }
  return nodes[0];
}

template <typename T>
string vectorToString(const vector<T>& values);

template <typename T>
string scalarToString(const T& value) {
  if constexpr (is_same_v<T, string>) return string("\\"") + value + "\\"";
  else if constexpr (is_same_v<T, bool>) return value ? "true" : "false";
  else return to_string(value);
}

template <typename T>
string vectorToString(const vector<T>& values) {
  string out = "[";
  for (size_t i = 0; i < values.size(); i++) {
    if (i) out += ",";
    if constexpr (is_same_v<T, vector<int>> || is_same_v<T, vector<string>>) out += vectorToString(values[i]);
    else out += scalarToString(values[i]);
  }
  out += "]";
  return out;
}

string listToString(ListNode* head) {
  vector<int> out;
  unordered_set<ListNode*> seen;
  while (head && !seen.count(head)) {
    seen.insert(head);
    out.push_back(head->val);
    head = head->next;
  }
  return vectorToString(out);
}

string treeToString(TreeNode* root) {
  if (!root) return "[]";
  vector<string> out;
  queue<TreeNode*> q;
  q.push(root);
  while (!q.empty()) {
    TreeNode* node = q.front();
    q.pop();
    if (!node) {
      out.push_back("null");
    } else {
      out.push_back(to_string(node->val));
      q.push(node->left);
      q.push(node->right);
    }
  }
  while (!out.empty() && out.back() == "null") out.pop_back();
  string result = "[";
  for (size_t i = 0; i < out.size(); i++) {
    if (i) result += ",";
    result += out[i];
  }
  return result + "]";
}

string graphToString(Node* node) {
  if (!node) return "[]";
  map<int, Node*> seen;
  queue<Node*> q;
  seen[node->val] = node;
  q.push(node);
  while (!q.empty()) {
    Node* current = q.front();
    q.pop();
    for (Node* neighbor : current->neighbors) {
      if (!seen.count(neighbor->val)) {
        seen[neighbor->val] = neighbor;
        q.push(neighbor);
      }
    }
  }
  vector<vector<int>> out;
  for (auto& [_, current] : seen) {
    vector<int> row;
    for (Node* neighbor : current->neighbors) row.push_back(neighbor->val);
    sort(row.begin(), row.end());
    out.push_back(row);
  }
  return vectorToString(out);
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
${declarations}
  auto result = Solution().${functionName}(${callArgs});
  if constexpr (is_same_v<decltype(result), ListNode*>) cout << listToString(result);
  else if constexpr (is_same_v<decltype(result), TreeNode*>) cout << treeToString(result);
  else if constexpr (is_same_v<decltype(result), Node*>) cout << graphToString(result);
  else if constexpr (is_same_v<decltype(result), string>) cout << result;
  else if constexpr (is_same_v<decltype(result), bool>) cout << (result ? "true" : "false");
  else if constexpr (is_same_v<decltype(result), vector<int>> || is_same_v<decltype(result), vector<string>> || is_same_v<decltype(result), vector<vector<int>>> || is_same_v<decltype(result), vector<vector<string>>>) cout << vectorToString(result);
  else cout << result;
  (void)${JSON.stringify(outputSignature)};
  return 0;
}
`;
}

function cType(type) {
  return {
    int: 'int',
    long: 'long long',
    double: 'double',
    boolean: 'int',
    string: 'const char*',
    'int[]': 'IntArray',
    'string[]': 'StringArray',
    'int[][]': 'IntMatrix',
    'string[][]': 'StringMatrix',
    ListNode: 'ListNode*',
    TreeNode: 'TreeNode*',
    Node: 'Node*',
  }[type] || 'const char*';
}

function cArrayLiteral(name, value, type) {
  if (type === 'int[]') {
    return `int ${name}_data[] = {${(value || []).map((item) => Math.trunc(Number(item))).join(',')}};\n  IntArray ${name} = { ${name}_data, ${value?.length || 0} };`;
  }
  if (type === 'string[]') {
    return `const char* ${name}_data[] = {${(value || []).map((item) => JSON.stringify(String(item))).join(',')}};\n  StringArray ${name} = { ${name}_data, ${value?.length || 0} };`;
  }
  if (type === 'int[][]') {
    const rows = value || [];
    const rowDefs = rows.map((row, index) => `int ${name}_${index}_data[] = {${row.map((item) => Math.trunc(Number(item))).join(',')}};\n  IntArray ${name}_${index} = { ${name}_${index}_data, ${row.length} };`).join('\n  ');
    return `${rowDefs}\n  IntArray ${name}_rows[] = {${rows.map((_, index) => `${name}_${index}`).join(',')}};\n  IntMatrix ${name} = { ${name}_rows, ${rows.length} };`;
  }
  if (type === 'string[][]') {
    const rows = value || [];
    const rowDefs = rows.map((row, index) => `const char* ${name}_${index}_data[] = {${row.map((item) => JSON.stringify(String(item))).join(',')}};\n  StringArray ${name}_${index} = { ${name}_${index}_data, ${row.length} };`).join('\n  ');
    return `${rowDefs}\n  StringArray ${name}_rows[] = {${rows.map((_, index) => `${name}_${index}`).join(',')}};\n  StringMatrix ${name} = { ${name}_rows, ${rows.length} };`;
  }
  return '';
}

function cScalarValue(value, type) {
  if (type === 'string') return JSON.stringify(String(value ?? ''));
  if (type === 'boolean') return value ? '1' : '0';
  if (type === 'long') return `${Math.trunc(Number(value))}LL`;
  if (type === 'double') return `${Number(value)}`;
  if (type === 'int') return `${Math.trunc(Number(value))}`;
  return '0';
}

function cWrapper(code, input, problem) {
  if (!isTypedProblem(problem)) {
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

  const functionName = getFunctionName(problem);
  const inputSignature = getInputSignature(problem);
  const outputSignature = getOutputSignature(problem);
  const args = typedArgsFromInput(input, problem);
  const declarations = inputSignature
    .map((param, index) => {
      if (param.type.endsWith('[]') || param.type.endsWith('[][]')) return `  ${cArrayLiteral(param.name, args[index], param.type)}`;
      if (param.type === 'ListNode') return `  ListNode* ${param.name} = build_list((int[]){${(args[index] || []).join(',')}}, ${args[index]?.length || 0});`;
      return `  ${cType(param.type)} ${param.name} = ${cScalarValue(args[index], param.type)};`;
    })
    .join('\n');
  const callArgs = inputSignature.map((param) => param.name).join(', ');
  const call = `${functionName}(${callArgs})`;
  const print =
    outputSignature === 'int' ? `  printf("%d", ${call});` :
    outputSignature === 'long' ? `  printf("%lld", ${call});` :
    outputSignature === 'double' ? `  printf("%g", ${call});` :
    outputSignature === 'boolean' ? `  printf("%s", ${call} ? "true" : "false");` :
    outputSignature === 'string' ? `  printf("%s", ${call});` :
    outputSignature === 'int[]' ? `  print_int_array(${call});` :
    outputSignature === 'string[]' ? `  print_string_array(${call});` :
    outputSignature === 'int[][]' ? `  print_int_matrix(${call});` :
    outputSignature === 'ListNode' ? `  print_list(${call});` :
    `  printf("%s", ${call});`;

  return `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct { int* data; int length; } IntArray;
typedef struct { const char** data; int length; } StringArray;
typedef struct { IntArray* rows; int length; } IntMatrix;
typedef struct { StringArray* rows; int length; } StringMatrix;
typedef struct ListNode { int val; struct ListNode* next; } ListNode;
typedef struct TreeNode { int val; struct TreeNode* left; struct TreeNode* right; } TreeNode;
typedef struct Node { int val; struct Node** neighbors; int neighborsSize; } Node;

ListNode* build_list(int values[], int length) {
  ListNode dummy = {0, NULL};
  ListNode* tail = &dummy;
  for (int i = 0; i < length; i++) {
    tail->next = malloc(sizeof(ListNode));
    tail = tail->next;
    tail->val = values[i];
    tail->next = NULL;
  }
  return dummy.next;
}

void print_int_array(IntArray values) {
  printf("[");
  for (int i = 0; i < values.length; i++) {
    if (i) printf(",");
    printf("%d", values.data[i]);
  }
  printf("]");
}

void print_string_array(StringArray values) {
  printf("[");
  for (int i = 0; i < values.length; i++) {
    if (i) printf(",");
    printf("\\"%s\\"", values.data[i]);
  }
  printf("]");
}

void print_int_matrix(IntMatrix matrix) {
  printf("[");
  for (int i = 0; i < matrix.length; i++) {
    if (i) printf(",");
    print_int_array(matrix.rows[i]);
  }
  printf("]");
}

void print_list(ListNode* head) {
  printf("[");
  for (int i = 0; head; i++, head = head->next) {
    if (i) printf(",");
    printf("%d", head->val);
  }
  printf("]");
}

${code}

int main(void) {
${declarations}
${print}
  return 0;
}
`;
}

function goType(type) {
  return {
    int: 'int',
    long: 'int64',
    double: 'float64',
    boolean: 'bool',
    string: 'string',
    'int[]': '[]int',
    'string[]': '[]string',
    'int[][]': '[][]int',
    'string[][]': '[][]string',
    ListNode: '*ListNode',
    TreeNode: '*TreeNode',
    Node: '*Node',
  }[type] || 'string';
}

function goValue(value, type) {
  if (type === 'string') return JSON.stringify(String(value ?? ''));
  if (type === 'boolean') return value ? 'true' : 'false';
  if (type === 'long') return `int64(${Math.trunc(Number(value))})`;
  if (type === 'double') return `${Number(value)}`;
  if (type === 'int') return `${Math.trunc(Number(value))}`;
  if (type === 'int[]') return `[]int{${(value || []).map((item) => goValue(item, 'int')).join(',')}}`;
  if (type === 'string[]') return `[]string{${(value || []).map((item) => goValue(item, 'string')).join(',')}}`;
  if (type === 'int[][]') return `[][]int{${(value || []).map((row) => goValue(row, 'int[]')).join(',')}}`;
  if (type === 'string[][]') return `[][]string{${(value || []).map((row) => goValue(row, 'string[]')).join(',')}}`;
  if (type === 'ListNode') return `buildList(${goValue(value, 'int[]')})`;
  if (type === 'TreeNode') return `buildTree([]*int{${(value || []).map((item) => item === null ? 'nil' : `intPtr(${goValue(item, 'int')})`).join(',')}})`;
  if (type === 'Node') return `buildGraph(${goValue(value, 'int[][]')})`;
  return JSON.stringify(String(value ?? ''));
}

function goWrapper(code, input, problem) {
  if (!isTypedProblem(problem)) {
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

  const functionName = getFunctionName(problem);
  const inputSignature = getInputSignature(problem);
  const outputSignature = getOutputSignature(problem);
  const args = typedArgsFromInput(input, problem);
  const declarations = inputSignature
    .map((param, index) => `  ${param.name} := ${goValue(args[index], param.type)}`)
    .join('\n');
  const callArgs = inputSignature.map((param) => param.name).join(', ');

  const print =
    outputSignature === 'ListNode' ? '  printJson(listToArray(result))' :
    outputSignature === 'TreeNode' ? '  printJson(treeToArray(result))' :
    outputSignature === 'Node' ? '  printJson(graphToAdjList(result))' :
    outputSignature === 'string' ? '  fmt.Print(result)' :
    outputSignature === 'boolean' ? '  if result { fmt.Print("true") } else { fmt.Print("false") }' :
    outputSignature.endsWith('[]') ? '  printJson(result)' :
    '  fmt.Print(result)';

  return `package main

import (
  "encoding/json"
  "fmt"
  "sort"
)

type ListNode struct { Val int; Next *ListNode }
type TreeNode struct { Val int; Left *TreeNode; Right *TreeNode }
type Node struct { Val int; Neighbors []*Node }
func intPtr(value int) *int { return &value }
func buildList(values []int) *ListNode { dummy := &ListNode{}; tail := dummy; for _, value := range values { tail.Next = &ListNode{Val: value}; tail = tail.Next }; return dummy.Next }
func listToArray(head *ListNode) []int { out := []int{}; seen := map[*ListNode]bool{}; for head != nil && !seen[head] { seen[head] = true; out = append(out, head.Val); head = head.Next }; return out }
func buildTree(values []*int) *TreeNode { if len(values) == 0 || values[0] == nil { return nil }; nodes := make([]*TreeNode, len(values)); for i, value := range values { if value != nil { nodes[i] = &TreeNode{Val: *value} } }; child := 1; for i := 0; i < len(nodes) && child < len(nodes); i++ { if nodes[i] == nil { continue }; nodes[i].Left = nodes[child]; child++; if child < len(nodes) { nodes[i].Right = nodes[child]; child++ } }; return nodes[0] }
func treeToArray(root *TreeNode) []*int { if root == nil { return []*int{} }; out := []*int{}; queue := []*TreeNode{root}; for len(queue) > 0 { node := queue[0]; queue = queue[1:]; if node == nil { out = append(out, nil); continue }; out = append(out, intPtr(node.Val)); queue = append(queue, node.Left, node.Right) }; for len(out) > 0 && out[len(out)-1] == nil { out = out[:len(out)-1] }; return out }
func buildGraph(adjList [][]int) *Node { if len(adjList) == 0 { return nil }; nodes := make([]*Node, len(adjList)); for i := range nodes { nodes[i] = &Node{Val: i + 1} }; for i, row := range adjList { for _, neighbor := range row { if neighbor > 0 && neighbor <= len(nodes) { nodes[i].Neighbors = append(nodes[i].Neighbors, nodes[neighbor-1]) } } }; return nodes[0] }
func graphToAdjList(node *Node) [][]int { if node == nil { return [][]int{} }; seen := map[int]*Node{node.Val: node}; queue := []*Node{node}; for len(queue) > 0 { current := queue[0]; queue = queue[1:]; for _, neighbor := range current.Neighbors { if _, ok := seen[neighbor.Val]; !ok { seen[neighbor.Val] = neighbor; queue = append(queue, neighbor) } } }; keys := make([]int, 0, len(seen)); for key := range seen { keys = append(keys, key) }; sort.Ints(keys); out := [][]int{}; for _, key := range keys { row := []int{}; for _, neighbor := range seen[key].Neighbors { row = append(row, neighbor.Val) }; sort.Ints(row); out = append(out, row) }; return out }
func printJson(value any) { data, _ := json.Marshal(value); fmt.Print(string(data)) }

${code}

func main() {
${declarations}
  result := ${functionName}(${callArgs})
${print}
}
`;
}

async function runPython(code, input, problem) {
  return withTempDir(async (dir) => {
    const file = path.join(dir, 'solution.py');
    await fs.writeFile(file, pythonWrapper(code, input, problem));
    return runProcess('python', [file], input, { cwd: dir });
  });
}

async function runJava(code, input, problem) {
  return withTempDir(async (dir) => {
    const file = path.join(dir, 'Main.java');
    await fs.writeFile(file, javaWrapper(code, input, problem));
    const compile = await runProcess('javac', [file], '', { cwd: dir });
    if (compile.error) return compile;
    return runProcess('java', ['-cp', dir, 'Main'], input, { cwd: dir });
  });
}

async function runCompiledCFamily(code, input, problem, config) {
  return withTempDir(async (dir) => {
    const source = path.join(dir, config.source);
    const binary = path.join(dir, process.platform === 'win32' ? 'main.exe' : 'main');
    await fs.writeFile(source, config.wrap(code, input, problem));
    const compile = await runProcess(config.compiler, [...config.args, source, '-o', binary], '', { cwd: dir });
    if (compile.error) return compile;
    return runProcess(binary, [], input, { cwd: dir });
  });
}

async function runGo(code, input, problem) {
  return withTempDir(async (dir) => {
    const file = path.join(dir, 'main.go');
    await fs.writeFile(file, goWrapper(code, input, problem));
    return runProcess('go', ['run', file], input, { cwd: dir });
  });
}

const runners = {
  javascript: async (code, input, problem) => runJavaScript(code, input, problem),
  python: runPython,
  java: runJava,
  cpp: (code, input, problem) =>
    runCompiledCFamily(code, input, problem, {
      source: 'main.cpp',
      compiler: 'g++',
      args: ['-std=c++17', '-O2'],
      wrap: cppWrapper,
    }),
  c: (code, input, problem) =>
    runCompiledCFamily(code, input, problem, {
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
    const expected = isTypedProblem(problem)
      ? serializeTypedOutput(parseRawValue(test.expected_output), getOutputSignature(problem))
      : test.expected_output;
    const passed = !result.error && normalize(result.output) === normalize(expected);
    results.push({
      label: `Case ${index + 1}`,
      input: test.input,
      expected,
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

async function judgeSubmission({ language, code, tests, problem }) {
  const startedAt = Date.now();
  const result = await runAgainstTests({ code, language, tests, problem });
  const failed = result.results.find((item) => item.status !== 'passed');

  return {
    status: result.error ? 'runtime_error' : failed ? 'wrong_answer' : 'accepted',
    runtime: Date.now() - startedAt,
    error: result.error,
  };
}

module.exports = {
  runAgainstTests,
  runSingleCase,
  judgeSubmission,
  normalize,
  parseCaseInput,
  isTypedProblem,
};
