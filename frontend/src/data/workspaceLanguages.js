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

export function getLanguageConfig(language) {
  return WORKSPACE_LANGUAGES.find((item) => item.id === language) || WORKSPACE_LANGUAGES[0];
}

export function getLanguageTemplate(language, problem) {
  return problem?.starterCode?.[language] || LANGUAGE_TEMPLATES[language] || '';
}
