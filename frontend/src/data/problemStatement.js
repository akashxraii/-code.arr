const PROBLEM_CONSTRAINTS = {
  'two-sum': [
    '2 <= nums.length <= 10,000',
    '-1,000,000,000 <= nums[i], target <= 1,000,000,000',
    'Exactly one valid pair exists for each test case.',
    'Return two distinct indices in increasing order.',
  ],
};

function getGenericConstraints(problem) {
  const tags = problem?.tags || [];
  const constraints = ['Return the answer in the exact format shown in the examples.'];

  if (tags.includes('Array')) constraints.push('Input arrays may contain duplicate and negative values.');
  if (tags.includes('String')) constraints.push('Strings may contain lowercase, uppercase, digit, or symbol characters.');
  if (tags.includes('Graph')) constraints.push('Graphs may be disconnected unless the prompt says otherwise.');
  if (tags.includes('Matrix') || tags.includes('Grid')) {
    constraints.push('Grid dimensions are positive and cells use the values shown in the examples.');
  }
  if (tags.includes('Dynamic Programming')) constraints.push('Prefer an efficient solution over brute force recursion.');

  return constraints;
}

export function getStatementExamples(problem) {
  return (problem?.testCases || []).slice(0, 2).map((testCase, index) => ({
    label: `Example ${index + 1}`,
    input: testCase.input,
    output: testCase.expected_output,
  }));
}

export function getStatementConstraints(problem) {
  return PROBLEM_CONSTRAINTS[problem?.slug] || getGenericConstraints(problem);
}
