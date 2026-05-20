export const WORKSPACE_LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', monaco: 'javascript' },
  { id: 'python', label: 'Python', monaco: 'python' },
  { id: 'java', label: 'Java', monaco: 'java' },
  { id: 'cpp', label: 'C++', monaco: 'cpp' },
  { id: 'c', label: 'C', monaco: 'c' },
  { id: 'go', label: 'Go', monaco: 'go' },
];

export const LANGUAGE_TEMPLATES = {
  javascript: `function solve(input) {
  // Return the required answer as a string.
  return "";
}
`,
  python: `def solve(input: str) -> str:
    # Return the required answer as a string.
    return ""
`,
  java: `class Solution {
  public static String solve(String input) {
    // Return the required answer as a string.
    return "";
  }
}
`,
  cpp: `string solve(string input) {
  // Return the required answer as a string.
  return "";
}
`,
  c: `char* solve(const char* input) {
  // Return a string literal or allocated string.
  return "";
}
`,
  go: `func solve(input string) string {
  // Return the required answer as a string.
  return ""
}
`,
};

function inputSignature(problem) {
  return problem?.inputSignature || problem?.input_signature || [];
}

function outputSignature(problem) {
  return problem?.outputSignature || problem?.output_signature || 'string';
}

function functionName(problem) {
  return problem?.functionName || problem?.function_name || 'solve';
}

function isTypedProblem(problem) {
  return functionName(problem) !== 'solve' && inputSignature(problem).length > 0;
}

function javaType(type) {
  return {
    int: 'int',
    long: 'long',
    double: 'double',
    boolean: 'boolean',
    string: 'String',
    'int[]': 'int[]',
    'string[]': 'String[]',
    'int[][]': 'int[][]',
    'string[][]': 'String[][]',
    ListNode: 'ListNode',
    TreeNode: 'TreeNode',
    Node: 'Node',
  }[type] || 'String';
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

function jsTypedTemplate(problem) {
  const args = inputSignature(problem).map((item) => item.name).join(', ');
  return `function ${functionName(problem)}(${args}) {
  return ${defaultReturn('javascript', outputSignature(problem))};
}
`;
}

function pythonTypedTemplate(problem) {
  const args = inputSignature(problem).map((item) => item.name).join(', ');
  return `class Solution:
    def ${functionName(problem)}(self${args ? `, ${args}` : ''}):
        return ${defaultReturn('python', outputSignature(problem))}
`;
}

function javaTypedTemplate(problem) {
  const params = inputSignature(problem).map((item) => `${javaType(item.type)} ${item.name}`).join(', ');
  return `class Solution {
    public ${javaType(outputSignature(problem))} ${functionName(problem)}(${params}) {
        return ${defaultReturn('java', outputSignature(problem))};
    }
}
`;
}

function cppTypedTemplate(problem) {
  const params = inputSignature(problem)
    .map((item) => `${cppType(item.type)}${item.type.endsWith('[]') ? '&' : ''} ${item.name}`)
    .join(', ');
  return `class Solution {
public:
    ${cppType(outputSignature(problem))} ${functionName(problem)}(${params}) {
        return ${defaultReturn('cpp', outputSignature(problem))};
    }
};
`;
}

function cTypedTemplate(problem) {
  const params = inputSignature(problem).map((item) => `${cType(item.type)} ${item.name}`).join(', ');
  return `${cType(outputSignature(problem))} ${functionName(problem)}(${params}) {
  return ${defaultReturn('c', outputSignature(problem))};
}
`;
}

function goTypedTemplate(problem) {
  const params = inputSignature(problem).map((item) => `${item.name} ${goType(item.type)}`).join(', ');
  return `func ${functionName(problem)}(${params}) ${goType(outputSignature(problem))} {
  return ${defaultReturn('go', outputSignature(problem))}
}
`;
}

function defaultReturn(language, type) {
  if (type === 'boolean') return language === 'python' ? 'False' : 'false';
  if (type === 'string') return language === 'java' ? '""' : '""';
  if (type === 'double') return '0.0';
  if (type === 'int' || type === 'long') return '0';
  if (type === 'ListNode' || type === 'TreeNode' || type === 'Node') {
    if (language === 'python') return 'None';
    if (language === 'java') return 'null';
    if (language === 'cpp') return 'nullptr';
    return 'nil';
  }
  if (type.endsWith('[]')) {
    if (language === 'javascript' || language === 'python') return '[]';
    if (language === 'java') {
      if (type === 'string[]') return 'new String[0]';
      if (type === 'string[][]') return 'new String[0][0]';
      return type.endsWith('[][]') ? 'new int[0][0]' : 'new int[0]';
    }
    if (language === 'cpp') return '{}';
    if (language === 'c') return type.endsWith('[][]') ? '(IntMatrix){0}' : '(IntArray){0}';
    if (language === 'go') return 'nil';
  }
  return language === 'python' ? 'None' : 'null';
}

function generatedTypedTemplate(language, problem) {
  return {
    javascript: jsTypedTemplate,
    python: pythonTypedTemplate,
    java: javaTypedTemplate,
    cpp: cppTypedTemplate,
    c: cTypedTemplate,
    go: goTypedTemplate,
  }[language]?.(problem);
}

function starterLooksLegacy(starter, problem) {
  return isTypedProblem(problem) && /\bsolve\s*\(/.test(starter || '');
}

export function getLanguageConfig(language) {
  return WORKSPACE_LANGUAGES.find((item) => item.id === language) || WORKSPACE_LANGUAGES[0];
}

export function getLanguageTemplate(language, problem) {
  const starter = problem?.starterCode?.[language];
  if (starter && !starterLooksLegacy(starter, problem)) return starter;
  if (isTypedProblem(problem)) return generatedTypedTemplate(language, problem) || '';
  return starter || LANGUAGE_TEMPLATES[language] || '';
}
