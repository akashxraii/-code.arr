const problems = [
  {
    id: 1,
    slug: 'two-sum',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    tags: ['Array', 'Hash Table'],
    function_name: 'solve',
    starter_code: {
      javascript:
        'function solve(input) {\n  // Return a JSON string, for example: [0,1]\n  return "[]";\n}\n',
    },
    testCases: [
      {
        input: 'nums = [2,7,11,15]\ntarget = 9',
        expected_output: '[0,1]',
        is_sample: true,
      },
      {
        input: 'nums = [3,2,4]\ntarget = 6',
        expected_output: '[1,2]',
        is_sample: true,
      },
      {
        input: 'nums = [0,4,3,0]\ntarget = 0',
        expected_output: '[0,3]',
        is_sample: false,
      },
    ],
  },
];

module.exports = {
  problems,
};
