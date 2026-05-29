const { sanitizeTags } = require('./tags');

const starterCode = {
  javascript:
    'function solve(input) {\n  // Parse input and return the required answer as a string.\n  return "";\n}\n',
};

const problemSeeds = [
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    tags: ['Array', 'Hash Table'],
    description:
      'Find two distinct indices in an integer array whose values add up to the target. Return the indices in increasing order.',
    starter_code: {
      java:
        'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}\n',
      javascript:
        'function solve(input) {\n  const lines = input.trim().split(/\\n/);\n  const nums = JSON.parse(lines[0].replace("nums = ", ""));\n  const target = Number(lines[1].replace("target = ", ""));\n  const seen = new Map();\n\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return JSON.stringify([seen.get(need), i]);\n    seen.set(nums[i], i);\n  }\n  return "[]";\n}\n',
    },
    testCases: [
      { input: 'nums = [2,7,11,15]\ntarget = 9', expected_output: '[0,1]', is_sample: true },
      { input: 'nums = [3,2,4]\ntarget = 6', expected_output: '[1,2]', is_sample: true },
      { input: 'nums = [0,4,3,0]\ntarget = 0', expected_output: '[0,3]', is_sample: false },
    ],
  },
  {
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    tags: ['Stack', 'String'],
    description:
      'Given a string containing bracket characters, decide whether every opening bracket is closed by the same type in the correct order.',
    testCases: [
      { input: 's = "()[]{}"', expected_output: 'true', is_sample: true },
      { input: 's = "([)]"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'easy',
    tags: ['Linked List', 'Recursion'],
    description:
      'Merge two sorted integer sequences into one sorted sequence while preserving all duplicate values.',
    testCases: [
      { input: 'list1 = [1,2,4]\nlist2 = [1,3,4]', expected_output: '[1,1,2,3,4,4]', is_sample: true },
      { input: 'list1 = []\nlist2 = [0]', expected_output: '[0]', is_sample: true },
    ],
  },
  {
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    tags: ['Array', 'Dynamic Programming'],
    description:
      'Choose one buy day and one later sell day from a list of prices to maximize profit. Return zero if no profit is possible.',
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expected_output: '5', is_sample: true },
      { input: 'prices = [7,6,4,3,1]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'medium',
    tags: ['Array', 'Dynamic Programming'],
    description:
      'Find the contiguous non-empty subarray with the largest possible sum and return that sum.',
    testCases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expected_output: '6', is_sample: true },
      { input: 'nums = [5,4,-1,7,8]', expected_output: '23', is_sample: true },
    ],
  },
  {
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'easy',
    tags: ['Array', 'Hash Set'],
    description:
      'Determine whether any value appears at least twice in the provided integer array.',
    testCases: [
      { input: 'nums = [1,2,3,1]', expected_output: 'true', is_sample: true },
      { input: 'nums = [1,2,3,4]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'medium',
    tags: ['Array', 'Prefix Product'],
    description:
      'For each position, return the product of all array elements except the value at that position without using division.',
    testCases: [
      { input: 'nums = [1,2,3,4]', expected_output: '[24,12,8,6]', is_sample: true },
      { input: 'nums = [-1,1,0,-3,3]', expected_output: '[0,0,9,0,0]', is_sample: true },
    ],
  },
  {
    slug: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'medium',
    tags: ['Array', 'Dynamic Programming'],
    description:
      'Return the largest product obtainable from a contiguous non-empty subarray.',
    testCases: [
      { input: 'nums = [2,3,-2,4]', expected_output: '6', is_sample: true },
      { input: 'nums = [-2,0,-1]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'medium',
    tags: ['Binary Search', 'Array'],
    description:
      'A strictly increasing array was rotated at an unknown pivot. Return its minimum element in logarithmic time.',
    testCases: [
      { input: 'nums = [3,4,5,1,2]', expected_output: '1', is_sample: true },
      { input: 'nums = [11,13,15,17]', expected_output: '11', is_sample: true },
    ],
  },
  {
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'medium',
    tags: ['Binary Search', 'Array'],
    description:
      'Search for a target in a rotated sorted array with distinct values. Return its index, or -1 when absent.',
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2]\ntarget = 0', expected_output: '4', is_sample: true },
      { input: 'nums = [4,5,6,7,0,1,2]\ntarget = 3', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'three-sum',
    title: '3Sum',
    difficulty: 'medium',
    tags: ['Two Pointers', 'Array'],
    description:
      'Return all unique triplets whose values sum to zero. Triplets and the full answer should be sorted lexicographically.',
    testCases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expected_output: '[[-1,-1,2],[-1,0,1]]', is_sample: true },
      { input: 'nums = [0,0,0]', expected_output: '[[0,0,0]]', is_sample: true },
    ],
  },
  {
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'medium',
    tags: ['Two Pointers', 'Greedy'],
    description:
      'Choose two vertical lines that trap the maximum area of water with the x-axis and return that area.',
    testCases: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', expected_output: '49', is_sample: true },
      { input: 'height = [1,1]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    tags: ['Sliding Window', 'String'],
    description:
      'Return the length of the longest contiguous substring that contains no repeated characters.',
    testCases: [
      { input: 's = "abcabcbb"', expected_output: '3', is_sample: true },
      { input: 's = "bbbbb"', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    tags: ['String', 'Dynamic Programming'],
    description:
      'Find the longest contiguous substring that reads the same forward and backward. Return any one valid longest answer.',
    testCases: [
      { input: 's = "babad"', expected_output: 'bab', is_sample: true },
      { input: 's = "cbbd"', expected_output: 'bb', is_sample: true },
    ],
  },
  {
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'medium',
    tags: ['Hash Table', 'String'],
    description:
      'Group words that are anagrams of each other. Sort each group and sort the list of groups by their first word.',
    testCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expected_output: '[["ate","eat","tea"],["bat"],["nat","tan"]]', is_sample: true },
      { input: 'strs = [""]', expected_output: '[[""]]', is_sample: true },
    ],
  },
  {
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'medium',
    tags: ['Heap', 'Hash Table'],
    description:
      'Return the k numbers that occur most frequently. Break ties by smaller numeric value.',
    testCases: [
      { input: 'nums = [1,1,1,2,2,3]\nk = 2', expected_output: '[1,2]', is_sample: true },
      { input: 'nums = [1]\nk = 1', expected_output: '[1]', is_sample: true },
    ],
  },
  {
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'easy',
    tags: ['String', 'Hash Table'],
    description:
      'Decide whether two strings contain exactly the same characters with the same counts.',
    testCases: [
      { input: 's = "anagram"\nt = "nagaram"', expected_output: 'true', is_sample: true },
      { input: 's = "rat"\nt = "car"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'easy',
    tags: ['Dynamic Programming', 'Math'],
    description:
      'Count the number of distinct ways to reach step n when each move climbs either one or two steps.',
    testCases: [
      { input: 'n = 2', expected_output: '2', is_sample: true },
      { input: 'n = 5', expected_output: '8', is_sample: true },
    ],
  },
  {
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'medium',
    tags: ['Dynamic Programming', 'BFS'],
    description:
      'Given coin denominations and an amount, return the fewest coins needed to make the amount or -1 if impossible.',
    testCases: [
      { input: 'coins = [1,2,5]\namount = 11', expected_output: '3', is_sample: true },
      { input: 'coins = [2]\namount = 3', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    tags: ['Dynamic Programming', 'Binary Search'],
    description:
      'Return the length of the longest strictly increasing subsequence in the array.',
    testCases: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', expected_output: '4', is_sample: true },
      { input: 'nums = [7,7,7,7,7]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'medium',
    tags: ['Dynamic Programming', 'Trie'],
    description:
      'Determine whether the string can be segmented into a sequence of one or more dictionary words.',
    testCases: [
      { input: 's = "codearr"\nwordDict = ["code","arr"]', expected_output: 'true', is_sample: true },
      { input: 's = "catsandog"\nwordDict = ["cats","dog","sand","and","cat"]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'medium',
    tags: ['DFS', 'BFS', 'Grid'],
    description:
      'Count connected groups of land cells in a grid where cells connect horizontally or vertically.',
    testCases: [
      { input: 'grid = [["1","1","0"],["0","1","0"],["1","0","1"]]', expected_output: '3', is_sample: true },
      { input: 'grid = [["1","1"],["1","1"]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'medium',
    tags: ['Graph', 'Topological Sort'],
    description:
      'Given prerequisite pairs, decide whether all courses can be completed without encountering a dependency cycle.',
    testCases: [
      { input: 'numCourses = 2\nprerequisites = [[1,0]]', expected_output: 'true', is_sample: true },
      { input: 'numCourses = 2\nprerequisites = [[1,0],[0,1]]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'medium',
    tags: ['Graph', 'DFS', 'BFS'],
    description:
      'Given an adjacency list for an undirected graph, return the adjacency list of a deep copy with the same connectivity.',
    testCases: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', expected_output: '[[2,4],[1,3],[2,4],[1,3]]', is_sample: true },
      { input: 'adjList = [[]]', expected_output: '[[]]', is_sample: true },
    ],
  },
  {
    slug: 'pacific-atlantic-water-flow',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    tags: ['DFS', 'BFS', 'Matrix'],
    description:
      'Return coordinates from which water can flow to both oceans, moving only from a cell to an equal or lower neighbor.',
    testCases: [
      { input: 'heights = [[1,2,2],[3,2,3],[2,4,5]]', expected_output: '[[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]', is_sample: true },
      { input: 'heights = [[1]]', expected_output: '[[0,0]]', is_sample: true },
    ],
  },
  {
    slug: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'medium',
    tags: ['BFS', 'Grid'],
    description:
      'Each minute, rotten oranges turn adjacent fresh oranges rotten. Return the minutes needed to rot all oranges, or -1.',
    testCases: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', expected_output: '4', is_sample: true },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'easy',
    tags: ['Two Pointers', 'String'],
    description:
      'After removing non-alphanumeric characters and ignoring case, determine whether the string is a palindrome.',
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', expected_output: 'true', is_sample: true },
      { input: 's = "race a car"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'hard',
    tags: ['Sliding Window', 'String'],
    description:
      'Return the shortest substring of s that contains every character of t with required multiplicities.',
    testCases: [
      { input: 's = "ADOBECODEBANC"\nt = "ABC"', expected_output: 'BANC', is_sample: true },
      { input: 's = "a"\nt = "aa"', expected_output: '', is_sample: true },
    ],
  },
  {
    slug: 'serialize-and-deserialize-binary-tree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'hard',
    tags: ['Tree', 'DFS', 'Design'],
    description:
      'Encode a binary tree into a compact string and decode it back. Return the serialized form after one round trip.',
    testCases: [
      { input: 'root = [1,2,3,null,null,4,5]', expected_output: '[1,2,3,null,null,4,5]', is_sample: true },
      { input: 'root = []', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    tags: ['Binary Search', 'Array'],
    description:
      'Given two sorted arrays, compute the median of their combined values in logarithmic time.',
    testCases: [
      { input: 'nums1 = [1,3]\nnums2 = [2]', expected_output: '2', is_sample: true },
      { input: 'nums1 = [1,2]\nnums2 = [3,4]', expected_output: '2.5', is_sample: true },
    ],
  },
  {
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'hard',
    tags: ['Two Pointers', 'Stack'],
    description:
      'Given bar heights, compute how much rainwater can be trapped after raining.',
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected_output: '6', is_sample: true },
      { input: 'height = [4,2,0,3,2,5]', expected_output: '9', is_sample: true },
    ],
  },
  {
    slug: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'hard',
    tags: ['Stack', 'Array'],
    description:
      'Find the largest rectangular area that can be formed using adjacent bars in a histogram.',
    testCases: [
      { input: 'heights = [2,1,5,6,2,3]', expected_output: '10', is_sample: true },
      { input: 'heights = [2,4]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'hard',
    tags: ['BFS', 'String'],
    description:
      'Find the length of the shortest transformation from beginWord to endWord, changing one character at a time through dictionary words.',
    testCases: [
      { input: 'beginWord = "hit"\nendWord = "cog"\nwordList = ["hot","dot","dog","lot","log","cog"]', expected_output: '5', is_sample: true },
      { input: 'beginWord = "hit"\nendWord = "cog"\nwordList = ["hot","dot","dog","lot","log"]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'watermelon',
    title: 'Watermelon',
    difficulty: 'easy',
    tags: ['Math', 'Implementation'],
    description:
      'Given the weight of a watermelon, decide if it can be split into two positive even-weight parts.',
    testCases: [
      { input: 'w = 8', expected_output: 'YES', is_sample: true },
      { input: 'w = 2', expected_output: 'NO', is_sample: true },
    ],
  },
  {
    slug: 'way-too-long-words',
    title: 'Way Too Long Words',
    difficulty: 'easy',
    tags: ['String', 'Implementation'],
    description:
      'Abbreviate words longer than ten characters by keeping the first and last character with the omitted count between them.',
    testCases: [
      { input: 'words = ["localization","dog","internationalization"]', expected_output: '["l10n","dog","i18n"]', is_sample: true },
      { input: 'words = ["word","pneumonoultramicroscopicsilicovolcanoconiosis"]', expected_output: '["word","p43s"]', is_sample: true },
    ],
  },
  {
    slug: 'team',
    title: 'Team',
    difficulty: 'easy',
    tags: ['Implementation'],
    description:
      'Count how many proposed tasks a team will implement when at least two of three teammates are confident.',
    testCases: [
      { input: 'votes = [[1,1,0],[1,1,1],[1,0,0]]', expected_output: '2', is_sample: true },
      { input: 'votes = [[1,0,0],[0,1,1]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'next-round',
    title: 'Next Round',
    difficulty: 'easy',
    tags: ['Sorting', 'Implementation'],
    description:
      'Count contestants with positive scores at least as high as the kth-place score.',
    testCases: [
      { input: 'n = 8\nk = 5\nscores = [10,9,8,7,7,7,5,5]', expected_output: '6', is_sample: true },
      { input: 'n = 4\nk = 2\nscores = [0,0,0,0]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'domino-piling',
    title: 'Domino Piling',
    difficulty: 'easy',
    tags: ['Math', 'Greedy'],
    description:
      'Return the maximum number of 2x1 dominoes that fit on an m by n board without overlap.',
    testCases: [
      { input: 'm = 2\nn = 4', expected_output: '4', is_sample: true },
      { input: 'm = 3\nn = 3', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'bit-plus-plus',
    title: 'Bit++',
    difficulty: 'easy',
    tags: ['Implementation'],
    description:
      'Starting from zero, apply increment or decrement statements and return the final variable value.',
    testCases: [
      { input: 'statements = ["++X","X++","--X"]', expected_output: '1', is_sample: true },
      { input: 'statements = ["X--","--X"]', expected_output: '-2', is_sample: true },
    ],
  },
  {
    slug: 'beautiful-matrix',
    title: 'Beautiful Matrix',
    difficulty: 'easy',
    tags: ['Matrix', 'Implementation'],
    description:
      'A 5x5 matrix contains a single 1. Return the minimum adjacent swaps needed to move it to the center.',
    testCases: [
      { input: 'matrix = [[0,0,0,0,0],[0,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]', expected_output: '3', is_sample: true },
      { input: 'matrix = [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'petya-and-strings',
    title: 'Petya and Strings',
    difficulty: 'easy',
    tags: ['String'],
    description:
      'Compare two strings case-insensitively and return -1, 0, or 1 based on lexicographic order.',
    testCases: [
      { input: 'a = "aaaa"\nb = "aaaA"', expected_output: '0', is_sample: true },
      { input: 'a = "abs"\nb = "Abz"', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'string-task',
    title: 'String Task',
    difficulty: 'easy',
    tags: ['String'],
    description:
      'Remove vowels, convert the remaining letters to lowercase, and place a dot before each remaining character.',
    testCases: [
      { input: 's = "tour"', expected_output: '.t.r', is_sample: true },
      { input: 's = "Programming"', expected_output: '.p.r.g.r.m.m.n.g', is_sample: true },
    ],
  },
  {
    slug: 'young-physicist',
    title: 'Young Physicist',
    difficulty: 'easy',
    tags: ['Math', 'Vectors'],
    description:
      'Given force vectors in three dimensions, determine whether their vector sum is exactly zero.',
    testCases: [
      { input: 'vectors = [[3,-1,7],[-5,2,-4],[2,-1,-3]]', expected_output: 'YES', is_sample: true },
      { input: 'vectors = [[1,1,1],[0,0,0]]', expected_output: 'NO', is_sample: true },
    ],
  },
  {
    slug: 'helpful-maths',
    title: 'Helpful Maths',
    difficulty: 'easy',
    tags: ['String', 'Sorting'],
    description:
      'Reorder the digits in an addition expression so the terms appear in nondecreasing order.',
    testCases: [
      { input: 's = "3+2+1"', expected_output: '1+2+3', is_sample: true },
      { input: 's = "1+1+3+1+3"', expected_output: '1+1+1+3+3', is_sample: true },
    ],
  },
  {
    slug: 'word-capitalization',
    title: 'Word Capitalization',
    difficulty: 'easy',
    tags: ['String'],
    description:
      'Capitalize the first letter of a word and leave the remaining characters unchanged.',
    testCases: [
      { input: 'word = "konjac"', expected_output: 'Konjac', is_sample: true },
      { input: 'word = "Acm"', expected_output: 'Acm', is_sample: true },
    ],
  },
  {
    slug: 'boy-or-girl',
    title: 'Boy or Girl',
    difficulty: 'easy',
    tags: ['String', 'Set'],
    description:
      'Count distinct letters in a username and return CHAT WITH HER! for an even count, otherwise IGNORE HIM!.',
    testCases: [
      { input: 'username = "wjmzbmr"', expected_output: 'CHAT WITH HER!', is_sample: true },
      { input: 'username = "xiaodao"', expected_output: 'IGNORE HIM!', is_sample: true },
    ],
  },
  {
    slug: 'stones-on-the-table',
    title: 'Stones on the Table',
    difficulty: 'easy',
    tags: ['String'],
    description:
      'Return how many stones must be removed so no two neighboring stones have the same color.',
    testCases: [
      { input: 'colors = "RRG"', expected_output: '1', is_sample: true },
      { input: 'colors = "RRRRR"', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'elephant',
    title: 'Elephant',
    difficulty: 'easy',
    tags: ['Math', 'Greedy'],
    description:
      'An elephant can move at most five units per step. Return the fewest steps needed to reach coordinate x.',
    testCases: [
      { input: 'x = 12', expected_output: '3', is_sample: true },
      { input: 'x = 5', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'queue-at-the-school',
    title: 'Queue at the School',
    difficulty: 'easy',
    tags: ['Simulation', 'String'],
    description:
      'Simulate t seconds of a queue where each BG pair swaps positions simultaneously every second.',
    testCases: [
      { input: 's = "BGGBG"\nt = 1', expected_output: 'GBGGB', is_sample: true },
      { input: 's = "BGGBG"\nt = 2', expected_output: 'GGBGB', is_sample: true },
    ],
  },
  {
    slug: 'nearly-lucky-number',
    title: 'Nearly Lucky Number',
    difficulty: 'easy',
    tags: ['Digits'],
    description:
      'Count digits equal to 4 or 7, then decide whether that count itself is a lucky number.',
    testCases: [
      { input: 'n = 40047', expected_output: 'NO', is_sample: true },
      { input: 'n = 7747774', expected_output: 'YES', is_sample: true },
    ],
  },
  {
    slug: 'dragons',
    title: 'Dragons',
    difficulty: 'medium',
    tags: ['Greedy', 'Sorting'],
    description:
      'Given initial strength and dragons with required strength and bonus, decide if all dragons can be defeated in some order.',
    testCases: [
      { input: 'strength = 2\ndragons = [[1,99],[100,0]]', expected_output: 'YES', is_sample: true },
      { input: 'strength = 10\ndragons = [[100,100],[1,1]]', expected_output: 'NO', is_sample: true },
    ],
  },
  {
    slug: 'twins',
    title: 'Twins',
    difficulty: 'medium',
    tags: ['Greedy', 'Sorting'],
    description:
      'Choose the minimum number of largest coins so their sum is strictly greater than the sum of the remaining coins.',
    testCases: [
      { input: 'coins = [3,3]', expected_output: '2', is_sample: true },
      { input: 'coins = [2,1,2]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'arrival-of-the-general',
    title: 'Arrival of the General',
    difficulty: 'easy',
    tags: ['Greedy', 'Array'],
    description:
      'Return the minimum adjacent swaps needed to move the tallest soldier to the front and the shortest to the end.',
    testCases: [
      { input: 'heights = [33,44,11,22]', expected_output: '2', is_sample: true },
      { input: 'heights = [10,10,58,31,63,40,76]', expected_output: '10', is_sample: true },
    ],
  },
  {
    slug: 'football',
    title: 'Football',
    difficulty: 'easy',
    tags: ['String'],
    description:
      'Given a string of 0s and 1s, decide whether it contains at least seven equal characters consecutively.',
    testCases: [
      { input: 'players = "001001"', expected_output: 'NO', is_sample: true },
      { input: 'players = "1000000001"', expected_output: 'YES', is_sample: true },
    ],
  },
  {
    slug: 'solve-me-first',
    title: 'Solve Me First',
    difficulty: 'easy',
    tags: ['Warmup', 'Math'],
    description:
      'Read two integers and return their sum.',
    testCases: [
      { input: 'a = 2\nb = 3', expected_output: '5', is_sample: true },
      { input: 'a = 100\nb = 1000', expected_output: '1100', is_sample: true },
    ],
  },
  {
    slug: 'simple-array-sum',
    title: 'Simple Array Sum',
    difficulty: 'easy',
    tags: ['Array', 'Warmup'],
    description:
      'Return the sum of all integers in the array.',
    testCases: [
      { input: 'arr = [1,2,3,4,10,11]', expected_output: '31', is_sample: true },
      { input: 'arr = [5,-2,7]', expected_output: '10', is_sample: true },
    ],
  },
  {
    slug: 'compare-the-triplets',
    title: 'Compare the Triplets',
    difficulty: 'easy',
    tags: ['Array'],
    description:
      'Compare two three-value rating arrays and award one point to the higher value at each index.',
    testCases: [
      { input: 'a = [5,6,7]\nb = [3,6,10]', expected_output: '[1,1]', is_sample: true },
      { input: 'a = [17,28,30]\nb = [99,16,8]', expected_output: '[2,1]', is_sample: true },
    ],
  },
  {
    slug: 'a-very-big-sum',
    title: 'A Very Big Sum',
    difficulty: 'easy',
    tags: ['Array', 'BigInt'],
    description:
      'Return the sum of large integers without losing precision.',
    testCases: [
      { input: 'arr = [1000000001,1000000002,1000000003,1000000004,1000000005]', expected_output: '5000000015', is_sample: true },
      { input: 'arr = [9999999999,1]', expected_output: '10000000000', is_sample: true },
    ],
  },
  {
    slug: 'diagonal-difference',
    title: 'Diagonal Difference',
    difficulty: 'easy',
    tags: ['Matrix'],
    description:
      'For a square matrix, return the absolute difference between the sums of its two diagonals.',
    testCases: [
      { input: 'matrix = [[11,2,4],[4,5,6],[10,8,-12]]', expected_output: '15', is_sample: true },
      { input: 'matrix = [[1,2],[3,4]]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'plus-minus',
    title: 'Plus Minus',
    difficulty: 'easy',
    tags: ['Array', 'Ratios'],
    description:
      'Return the fractions of positive, negative, and zero values in an array, each rounded to six decimals.',
    testCases: [
      { input: 'arr = [-4,3,-9,0,4,1]', expected_output: '0.500000\n0.333333\n0.166667', is_sample: true },
      { input: 'arr = [1,1,0,-1,-1]', expected_output: '0.400000\n0.400000\n0.200000', is_sample: true },
    ],
  },
  {
    slug: 'staircase',
    title: 'Staircase',
    difficulty: 'easy',
    tags: ['String', 'Formatting'],
    description:
      'Print a right-aligned staircase of height n using # characters and spaces.',
    testCases: [
      { input: 'n = 4', expected_output: '   #\n  ##\n ###\n####', is_sample: true },
      { input: 'n = 1', expected_output: '#', is_sample: true },
    ],
  },
  {
    slug: 'mini-max-sum',
    title: 'Mini-Max Sum',
    difficulty: 'easy',
    tags: ['Array', 'Sorting'],
    description:
      'Given five integers, return the minimum and maximum sums obtainable by summing exactly four of them.',
    testCases: [
      { input: 'arr = [1,2,3,4,5]', expected_output: '10 14', is_sample: true },
      { input: 'arr = [7,69,2,221,8974]', expected_output: '299 9271', is_sample: true },
    ],
  },
  {
    slug: 'birthday-cake-candles',
    title: 'Birthday Cake Candles',
    difficulty: 'easy',
    tags: ['Array'],
    description:
      'Return how many candles have the maximum height.',
    testCases: [
      { input: 'candles = [3,2,1,3]', expected_output: '2', is_sample: true },
      { input: 'candles = [4,4,4]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'time-conversion',
    title: 'Time Conversion',
    difficulty: 'easy',
    tags: ['String', 'Date Time'],
    description:
      'Convert a 12-hour time string with AM or PM into 24-hour format.',
    testCases: [
      { input: 's = "07:05:45PM"', expected_output: '19:05:45', is_sample: true },
      { input: 's = "12:00:00AM"', expected_output: '00:00:00', is_sample: true },
    ],
  },
  {
    slug: 'grading-students',
    title: 'Grading Students',
    difficulty: 'easy',
    tags: ['Array', 'Implementation'],
    description:
      'Round each passing grade up to the next multiple of five when the difference is less than three.',
    testCases: [
      { input: 'grades = [73,67,38,33]', expected_output: '[75,67,40,33]', is_sample: true },
      { input: 'grades = [84,29,57]', expected_output: '[85,29,57]', is_sample: true },
    ],
  },
  {
    slug: 'apple-and-orange',
    title: 'Apple and Orange',
    difficulty: 'easy',
    tags: ['Implementation'],
    description:
      'Count apples and oranges that land within the house interval after falling from their trees.',
    testCases: [
      { input: 's = 7\nt = 11\na = 5\nb = 15\napples = [-2,2,1]\noranges = [5,-6]', expected_output: '1\n1', is_sample: true },
      { input: 's = 2\nt = 3\na = 1\nb = 5\napples = [2]\noranges = [-2]', expected_output: '1\n1', is_sample: true },
    ],
  },
  {
    slug: 'kangaroo',
    title: 'Kangaroo',
    difficulty: 'easy',
    tags: ['Math'],
    description:
      'Determine whether two jumpers starting at different positions with fixed jump lengths ever land at the same position.',
    testCases: [
      { input: 'x1 = 0\nv1 = 3\nx2 = 4\nv2 = 2', expected_output: 'YES', is_sample: true },
      { input: 'x1 = 0\nv1 = 2\nx2 = 5\nv2 = 3', expected_output: 'NO', is_sample: true },
    ],
  },
  {
    slug: 'between-two-sets',
    title: 'Between Two Sets',
    difficulty: 'easy',
    tags: ['Math', 'GCD', 'LCM'],
    description:
      'Count integers that are multiples of every value in the first array and factors of every value in the second array.',
    testCases: [
      { input: 'a = [2,4]\nb = [16,32,96]', expected_output: '3', is_sample: true },
      { input: 'a = [3,4]\nb = [24,48]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'breaking-the-records',
    title: 'Breaking the Records',
    difficulty: 'easy',
    tags: ['Array'],
    description:
      'Given scores over a season, count how many times the player breaks their highest and lowest records.',
    testCases: [
      { input: 'scores = [10,5,20,20,4,5,2,25,1]', expected_output: '[2,4]', is_sample: true },
      { input: 'scores = [3,4,21,36,10,28,35,5,24,42]', expected_output: '[4,0]', is_sample: true },
    ],
  },
  {
    slug: 'subarray-division',
    title: 'Subarray Division',
    difficulty: 'easy',
    tags: ['Sliding Window', 'Array'],
    description:
      'Count contiguous segments of length m whose values sum to d.',
    testCases: [
      { input: 's = [1,2,1,3,2]\nd = 3\nm = 2', expected_output: '2', is_sample: true },
      { input: 's = [1,1,1,1,1,1]\nd = 3\nm = 2', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'divisible-sum-pairs',
    title: 'Divisible Sum Pairs',
    difficulty: 'easy',
    tags: ['Array', 'Modulo'],
    description:
      'Count index pairs whose values sum to a multiple of k.',
    testCases: [
      { input: 'ar = [1,3,2,6,1,2]\nk = 3', expected_output: '5', is_sample: true },
      { input: 'ar = [1,2,3,4,5,6]\nk = 5', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'migratory-birds',
    title: 'Migratory Birds',
    difficulty: 'easy',
    tags: ['Counting', 'Array'],
    description:
      'Return the smallest bird type id among the most frequently sighted types.',
    testCases: [
      { input: 'arr = [1,4,4,4,5,3]', expected_output: '4', is_sample: true },
      { input: 'arr = [1,2,3,4,5,4,3,2,1,3,4]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'day-of-the-programmer',
    title: 'Day of the Programmer',
    difficulty: 'easy',
    tags: ['Date Time', 'Implementation'],
    description:
      'Return the date of the 256th day of a given year in Russia, accounting for the calendar transition year.',
    testCases: [
      { input: 'year = 2017', expected_output: '13.09.2017', is_sample: true },
      { input: 'year = 1918', expected_output: '26.09.1918', is_sample: true },
    ],
  },
  {
    slug: 'bon-appetit',
    title: 'Bon Appetit',
    difficulty: 'easy',
    tags: ['Array', 'Implementation'],
    description:
      'Determine whether the charged bill split is fair after excluding the item one person did not eat.',
    testCases: [
      { input: 'bill = [3,10,2,9]\nk = 1\nb = 12', expected_output: '5', is_sample: true },
      { input: 'bill = [3,10,2,9]\nk = 1\nb = 7', expected_output: 'Bon Appetit', is_sample: true },
    ],
  },
  {
    slug: 'sock-merchant',
    title: 'Sock Merchant',
    difficulty: 'easy',
    tags: ['Counting', 'Hash Table'],
    description:
      'Count how many matching pairs of socks can be made from colors in the pile.',
    testCases: [
      { input: 'ar = [10,20,20,10,10,30,50,10,20]', expected_output: '3', is_sample: true },
      { input: 'ar = [1,1,3,1,2,1,3,3,3,3]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'counting-valleys',
    title: 'Counting Valleys',
    difficulty: 'easy',
    tags: ['String', 'Simulation'],
    description:
      'Given a hike path of up and down steps, count valleys that start below sea level and end on returning to sea level.',
    testCases: [
      { input: 'path = "UDDDUDUU"', expected_output: '1', is_sample: true },
      { input: 'path = "DDUUDDUDUUUD"', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'jumping-on-the-clouds',
    title: 'Jumping on the Clouds',
    difficulty: 'easy',
    tags: ['Greedy', 'Array'],
    description:
      'Return the minimum jumps needed to reach the last cloud when you may jump one or two positions and must avoid thunderclouds.',
    testCases: [
      { input: 'clouds = [0,0,1,0,0,1,0]', expected_output: '4', is_sample: true },
      { input: 'clouds = [0,0,0,0,1,0]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'repeated-string',
    title: 'Repeated String',
    difficulty: 'easy',
    tags: ['String', 'Math'],
    description:
      'Count how many times the letter a appears in the first n characters of an infinitely repeated string.',
    testCases: [
      { input: 's = "aba"\nn = 10', expected_output: '7', is_sample: true },
      { input: 's = "a"\nn = 1000000000000', expected_output: '1000000000000', is_sample: true },
    ],
  },
  {
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'medium',
    tags: ['Array', 'Hash Set'],
    description:
      'Return the length of the longest sequence of consecutive integers that can be formed from the array values.',
    testCases: [
      { input: 'nums = [100,4,200,1,3,2]', expected_output: '4', is_sample: true },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', expected_output: '9', is_sample: true },
    ],
  },
  {
    slug: 'encode-and-decode-strings',
    title: 'Encode and Decode Strings',
    difficulty: 'medium',
    tags: ['Array', 'String'],
    description:
      'Encode a list of strings into a single string and decode it back. Return the decoded list.',
    testCases: [
      { input: 'strs = ["lint","code","love","you"]', expected_output: '["lint","code","love","you"]', is_sample: true },
      { input: 'strs = [""]', expected_output: '[""]', is_sample: true },
    ],
  },
  {
    slug: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'medium',
    tags: ['Array', 'Prefix Sum'],
    description:
      'Count the number of contiguous subarrays whose sum equals k.',
    testCases: [
      { input: 'nums = [1,1,1]\nk = 2', expected_output: '2', is_sample: true },
      { input: 'nums = [1,2,3]\nk = 3', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'easy',
    tags: ['Array', 'Two Pointers'],
    description:
      'Merge two sorted arrays into the first array and return the resulting sorted array.',
    testCases: [
      { input: 'nums1 = [1,2,3]\nnums2 = [2,5,6]', expected_output: '[1,2,2,3,5,6]', is_sample: true },
      { input: 'nums1 = [1]\nnums2 = []', expected_output: '[1]', is_sample: true },
    ],
  },
  {
    slug: 'majority-element',
    title: 'Majority Element',
    difficulty: 'easy',
    tags: ['Array', 'Voting'],
    description:
      'Return the element that appears more than half the time in the array.',
    testCases: [
      { input: 'nums = [3,2,3]', expected_output: '3', is_sample: true },
      { input: 'nums = [2,2,1,1,1,2,2]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'missing-number',
    title: 'Missing Number',
    difficulty: 'easy',
    tags: ['Array', 'Math'],
    description:
      'Given n distinct numbers from the range 0..n, return the missing value.',
    testCases: [
      { input: 'nums = [3,0,1]', expected_output: '2', is_sample: true },
      { input: 'nums = [0,1]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'find-all-numbers-disappeared-in-an-array',
    title: 'Find All Numbers Disappeared in an Array',
    difficulty: 'easy',
    tags: ['Array'],
    description:
      'Return all values in the range 1..n that do not appear in the array.',
    testCases: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', expected_output: '[5,6]', is_sample: true },
      { input: 'nums = [1,1]', expected_output: '[2]', is_sample: true },
    ],
  },
  {
    slug: 'first-missing-positive',
    title: 'First Missing Positive',
    difficulty: 'hard',
    tags: ['Array'],
    description:
      'Return the smallest positive integer that does not appear in the array.',
    testCases: [
      { input: 'nums = [1,2,0]', expected_output: '3', is_sample: true },
      { input: 'nums = [3,4,-1,1]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'medium',
    tags: ['Array'],
    description:
      'Rotate the array to the right by k positions and return the resulting array.',
    testCases: [
      { input: 'nums = [1,2,3,4,5,6,7]\nk = 3', expected_output: '[5,6,7,1,2,3,4]', is_sample: true },
      { input: 'nums = [-1,-100,3,99]\nk = 2', expected_output: '[3,99,-1,-100]', is_sample: true },
    ],
  },
  {
    slug: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'medium',
    tags: ['Matrix'],
    description:
      'If a cell contains zero, set its entire row and column to zero and return the resulting matrix.',
    testCases: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', expected_output: '[[1,0,1],[0,0,0],[1,0,1]]', is_sample: true },
      { input: 'matrix = [[0,1],[1,1]]', expected_output: '[[0,0],[0,1]]', is_sample: true },
    ],
  },
  {
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'medium',
    tags: ['Matrix'],
    description:
      'Return all matrix elements in spiral order starting from the top-left corner.',
    testCases: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', expected_output: '[1,2,3,6,9,8,7,4,5]', is_sample: true },
      { input: 'matrix = [[1,2,3,4]]', expected_output: '[1,2,3,4]', is_sample: true },
    ],
  },
  {
    slug: 'sort-colors',
    title: 'Sort Colors',
    difficulty: 'medium',
    tags: ['Array', 'Two Pointers'],
    description:
      'Sort an array containing only 0, 1, and 2 in nondecreasing order.',
    testCases: [
      { input: 'nums = [2,0,2,1,1,0]', expected_output: '[0,0,1,1,2,2]', is_sample: true },
      { input: 'nums = [2,0,1]', expected_output: '[0,1,2]', is_sample: true },
    ],
  },

  // TWO POINTERS

  {
    slug: 'two-sum-ii',
    title: 'Two Sum II',
    difficulty: 'medium',
    tags: ['Two Pointers', 'Array'],
    description:
      'Given a sorted array, return the two 1-based indices whose values sum to the target.',
    testCases: [
      { input: 'numbers = [2,7,11,15]\ntarget = 9', expected_output: '[1,2]', is_sample: true },
      { input: 'numbers = [2,3,4]\ntarget = 6', expected_output: '[1,3]', is_sample: true },
    ],
  },
  {
    slug: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'easy',
    tags: ['Two Pointers', 'Array'],
    description:
      'Move all zeroes to the end while preserving the order of non-zero values.',
    testCases: [
      { input: 'nums = [0,1,0,3,12]', expected_output: '[1,3,12,0,0]', is_sample: true },
      { input: 'nums = [0]', expected_output: '[0]', is_sample: true },
    ],
  },
  {
    slug: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'easy',
    tags: ['Two Pointers', 'Array'],
    description:
      'Remove duplicates from a sorted array and return the resulting unique values.',
    testCases: [
      { input: 'nums = [1,1,2]', expected_output: '[1,2]', is_sample: true },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expected_output: '[0,1,2,3,4]', is_sample: true },
    ],
  },
  {
    slug: 'squares-of-a-sorted-array',
    title: 'Squares of a Sorted Array',
    difficulty: 'easy',
    tags: ['Two Pointers', 'Array'],
    description:
      'Return a sorted array containing the squares of each value.',
    testCases: [
      { input: 'nums = [-4,-1,0,3,10]', expected_output: '[0,1,9,16,100]', is_sample: true },
      { input: 'nums = [-7,-3,2,3,11]', expected_output: '[4,9,9,49,121]', is_sample: true },
    ],
  },
  {
    slug: 'backspace-string-compare',
    title: 'Backspace String Compare',
    difficulty: 'easy',
    tags: ['Two Pointers', 'String'],
    description:
      'Determine whether two strings are equal after processing backspace characters.',
    testCases: [
      { input: 's = "ab#c"\nt = "ad#c"', expected_output: 'true', is_sample: true },
      { input: 's = "a#c"\nt = "b"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'boats-to-save-people',
    title: 'Boats to Save People',
    difficulty: 'medium',
    tags: ['Greedy', 'Two Pointers'],
    description:
      'Return the minimum number of boats needed to carry everyone within the weight limit.',
    testCases: [
      { input: 'people = [1,2]\nlimit = 3', expected_output: '1', is_sample: true },
      { input: 'people = [3,2,2,1]\nlimit = 3', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'partition-labels',
    title: 'Partition Labels',
    difficulty: 'medium',
    tags: ['Greedy', 'String'],
    description:
      'Partition a string so that each letter appears in at most one part and return partition lengths.',
    testCases: [
      { input: 's = "ababcbacadefegdehijhklij"', expected_output: '[9,7,8]', is_sample: true },
      { input: 's = "eccbbbbdec"', expected_output: '[10]', is_sample: true },
    ],
  },
  {
    slug: 'merge-strings-alternately',
    title: 'Merge Strings Alternately',
    difficulty: 'easy',
    tags: ['Two Pointers', 'String'],
    description:
      'Merge two strings by alternating characters from each string.',
    testCases: [
      { input: 'word1 = "abc"\nword2 = "pqr"', expected_output: 'apbqcr', is_sample: true },
      { input: 'word1 = "ab"\nword2 = "pqrs"', expected_output: 'apbqrs', is_sample: true },
    ],
  },
  {
    slug: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'easy',
    tags: ['Two Pointers', 'String'],
    description:
      'Return the reverse of the provided string.',
    testCases: [
      { input: 's = "hello"', expected_output: 'olleh', is_sample: true },
      { input: 's = "Hannah"', expected_output: 'hannaH', is_sample: true },
    ],
  },
  {
    slug: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    difficulty: 'easy',
    tags: ['Linked List', 'Two Pointers'],
    description:
      'Determine whether the linked list values form a palindrome.',
    testCases: [
      { input: 'head = [1,2,2,1]', expected_output: 'true', is_sample: true },
      { input: 'head = [1,2]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'dutch-national-flag',
    title: 'Dutch National Flag',
    difficulty: 'medium',
    tags: ['Two Pointers', 'Array'],
    description:
      'Sort an array containing only 0, 1, and 2 using constant extra space.',
    testCases: [
      { input: 'nums = [2,0,2,1,1,0]', expected_output: '[0,0,1,1,2,2]', is_sample: true },
      { input: 'nums = [2,0,1]', expected_output: '[0,1,2]', is_sample: true },
    ],
  },
  {
    slug: 'pair-sum',
    title: 'Pair Sum',
    difficulty: 'easy',
    tags: ['Two Pointers', 'Array'],
    description:
      'Given a sorted array and a target, determine whether a pair exists whose sum equals the target.',
    testCases: [
      { input: 'nums = [1,2,3,4,6]\ntarget = 6', expected_output: 'true', is_sample: true },
      { input: 'nums = [2,5,9,11]\ntarget = 11', expected_output: 'true', is_sample: true },
    ],
  },
  {
    slug: 'triplet-sum',
    title: 'Triplet Sum',
    difficulty: 'medium',
    tags: ['Two Pointers', 'Array'],
    description:
      'Determine whether three numbers exist whose sum equals the target.',
    testCases: [
      { input: 'nums = [-1,0,2,3]\ntarget = 3', expected_output: 'true', is_sample: true },
      { input: 'nums = [1,2,4,8]\ntarget = 20', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'minimum-window-sort',
    title: 'Minimum Window Sort',
    difficulty: 'medium',
    tags: ['Two Pointers', 'Array'],
    description:
      'Return the length of the smallest subarray that must be sorted so the entire array becomes sorted.',
    testCases: [
      { input: 'nums = [1,2,5,3,7,10,9,12]', expected_output: '5', is_sample: true },
      { input: 'nums = [1,3,2,0,-1,7,10]', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'quadruple-sum-to-target',
    title: 'Quadruple Sum to Target',
    difficulty: 'medium',
    tags: ['Two Pointers', 'Array'],
    description:
      'Return all unique quadruplets whose values sum to the target.',
    testCases: [
      { input: 'nums = [4,1,2,-1,1,-3]\ntarget = 1', expected_output: '[[-3,-1,1,4],[-3,1,1,2]]', is_sample: true },
      { input: 'nums = [2,0,-1,1,-2,2]\ntarget = 2', expected_output: '[[-2,0,2,2],[-1,0,1,2]]', is_sample: true },
    ],
  },
  {
    slug: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'medium',
    tags: ['Sliding Window', 'String'],
    description:
      'Return the length of the longest substring that can be made of the same character after replacing at most k characters.',
    testCases: [
      { input: 's = "ABAB"\nk = 2', expected_output: '4', is_sample: true },
      { input: 's = "AABABBA"\nk = 1', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'medium',
    tags: ['Sliding Window', 'String'],
    description:
      'Determine whether s2 contains a permutation of s1 as a substring.',
    testCases: [
      { input: 's1 = "ab"\ns2 = "eidbaooo"', expected_output: 'true', is_sample: true },
      { input: 's1 = "ab"\ns2 = "eidboaoo"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    difficulty: 'hard',
    tags: ['Sliding Window', 'Deque'],
    description:
      'Return the maximum value in every contiguous subarray of size k.',
    testCases: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7]\nk = 3', expected_output: '[3,3,5,5,6,7]', is_sample: true },
      { input: 'nums = [1]\nk = 1', expected_output: '[1]', is_sample: true },
    ],
  },
  {
    slug: 'fruit-into-baskets',
    title: 'Fruit Into Baskets',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the maximum number of fruits that can be collected using at most two fruit types.',
    testCases: [
      { input: 'fruits = [1,2,1]', expected_output: '3', is_sample: true },
      { input: 'fruits = [0,1,2,2]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'find-all-anagrams-in-a-string',
    title: 'Find All Anagrams in a String',
    difficulty: 'medium',
    tags: ['Sliding Window', 'String'],
    description:
      'Return all starting indices of substrings in s that are anagrams of p.',
    testCases: [
      { input: 's = "cbaebabacd"\np = "abc"', expected_output: '[0,6]', is_sample: true },
      { input: 's = "abab"\np = "ab"', expected_output: '[0,1,2]', is_sample: true },
    ],
  },
  {
    slug: 'maximum-average-subarray-i',
    title: 'Maximum Average Subarray I',
    difficulty: 'easy',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the maximum average value among all contiguous subarrays of length k.',
    testCases: [
      { input: 'nums = [1,12,-5,-6,50,3]\nk = 4', expected_output: '12.75', is_sample: true },
      { input: 'nums = [5]\nk = 1', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'longest-ones',
    title: 'Longest Ones',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the maximum length of consecutive 1s after flipping at most k zeros.',
    testCases: [
      { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0]\nk = 2', expected_output: '6', is_sample: true },
      { input: 'nums = [0,0,1,1,1,0,0]\nk = 0', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'subarrays-with-k-different-integers',
    title: 'Subarrays with K Different Integers',
    difficulty: 'hard',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the number of subarrays containing exactly k distinct integers.',
    testCases: [
      { input: 'nums = [1,2,1,2,3]\nk = 2', expected_output: '7', is_sample: true },
      { input: 'nums = [1,2,1,3,4]\nk = 3', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'binary-subarrays-with-sum',
    title: 'Binary Subarrays With Sum',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Prefix Sum'],
    description:
      'Return the number of binary subarrays whose sum equals the goal.',
    testCases: [
      { input: 'nums = [1,0,1,0,1]\ngoal = 2', expected_output: '4', is_sample: true },
      { input: 'nums = [0,0,0,0,0]\ngoal = 0', expected_output: '15', is_sample: true },
    ],
  },
  {
    slug: 'count-number-of-nice-subarrays',
    title: 'Count Number of Nice Subarrays',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the number of subarrays containing exactly k odd numbers.',
    testCases: [
      { input: 'nums = [1,1,2,1,1]\nk = 3', expected_output: '2', is_sample: true },
      { input: 'nums = [2,4,6]\nk = 1', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'minimum-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the minimum length of a contiguous subarray whose sum is at least target.',
    testCases: [
      { input: 'target = 7\nnums = [2,3,1,2,4,3]', expected_output: '2', is_sample: true },
      { input: 'target = 4\nnums = [1,4,4]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'repeated-dna-sequences',
    title: 'Repeated DNA Sequences',
    difficulty: 'medium',
    tags: ['Sliding Window', 'String'],
    description:
      'Return all 10-letter-long DNA sequences that occur more than once.',
    testCases: [
      { input: 's = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"', expected_output: '["AAAAACCCCC","CCCCCAAAAA"]', is_sample: true },
      { input: 's = "AAAAAAAAAAAAA"', expected_output: '["AAAAAAAAAA"]', is_sample: true },
    ],
  },
  {
    slug: 'longest-subarray-of-1s-after-deleting-one-element',
    title: 'Longest Subarray of 1s After Deleting One Element',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Delete exactly one element and return the longest subarray consisting only of 1s.',
    testCases: [
      { input: 'nums = [1,1,0,1]', expected_output: '3', is_sample: true },
      { input: 'nums = [0,1,1,1,0,1,1,0,1]', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'diet-plan-performance',
    title: 'Diet Plan Performance',
    difficulty: 'easy',
    tags: ['Sliding Window', 'Array'],
    description:
      'Evaluate the diet score based on k-day calorie windows and thresholds.',
    testCases: [
      { input: 'calories = [1,2,3,4,5]\nk = 1\nlower = 3\nupper = 3', expected_output: '0', is_sample: true },
      { input: 'calories = [6,5,0,0]\nk = 2\nlower = 1\nupper = 5', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'maximum-points-you-can-obtain-from-cards',
    title: 'Maximum Points You Can Obtain from Cards',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the maximum score obtainable by taking exactly k cards from either end.',
    testCases: [
      { input: 'cardPoints = [1,2,3,4,5,6,1]\nk = 3', expected_output: '12', is_sample: true },
      { input: 'cardPoints = [2,2,2]\nk = 2', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'defuse-the-bomb',
    title: 'Defuse the Bomb',
    difficulty: 'easy',
    tags: ['Sliding Window', 'Array'],
    description:
      'Replace every element with the sum of the next or previous k elements in the circular array.',
    testCases: [
      { input: 'code = [5,7,1,4]\nk = 3', expected_output: '[12,10,16,13]', is_sample: true },
      { input: 'code = [2,4,9,3]\nk = -2', expected_output: '[12,5,6,13]', is_sample: true },
    ],
  },
  {
    slug: 'grumpy-bookstore-owner',
    title: 'Grumpy Bookstore Owner',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the maximum number of satisfied customers after using the secret technique once.',
    testCases: [
      { input: 'customers = [1,0,1,2,1,1,7,5]\ngrumpy = [0,1,0,1,0,1,0,1]\nminutes = 3', expected_output: '16', is_sample: true },
      { input: 'customers = [1]\ngrumpy = [0]\nminutes = 1', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'substring-with-concatenation-of-all-words',
    title: 'Substring with Concatenation of All Words',
    difficulty: 'hard',
    tags: ['Sliding Window', 'String'],
    description:
      'Return all starting indices of substrings formed by concatenating all given words exactly once.',
    testCases: [
      { input: 's = "barfoothefoobarman"\nwords = ["foo","bar"]', expected_output: '[0,9]', is_sample: true },
      { input: 's = "wordgoodgoodgoodbestword"\nwords = ["word","good","best","word"]', expected_output: '[]', is_sample: true },
    ],
  },

  // BINARY SEARCH

  {
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'easy',
    tags: ['Binary Search', 'Array'],
    description:
      'Return the index of the target in the sorted array, or -1 if it does not exist.',
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12]\ntarget = 9', expected_output: '4', is_sample: true },
      { input: 'nums = [-1,0,3,5,9,12]\ntarget = 2', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'defuse-the-bomb',
    title: 'Defuse the Bomb',
    difficulty: 'easy',
    tags: ['Sliding Window', 'Array'],
    description:
      'Replace every element with the sum of the next or previous k elements in the circular array.',
    testCases: [
      { input: 'code = [5,7,1,4]\nk = 3', expected_output: '[12,10,16,13]', is_sample: true },
      { input: 'code = [2,4,9,3]\nk = -2', expected_output: '[12,5,6,13]', is_sample: true },
    ],
  },
  {
    slug: 'grumpy-bookstore-owner',
    title: 'Grumpy Bookstore Owner',
    difficulty: 'medium',
    tags: ['Sliding Window', 'Array'],
    description:
      'Return the maximum number of satisfied customers after using the secret technique once.',
    testCases: [
      { input: 'customers = [1,0,1,2,1,1,7,5]\ngrumpy = [0,1,0,1,0,1,0,1]\nminutes = 3', expected_output: '16', is_sample: true },
      { input: 'customers = [1]\ngrumpy = [0]\nminutes = 1', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'substring-with-concatenation-of-all-words',
    title: 'Substring with Concatenation of All Words',
    difficulty: 'hard',
    tags: ['Sliding Window', 'String'],
    description:
      'Return all starting indices of substrings formed by concatenating all given words exactly once.',
    testCases: [
      { input: 's = "barfoothefoobarman"\nwords = ["foo","bar"]', expected_output: '[0,9]', is_sample: true },
      { input: 's = "wordgoodgoodgoodbestword"\nwords = ["word","good","best","word"]', expected_output: '[]', is_sample: true },
    ],
  },

  // BINARY SEARCH

  {
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'easy',
    tags: ['Binary Search', 'Array'],
    description:
      'Return the index of the target in the sorted array, or -1 if it does not exist.',
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12]\ntarget = 9', expected_output: '4', is_sample: true },
      { input: 'nums = [-1,0,3,5,9,12]\ntarget = 2', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'search-insert-position',
    title: 'Search Insert Position',
    difficulty: 'easy',
    tags: ['Binary Search', 'Array'],
    description:
      'Return the index where the target should be inserted in sorted order.',
    testCases: [
      { input: 'nums = [1,3,5,6]\ntarget = 5', expected_output: '2', is_sample: true },
      { input: 'nums = [1,3,5,6]\ntarget = 2', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'search-a-2d-matrix',
    title: 'Search a 2D Matrix',
    difficulty: 'medium',
    tags: ['Binary Search', 'Matrix'],
    description:
      'Determine whether the target exists in the matrix.',
    testCases: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 3', expected_output: 'true', is_sample: true },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]\ntarget = 13', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'medium',
    tags: ['Binary Search'],
    description:
      'Return the minimum eating speed required to finish all banana piles within h hours.',
    testCases: [
      { input: 'piles = [3,6,7,11]\nh = 8', expected_output: '4', is_sample: true },
      { input: 'piles = [30,11,23,4,20]\nh = 5', expected_output: '30', is_sample: true },
    ],
  },
  {
    slug: 'time-based-key-value-store',
    title: 'Time Based Key-Value Store',
    difficulty: 'medium',
    tags: ['Binary Search', 'Design'],
    description:
      'Implement a time-based key-value store supporting historical lookups.',
    testCases: [
      { input: 'operations = ["set","get"]\nvalues = [["foo","bar",1],["foo",1]]', expected_output: '["bar"]', is_sample: true },
      { input: 'operations = ["set","set","get"]\nvalues = [["foo","bar",1],["foo","bar2",4],["foo",4]]', expected_output: '["bar2"]', is_sample: true },
    ],
  },
  {
    slug: 'capacity-to-ship-packages-within-d-days',
    title: 'Capacity To Ship Packages Within D Days',
    difficulty: 'medium',
    tags: ['Binary Search', 'Greedy'],
    description:
      'Return the minimum ship capacity required to deliver all packages within the given number of days.',
    testCases: [
      { input: 'weights = [1,2,3,4,5,6,7,8,9,10]\ndays = 5', expected_output: '15', is_sample: true },
      { input: 'weights = [3,2,2,4,1,4]\ndays = 3', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'split-array-largest-sum',
    title: 'Split Array Largest Sum',
    difficulty: 'hard',
    tags: ['Binary Search', 'Array'],
    description:
      'Split the array into k subarrays and minimize the largest subarray sum.',
    testCases: [
      { input: 'nums = [7,2,5,10,8]\nk = 2', expected_output: '18', is_sample: true },
      { input: 'nums = [1,2,3,4,5]\nk = 2', expected_output: '9', is_sample: true },
    ],
  },
  {
    slug: 'find-peak-element',
    title: 'Find Peak Element',
    difficulty: 'medium',
    tags: ['Binary Search', 'Array'],
    description:
      'Return the index of any peak element.',
    testCases: [
      { input: 'nums = [1,2,3,1]', expected_output: '2', is_sample: true },
      { input: 'nums = [1,2,1,3,5,6,4]', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'sqrtx',
    title: 'Sqrt(x)',
    difficulty: 'easy',
    tags: ['Binary Search', 'Math'],
    description:
      'Return the integer square root of x.',
    testCases: [
      { input: 'x = 4', expected_output: '2', is_sample: true },
      { input: 'x = 8', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'aggressive-cows',
    title: 'Aggressive Cows',
    difficulty: 'medium',
    tags: ['Binary Search'],
    description:
      'Place cows in stalls such that the minimum distance between any two cows is maximized.',
    testCases: [
      { input: 'stalls = [1,2,4,8,9]\ncows = 3', expected_output: '3', is_sample: true },
      { input: 'stalls = [1,2,3]\ncows = 2', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'painters-partition',
    title: 'Painter\'s Partition',
    difficulty: 'hard',
    tags: ['Binary Search'],
    description:
      'Partition boards among painters to minimize the maximum workload.',
    testCases: [
      { input: 'boards = [10,20,30,40]\npainters = 2', expected_output: '60', is_sample: true },
      { input: 'boards = [5,10,30,20,15]\npainters = 3', expected_output: '35', is_sample: true },
    ],
  },
  {
    slug: 'allocate-minimum-number-of-pages',
    title: 'Allocate Minimum Number of Pages',
    difficulty: 'hard',
    tags: ['Binary Search'],
    description:
      'Allocate books among students while minimizing the maximum pages assigned.',
    testCases: [
      { input: 'pages = [12,34,67,90]\nstudents = 2', expected_output: '113', is_sample: true },
      { input: 'pages = [10,20,30,40]\nstudents = 2', expected_output: '60', is_sample: true },
    ],
  },
  {
    slug: 'single-element-in-a-sorted-array',
    title: 'Single Element in a Sorted Array',
    difficulty: 'medium',
    tags: ['Binary Search', 'Array'],
    description:
      'Return the element that appears exactly once in the sorted array.',
    testCases: [
      { input: 'nums = [1,1,2,3,3,4,4,8,8]', expected_output: '2', is_sample: true },
      { input: 'nums = [3,3,7,7,10,11,11]', expected_output: '10', is_sample: true },
    ],
  },
  {
    slug: 'magnetic-force-between-two-balls',
    title: 'Magnetic Force Between Two Balls',
    difficulty: 'medium',
    tags: ['Binary Search', 'Greedy'],
    description:
      'Place m balls in positions such that the minimum distance between any two balls is maximized.',
    testCases: [
      { input: 'position = [1,2,3,4,7]\nm = 3', expected_output: '3', is_sample: true },
      { input: 'position = [5,4,3,2,1,1000000000]\nm = 2', expected_output: '999999999', is_sample: true },
    ],
  },
  {
    slug: 'nth-root-of-integer',
    title: 'Nth Root of Integer',
    difficulty: 'medium',
    tags: ['Binary Search', 'Math'],
    description:
      'Return the integer nth root of m if it exists, otherwise return -1.',
    testCases: [
      { input: 'n = 3\nm = 27', expected_output: '3', is_sample: true },
      { input: 'n = 4\nm = 69', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'search-in-nearly-sorted-array',
    title: 'Search in Nearly Sorted Array',
    difficulty: 'medium',
    tags: ['Binary Search', 'Array'],
    description:
      'Search for the target in a nearly sorted array where each element may be misplaced by at most one position.',
    testCases: [
      { input: 'nums = [5,10,30,20,40]\ntarget = 20', expected_output: '3', is_sample: true },
      { input: 'nums = [10,3,40,20,50,80,70]\ntarget = 40', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'minimum-number-of-days-to-make-m-bouquets',
    title: 'Minimum Number of Days to Make m Bouquets',
    difficulty: 'medium',
    tags: ['Binary Search', 'Array'],
    description:
      'Return the minimum number of days required to make m bouquets using k adjacent flowers per bouquet.',
    testCases: [
      { input: 'bloomDay = [1,10,3,10,2]\nm = 3\nk = 1', expected_output: '3', is_sample: true },
      { input: 'bloomDay = [1,10,3,10,2]\nm = 3\nk = 2', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'min-stack',
    title: 'Min Stack',
    difficulty: 'medium',
    tags: ['Stack', 'Design'],
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    testCases: [
      { input: 'operations = ["push","push","push","getMin"]\nvalues = [[-2],[0],[-3],[]]', expected_output: '-3', is_sample: true },
      { input: 'operations = ["push","push","getMin"]\nvalues = [[1],[2],[]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'medium',
    tags: ['Stack'],
    description:
      'Evaluate the arithmetic expression represented in Reverse Polish Notation.',
    testCases: [
      { input: 'tokens = ["2","1","+","3","*"]', expected_output: '9', is_sample: true },
      { input: 'tokens = ["4","13","5","/","+"]', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'medium',
    tags: ['Stack', 'Backtracking'],
    description:
      'Generate all valid combinations of n pairs of parentheses.',
    testCases: [
      { input: 'n = 3', expected_output: '["((()))","(()())","(())()","()(())","()()()"]', is_sample: true },
      { input: 'n = 1', expected_output: '["()"]', is_sample: true },
    ],
  },
  {
    slug: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'medium',
    tags: ['Stack', 'Monotonic Stack'],
    description:
      'Return the number of days until a warmer temperature for each day.',
    testCases: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', expected_output: '[1,1,4,2,1,1,0,0]', is_sample: true },
      { input: 'temperatures = [30,40,50,60]', expected_output: '[1,1,1,0]', is_sample: true },
    ],
  },
  {
    slug: 'car-fleet',
    title: 'Car Fleet',
    difficulty: 'medium',
    tags: ['Stack', 'Greedy'],
    description:
      'Return the number of car fleets that will arrive at the destination.',
    testCases: [
      { input: 'target = 12\nposition = [10,8,0,5,3]\nspeed = [2,4,1,1,3]', expected_output: '3', is_sample: true },
      { input: 'target = 10\nposition = [3]\nspeed = [3]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'basic-calculator',
    title: 'Basic Calculator',
    difficulty: 'hard',
    tags: ['Stack', 'String'],
    description:
      'Evaluate a mathematical expression containing integers, spaces, plus, minus, and parentheses.',
    testCases: [
      { input: 's = "1 + 1"', expected_output: '2', is_sample: true },
      { input: 's = "(1+(4+5+2)-3)+(6+8)"', expected_output: '23', is_sample: true },
    ],
  },
  {
    slug: 'asteroid-collision',
    title: 'Asteroid Collision',
    difficulty: 'medium',
    tags: ['Stack'],
    description:
      'Simulate asteroid collisions and return the state of the asteroids after all collisions.',
    testCases: [
      { input: 'asteroids = [5,10,-5]', expected_output: '[5,10]', is_sample: true },
      { input: 'asteroids = [8,-8]', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'decode-string',
    title: 'Decode String',
    difficulty: 'medium',
    tags: ['Stack', 'String'],
    description:
      'Decode the encoded string following the k[encoded_string] pattern.',
    testCases: [
      { input: 's = "3[a]2[bc]"', expected_output: 'aaabcbc', is_sample: true },
      { input: 's = "3[a2[c]]"', expected_output: 'accaccacc', is_sample: true },
    ],
  },
  {
    slug: 'remove-k-digits',
    title: 'Remove K Digits',
    difficulty: 'medium',
    tags: ['Stack', 'Greedy'],
    description:
      'Remove exactly k digits to produce the smallest possible number.',
    testCases: [
      { input: 'num = "1432219"\nk = 3', expected_output: '1219', is_sample: true },
      { input: 'num = "10200"\nk = 1', expected_output: '200', is_sample: true },
    ],
  },
  {
    slug: 'online-stock-span',
    title: 'Online Stock Span',
    difficulty: 'medium',
    tags: ['Stack', 'Design'],
    description:
      'For each stock price, return the span of consecutive days with price less than or equal to today.',
    testCases: [
      { input: 'prices = [100,80,60,70,60,75,85]', expected_output: '[1,1,1,2,1,4,6]', is_sample: true },
      { input: 'prices = [31,41,48,59,79]', expected_output: '[1,2,3,4,5]', is_sample: true },
    ],
  },
  {
    slug: 'next-greater-element-i',
    title: 'Next Greater Element I',
    difficulty: 'easy',
    tags: ['Stack', 'Array'],
    description:
      'For each element in nums1, find the next greater element in nums2.',
    testCases: [
      { input: 'nums1 = [4,1,2]\nnums2 = [1,3,4,2]', expected_output: '[-1,3,-1]', is_sample: true },
      { input: 'nums1 = [2,4]\nnums2 = [1,2,3,4]', expected_output: '[3,-1]', is_sample: true },
    ],
  },
  {
    slug: 'next-greater-element-ii',
    title: 'Next Greater Element II',
    difficulty: 'medium',
    tags: ['Stack', 'Array'],
    description:
      'Return the next greater element for each value in a circular array.',
    testCases: [
      { input: 'nums = [1,2,1]', expected_output: '[2,-1,2]', is_sample: true },
      { input: 'nums = [1,2,3,4,3]', expected_output: '[2,3,4,-1,4]', is_sample: true },
    ],
  },
  {
    slug: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'medium',
    tags: ['Stack', 'String'],
    description:
      'Convert an absolute Unix file path into its canonical form.',
    testCases: [
      { input: 'path = "/home/"', expected_output: '/home', is_sample: true },
      { input: 'path = "/a/./b/../../c/"', expected_output: '/c', is_sample: true },
    ],
  },
  {
    slug: 'score-of-parentheses',
    title: 'Score of Parentheses',
    difficulty: 'medium',
    tags: ['Stack'],
    description:
      'Compute the score of a balanced parentheses string.',
    testCases: [
      { input: 's = "()"', expected_output: '1', is_sample: true },
      { input: 's = "(())"', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'remove-duplicate-letters',
    title: 'Remove Duplicate Letters',
    difficulty: 'medium',
    tags: ['Stack', 'Greedy'],
    description:
      'Remove duplicate letters so every letter appears once and the result is lexicographically smallest.',
    testCases: [
      { input: 's = "bcabc"', expected_output: 'abc', is_sample: true },
      { input: 's = "cbacdcbc"', expected_output: 'acdb', is_sample: true },
    ],
  },
  {
    slug: 'exclusive-time-of-functions',
    title: 'Exclusive Time of Functions',
    difficulty: 'medium',
    tags: ['Stack'],
    description:
      'Given execution logs of functions, return the exclusive execution time of each function.',
    testCases: [
      { input: 'n = 2\nlogs = ["0:start:0","1:start:2","1:end:5","0:end:6"]', expected_output: '[3,4]', is_sample: true },
      { input: 'n = 1\nlogs = ["0:start:0","0:end:0"]', expected_output: '[1]', is_sample: true },
    ],
  },
  {
    slug: 'maximal-rectangle',
    title: 'Maximal Rectangle',
    difficulty: 'hard',
    tags: ['Stack', 'Matrix'],
    description:
      'Return the area of the largest rectangle containing only 1s in a binary matrix.',
    testCases: [
      { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', expected_output: '6', is_sample: true },
      { input: 'matrix = [["0"]]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: '132-pattern',
    title: '132 Pattern',
    difficulty: 'medium',
    tags: ['Stack', 'Array'],
    description:
      'Determine whether there exists a subsequence following the 132 pattern.',
    testCases: [
      { input: 'nums = [3,1,4,2]', expected_output: 'true', is_sample: true },
      { input: 'nums = [1,2,3,4]', expected_output: 'false', is_sample: true },
    ],
  },

  // LINKED LIST

  {
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'easy',
    tags: ['Linked List'],
    description:
      'Reverse a singly linked list and return the new head.',
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected_output: '[5,4,3,2,1]', is_sample: true },
      { input: 'head = [1,2]', expected_output: '[2,1]', is_sample: true },
    ],
  },
  {
    slug: 'reorder-list',
    title: 'Reorder List',
    difficulty: 'medium',
    tags: ['Linked List'],
    description:
      'Reorder the list into the pattern L0→Ln→L1→Ln−1→...',
    testCases: [
      { input: 'head = [1,2,3,4]', expected_output: '[1,4,2,3]', is_sample: true },
      { input: 'head = [1,2,3,4,5]', expected_output: '[1,5,2,4,3]', is_sample: true },
    ],
  },
  {
    slug: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    difficulty: 'medium',
    tags: ['Linked List', 'Two Pointers'],
    description:
      'Remove the nth node from the end of the list and return the resulting list.',
    testCases: [
      { input: 'head = [1,2,3,4,5]\nn = 2', expected_output: '[1,2,3,5]', is_sample: true },
      { input: 'head = [1]\nn = 1', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'copy-list-with-random-pointer',
    title: 'Copy List with Random Pointer',
    difficulty: 'medium',
    tags: ['Linked List', 'Hash Table'],
    description:
      'Create a deep copy of a linked list where each node has an additional random pointer.',
    testCases: [
      { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', expected_output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', is_sample: true },
      { input: 'head = [[1,1],[2,1]]', expected_output: '[[1,1],[2,1]]', is_sample: true },
    ],
  },
  {
    slug: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'medium',
    tags: ['Linked List', 'Math'],
    description:
      'Add two numbers represented by linked lists and return the sum as a linked list.',
    testCases: [
      { input: 'l1 = [2,4,3]\nl2 = [5,6,4]', expected_output: '[7,0,8]', is_sample: true },
      { input: 'l1 = [0]\nl2 = [0]', expected_output: '[0]', is_sample: true },
    ],
  },
  {
    slug: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'easy',
    tags: ['Linked List', 'Two Pointers'],
    description:
      'Determine whether a linked list contains a cycle.',
    testCases: [
      { input: 'head = [3,2,0,-4]\npos = 1', expected_output: 'true', is_sample: true },
      { input: 'head = [1,2]\npos = -1', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'find-the-duplicate-number',
    title: 'Find the Duplicate Number',
    difficulty: 'medium',
    tags: ['Linked List', 'Array'],
    description:
      'Return the duplicate number in the array without modifying it.',
    testCases: [
      { input: 'nums = [1,3,4,2,2]', expected_output: '2', is_sample: true },
      { input: 'nums = [3,1,3,4,2]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'medium',
    tags: ['Linked List', 'Design'],
    description:
      'Design a Least Recently Used cache supporting get and put operations.',
    testCases: [
      { input: 'capacity = 2\noperations = ["put","put","get","put","get","put","get","get","get"]', expected_output: '[1,-1,-1,3,4]', is_sample: true },
      { input: 'capacity = 1\noperations = ["put","put","get"]', expected_output: '[-1]', is_sample: true },
    ],
  },
  {
    slug: 'reverse-nodes-in-k-group',
    title: 'Reverse Nodes in k-Group',
    difficulty: 'hard',
    tags: ['Linked List'],
    description:
      'Reverse nodes of the linked list k at a time.',
    testCases: [
      { input: 'head = [1,2,3,4,5]\nk = 2', expected_output: '[2,1,4,3,5]', is_sample: true },
      { input: 'head = [1,2,3,4,5]\nk = 3', expected_output: '[3,2,1,4,5]', is_sample: true },
    ],
  },
  {
    slug: 'intersection-of-two-linked-lists',
    title: 'Intersection of Two Linked Lists',
    difficulty: 'easy',
    tags: ['Linked List'],
    description:
      'Return the value of the node where two linked lists intersect.',
    testCases: [
      { input: 'listA = [4,1,8,4,5]\nlistB = [5,6,1,8,4,5]', expected_output: '8', is_sample: true },
      { input: 'listA = [1,9,1,2,4]\nlistB = [3,2,4]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'rotate-list',
    title: 'Rotate List',
    difficulty: 'medium',
    tags: ['Linked List'],
    description:
      'Rotate the linked list to the right by k places.',
    testCases: [
      { input: 'head = [1,2,3,4,5]\nk = 2', expected_output: '[4,5,1,2,3]', is_sample: true },
      { input: 'head = [0,1,2]\nk = 4', expected_output: '[2,0,1]', is_sample: true },
    ],
  },
  {
    slug: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    difficulty: 'easy',
    tags: ['Linked List', 'Two Pointers'],
    description:
      'Determine whether the values in a linked list form a palindrome.',
    testCases: [
      { input: 'head = [1,2,2,1]', expected_output: 'true', is_sample: true },
      { input: 'head = [1,2]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'flatten-a-multilevel-doubly-linked-list',
    title: 'Flatten a Multilevel Doubly Linked List',
    difficulty: 'medium',
    tags: ['Linked List'],
    description:
      'Flatten a multilevel doubly linked list into a single-level doubly linked list.',
    testCases: [
      { input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', expected_output: '[1,2,3,7,8,11,12,9,10,4,5,6]', is_sample: true },
      { input: 'head = [1,2,null,3]', expected_output: '[1,3,2]', is_sample: true },
    ],
  },
  {
    slug: 'swap-nodes-in-pairs',
    title: 'Swap Nodes in Pairs',
    difficulty: 'medium',
    tags: ['Linked List'],
    description:
      'Swap every two adjacent nodes and return the modified list.',
    testCases: [
      { input: 'head = [1,2,3,4]', expected_output: '[2,1,4,3]', is_sample: true },
      { input: 'head = []', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'sort-list',
    title: 'Sort List',
    difficulty: 'medium',
    tags: ['Linked List', 'Merge Sort'],
    description:
      'Sort a linked list in ascending order.',
    testCases: [
      { input: 'head = [4,2,1,3]', expected_output: '[1,2,3,4]', is_sample: true },
      { input: 'head = [-1,5,3,4,0]', expected_output: '[-1,0,3,4,5]', is_sample: true },
    ],
  },
  {
    slug: 'odd-even-linked-list',
    title: 'Odd Even Linked List',
    difficulty: 'medium',
    tags: ['Linked List'],
    description:
      'Group all odd-indexed nodes together followed by the even-indexed nodes.',
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected_output: '[1,3,5,2,4]', is_sample: true },
      { input: 'head = [2,1,3,5,6,4,7]', expected_output: '[2,3,6,7,1,5,4]', is_sample: true },
    ],
  },
  {
    slug: 'partition-list',
    title: 'Partition List',
    difficulty: 'medium',
    tags: ['Linked List'],
    description:
      'Partition the list so all nodes less than x appear before nodes greater than or equal to x.',
    testCases: [
      { input: 'head = [1,4,3,2,5,2]\nx = 3', expected_output: '[1,2,2,4,3,5]', is_sample: true },
      { input: 'head = [2,1]\nx = 2', expected_output: '[1,2]', is_sample: true },
    ],
  },
  {
    slug: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'hard',
    tags: ['Linked List', 'Heap'],
    description:
      'Merge k sorted linked lists and return a single sorted linked list.',
    testCases: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected_output: '[1,1,2,3,4,4,5,6]', is_sample: true },
      { input: 'lists = []', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'design-browser-history',
    title: 'Design Browser History',
    difficulty: 'medium',
    tags: ['Linked List', 'Design'],
    description:
      'Implement browser history with visit, back, and forward operations.',
    testCases: [
      { input: 'homepage = "leetcode.com"\nactions = ["visit","visit","visit","back","back","forward"]', expected_output: '["google.com","facebook.com","facebook.com"]', is_sample: true },
      { input: 'homepage = "a.com"\nactions = ["visit","back"]', expected_output: '["a.com"]', is_sample: true },
    ],
  },
  {
    slug: 'middle-of-the-linked-list',
    title: 'Middle of the Linked List',
    difficulty: 'easy',
    tags: ['Linked List', 'Two Pointers'],
    description:
      'Return the middle node of the linked list.',
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected_output: '[3,4,5]', is_sample: true },
      { input: 'head = [1,2,3,4,5,6]', expected_output: '[4,5,6]', is_sample: true },
    ],
  },
  {
    slug: 'remove-linked-list-elements',
    title: 'Remove Linked List Elements',
    difficulty: 'easy',
    tags: ['Linked List'],
    description:
      'Remove all nodes whose value equals the given target.',
    testCases: [
      { input: 'head = [1,2,6,3,4,5,6]\nval = 6', expected_output: '[1,2,3,4,5]', is_sample: true },
      { input: 'head = []\nval = 1', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'delete-node-in-a-linked-list',
    title: 'Delete Node in a Linked List',
    difficulty: 'easy',
    tags: ['Linked List'],
    description:
      'Delete a node from a linked list when only that node is provided.',
    testCases: [
      { input: 'head = [4,5,1,9]\nnode = 5', expected_output: '[4,1,9]', is_sample: true },
      { input: 'head = [4,5,1,9]\nnode = 1', expected_output: '[4,5,9]', is_sample: true },
    ],
  },
  {
    slug: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'easy',
    tags: ['Trees', 'DFS'],
    description:
      'Invert a binary tree and return its root.',
    testCases: [
      { input: 'root = [4,2,7,1,3,6,9]', expected_output: '[4,7,2,9,6,3,1]', is_sample: true },
      { input: 'root = [2,1,3]', expected_output: '[2,3,1]', is_sample: true },
    ],
  },
  {
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'easy',
    tags: ['Trees', 'DFS'],
    description:
      'Return the maximum depth of a binary tree.',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected_output: '3', is_sample: true },
      { input: 'root = [1,null,2]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'diameter-of-binary-tree',
    title: 'Diameter of Binary Tree',
    difficulty: 'easy',
    tags: ['Trees', 'DFS'],
    description:
      'Return the length of the diameter of the binary tree.',
    testCases: [
      { input: 'root = [1,2,3,4,5]', expected_output: '3', is_sample: true },
      { input: 'root = [1,2]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'balanced-binary-tree',
    title: 'Balanced Binary Tree',
    difficulty: 'easy',
    tags: ['Trees', 'DFS'],
    description:
      'Determine whether a binary tree is height-balanced.',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected_output: 'true', is_sample: true },
      { input: 'root = [1,2,2,3,3,null,null,4,4]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'same-tree',
    title: 'Same Tree',
    difficulty: 'easy',
    tags: ['Trees'],
    description:
      'Determine whether two binary trees are identical.',
    testCases: [
      { input: 'p = [1,2,3]\nq = [1,2,3]', expected_output: 'true', is_sample: true },
      { input: 'p = [1,2]\nq = [1,null,2]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'subtree-of-another-tree',
    title: 'Subtree of Another Tree',
    difficulty: 'easy',
    tags: ['Trees'],
    description:
      'Determine whether one tree is a subtree of another.',
    testCases: [
      { input: 'root = [3,4,5,1,2]\nsubRoot = [4,1,2]', expected_output: 'true', is_sample: true },
      { input: 'root = [3,4,5,1,2,null,null,null,null,0]\nsubRoot = [4,1,2]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'lowest-common-ancestor-of-a-bst',
    title: 'Lowest Common Ancestor of a BST',
    difficulty: 'medium',
    tags: ['Trees', 'BST'],
    description:
      'Return the lowest common ancestor of two nodes in a BST.',
    testCases: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 8', expected_output: '6', is_sample: true },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5]\np = 2\nq = 4', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    tags: ['Trees', 'BFS'],
    description:
      'Return the level-order traversal of a binary tree.',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected_output: '[[3],[9,20],[15,7]]', is_sample: true },
      { input: 'root = [1]', expected_output: '[[1]]', is_sample: true },
    ],
  },
  {
    slug: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    difficulty: 'medium',
    tags: ['Trees', 'BFS'],
    description:
      'Return the values visible when viewing the tree from the right side.',
    testCases: [
      { input: 'root = [1,2,3,null,5,null,4]', expected_output: '[1,3,4]', is_sample: true },
      { input: 'root = [1,null,3]', expected_output: '[1,3]', is_sample: true },
    ],
  },
  {
    slug: 'count-good-nodes-in-binary-tree',
    title: 'Count Good Nodes in Binary Tree',
    difficulty: 'medium',
    tags: ['Trees', 'DFS'],
    description:
      'Count nodes that are not smaller than any value on the path from root.',
    testCases: [
      { input: 'root = [3,1,4,3,null,1,5]', expected_output: '4', is_sample: true },
      { input: 'root = [3,3,null,4,2]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'medium',
    tags: ['Trees', 'BST'],
    description:
      'Determine whether a binary tree is a valid BST.',
    testCases: [
      { input: 'root = [2,1,3]', expected_output: 'true', is_sample: true },
      { input: 'root = [5,1,4,null,null,3,6]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'kth-smallest-element-in-a-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'medium',
    tags: ['Trees', 'BST'],
    description:
      'Return the kth smallest value in a BST.',
    testCases: [
      { input: 'root = [3,1,4,null,2]\nk = 1', expected_output: '1', is_sample: true },
      { input: 'root = [5,3,6,2,4,null,null,1]\nk = 3', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    difficulty: 'medium',
    tags: ['Trees'],
    description:
      'Construct a binary tree from preorder and inorder traversal arrays.',
    testCases: [
      { input: 'preorder = [3,9,20,15,7]\ninorder = [9,3,15,20,7]', expected_output: '[3,9,20,null,null,15,7]', is_sample: true },
      { input: 'preorder = [-1]\ninorder = [-1]', expected_output: '[-1]', is_sample: true },
    ],
  },
  {
    slug: 'path-sum',
    title: 'Path Sum',
    difficulty: 'easy',
    tags: ['Trees', 'DFS'],
    description:
      'Determine whether a root-to-leaf path equals the target sum.',
    testCases: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1]\ntargetSum = 22', expected_output: 'true', is_sample: true },
      { input: 'root = [1,2,3]\ntargetSum = 5', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'serialize-and-deserialize-binary-tree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'hard',
    tags: ['Trees', 'Design'],
    description:
      'Design algorithms to serialize and deserialize a binary tree.',
    testCases: [
      { input: 'root = [1,2,3,null,null,4,5]', expected_output: '[1,2,3,null,null,4,5]', is_sample: true },
      { input: 'root = []', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'hard',
    tags: ['Trees', 'DFS'],
    description:
      'Return the maximum path sum of any path in the binary tree.',
    testCases: [
      { input: 'root = [1,2,3]', expected_output: '6', is_sample: true },
      { input: 'root = [-10,9,20,null,null,15,7]', expected_output: '42', is_sample: true },
    ],
  },
  {
    slug: 'recover-binary-search-tree',
    title: 'Recover Binary Search Tree',
    difficulty: 'hard',
    tags: ['Trees', 'BST'],
    description:
      'Recover a BST where two nodes have been swapped by mistake.',
    testCases: [
      { input: 'root = [1,3,null,null,2]', expected_output: '[3,1,null,null,2]', is_sample: true },
      { input: 'root = [3,1,4,null,null,2]', expected_output: '[2,1,4,null,null,3]', is_sample: true },
    ],
  },
  {
    slug: 'flatten-binary-tree-to-linked-list',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'medium',
    tags: ['Trees'],
    description:
      'Flatten a binary tree into a linked list in preorder traversal order.',
    testCases: [
      { input: 'root = [1,2,5,3,4,null,6]', expected_output: '[1,null,2,null,3,null,4,null,5,null,6]', is_sample: true },
      { input: 'root = []', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'vertical-order-traversal',
    title: 'Vertical Order Traversal',
    difficulty: 'hard',
    tags: ['Trees', 'BFS'],
    description:
      'Return the vertical order traversal of a binary tree.',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected_output: '[[9],[3,15],[20],[7]]', is_sample: true },
      { input: 'root = [1,2,3,4,5,6,7]', expected_output: '[[4],[2],[1,5,6],[3],[7]]', is_sample: true },
    ],
  },
  {
    slug: 'house-robber-iii',
    title: 'House Robber III',
    difficulty: 'medium',
    tags: ['Trees', 'Dynamic Programming'],
    description:
      'Determine the maximum amount that can be robbed from a binary tree of houses.',
    testCases: [
      { input: 'root = [3,2,3,null,3,null,1]', expected_output: '7', is_sample: true },
      { input: 'root = [3,4,5,1,3,null,1]', expected_output: '9', is_sample: true },
    ],
  },

  // HEAP / PRIORITY QUEUE

  {
    slug: 'kth-largest-element-in-an-array',
    title: 'Kth Largest Element in an Array',
    difficulty: 'medium',
    tags: ['Heap', 'Array'],
    description:
      'Return the kth largest element in the array.',
    testCases: [
      { input: 'nums = [3,2,1,5,6,4]\nk = 2', expected_output: '5', is_sample: true },
      { input: 'nums = [3,2,3,1,2,4,5,5,6]\nk = 4', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'top-k-frequent-words',
    title: 'Top K Frequent Words',
    difficulty: 'medium',
    tags: ['Heap', 'Hash Table'],
    description:
      'Return the k most frequent words sorted by frequency and lexicographical order.',
    testCases: [
      { input: 'words = ["i","love","leetcode","i","love","coding"]\nk = 2', expected_output: '["i","love"]', is_sample: true },
      { input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"]\nk = 4', expected_output: '["the","is","sunny","day"]', is_sample: true },
    ],
  },
  {
    slug: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'hard',
    tags: ['Heap', 'Design'],
    description:
      'Design a structure that supports insertion and median retrieval.',
    testCases: [
      { input: 'operations = ["addNum","addNum","findMedian"]\nvalues = [[1],[2],[]]', expected_output: '1.5', is_sample: true },
      { input: 'operations = ["addNum","addNum","addNum","findMedian"]\nvalues = [[1],[2],[3],[]]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'task-scheduler',
    title: 'Task Scheduler',
    difficulty: 'medium',
    tags: ['Heap', 'Greedy'],
    description:
      'Return the minimum intervals required to finish all tasks with cooldown n.',
    testCases: [
      { input: 'tasks = ["A","A","A","B","B","B"]\nn = 2', expected_output: '8', is_sample: true },
      { input: 'tasks = ["A","A","A","B","B","B"]\nn = 0', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'smallest-range-covering-elements-from-k-lists',
    title: 'Smallest Range Covering Elements from K Lists',
    difficulty: 'hard',
    tags: ['Heap'],
    description:
      'Find the smallest range that includes at least one number from each list.',
    testCases: [
      { input: 'nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', expected_output: '[20,24]', is_sample: true },
      { input: 'nums = [[1,2,3],[1,2,3],[1,2,3]]', expected_output: '[1,1]', is_sample: true },
    ],
  },
  {
    slug: 'reorganize-string',
    title: 'Reorganize String',
    difficulty: 'medium',
    tags: ['Heap', 'String'],
    description:
      'Rearrange characters so that no two adjacent characters are the same.',
    testCases: [
      { input: 's = "aab"', expected_output: '"aba"', is_sample: true },
      { input: 's = "aaab"', expected_output: '""', is_sample: true },
    ],
  },
  {
    slug: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    difficulty: 'medium',
    tags: ['Heap', 'Intervals'],
    description:
      'Return the minimum number of meeting rooms required.',
    testCases: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', expected_output: '2', is_sample: true },
      { input: 'intervals = [[7,10],[2,4]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'easy',
    tags: ['Heap'],
    description:
      'Simulate smashing stones and return the weight of the final stone.',
    testCases: [
      { input: 'stones = [2,7,4,1,8,1]', expected_output: '1', is_sample: true },
      { input: 'stones = [1]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'ipo',
    title: 'IPO',
    difficulty: 'hard',
    tags: ['Heap', 'Greedy'],
    description:
      'Maximize capital after completing at most k projects.',
    testCases: [
      { input: 'k = 2\nw = 0\nprofits = [1,2,3]\ncapital = [0,1,1]', expected_output: '4', is_sample: true },
      { input: 'k = 3\nw = 0\nprofits = [1,2,3]\ncapital = [0,1,2]', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'sliding-window-median',
    title: 'Sliding Window Median',
    difficulty: 'hard',
    tags: ['Heap', 'Sliding Window'],
    description:
      'Return the median of every sliding window of size k.',
    testCases: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7]\nk = 3', expected_output: '[1,-1,-1,3,5,6]', is_sample: true },
      { input: 'nums = [1,2]\nk = 1', expected_output: '[1,2]', is_sample: true },
    ],
  },
  {
    slug: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'hard',
    tags: ['Trees', 'DFS'],
    description:
      'Return the maximum path sum of any path in the binary tree.',
    testCases: [
      { input: 'root = [1,2,3]', expected_output: '6', is_sample: true },
      { input: 'root = [-10,9,20,null,null,15,7]', expected_output: '42', is_sample: true },
    ],
  },
  {
    slug: 'recover-binary-search-tree',
    title: 'Recover Binary Search Tree',
    difficulty: 'hard',
    tags: ['Trees', 'BST'],
    description:
      'Recover a BST where two nodes have been swapped by mistake.',
    testCases: [
      { input: 'root = [1,3,null,null,2]', expected_output: '[3,1,null,null,2]', is_sample: true },
      { input: 'root = [3,1,4,null,null,2]', expected_output: '[2,1,4,null,null,3]', is_sample: true },
    ],
  },
  {
    slug: 'flatten-binary-tree-to-linked-list',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'medium',
    tags: ['Trees'],
    description:
      'Flatten a binary tree into a linked list in preorder traversal order.',
    testCases: [
      { input: 'root = [1,2,5,3,4,null,6]', expected_output: '[1,null,2,null,3,null,4,null,5,null,6]', is_sample: true },
      { input: 'root = []', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'vertical-order-traversal',
    title: 'Vertical Order Traversal',
    difficulty: 'hard',
    tags: ['Trees', 'BFS'],
    description:
      'Return the vertical order traversal of a binary tree.',
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected_output: '[[9],[3,15],[20],[7]]', is_sample: true },
      { input: 'root = [1,2,3,4,5,6,7]', expected_output: '[[4],[2],[1,5,6],[3],[7]]', is_sample: true },
    ],
  },
  {
    slug: 'house-robber-iii',
    title: 'House Robber III',
    difficulty: 'medium',
    tags: ['Trees', 'Dynamic Programming'],
    description:
      'Determine the maximum amount that can be robbed from a binary tree of houses.',
    testCases: [
      { input: 'root = [3,2,3,null,3,null,1]', expected_output: '7', is_sample: true },
      { input: 'root = [3,4,5,1,3,null,1]', expected_output: '9', is_sample: true },
    ],
  },

  // HEAP / PRIORITY QUEUE

  {
    slug: 'kth-largest-element-in-an-array',
    title: 'Kth Largest Element in an Array',
    difficulty: 'medium',
    tags: ['Heap', 'Array'],
    description:
      'Return the kth largest element in the array.',
    testCases: [
      { input: 'nums = [3,2,1,5,6,4]\nk = 2', expected_output: '5', is_sample: true },
      { input: 'nums = [3,2,3,1,2,4,5,5,6]\nk = 4', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'top-k-frequent-words',
    title: 'Top K Frequent Words',
    difficulty: 'medium',
    tags: ['Heap', 'Hash Table'],
    description:
      'Return the k most frequent words sorted by frequency and lexicographical order.',
    testCases: [
      { input: 'words = ["i","love","leetcode","i","love","coding"]\nk = 2', expected_output: '["i","love"]', is_sample: true },
      { input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"]\nk = 4', expected_output: '["the","is","sunny","day"]', is_sample: true },
    ],
  },
  {
    slug: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'hard',
    tags: ['Heap', 'Design'],
    description:
      'Design a structure that supports insertion and median retrieval.',
    testCases: [
      { input: 'operations = ["addNum","addNum","findMedian"]\nvalues = [[1],[2],[]]', expected_output: '1.5', is_sample: true },
      { input: 'operations = ["addNum","addNum","addNum","findMedian"]\nvalues = [[1],[2],[3],[]]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'task-scheduler',
    title: 'Task Scheduler',
    difficulty: 'medium',
    tags: ['Heap', 'Greedy'],
    description:
      'Return the minimum intervals required to finish all tasks with cooldown n.',
    testCases: [
      { input: 'tasks = ["A","A","A","B","B","B"]\nn = 2', expected_output: '8', is_sample: true },
      { input: 'tasks = ["A","A","A","B","B","B"]\nn = 0', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'smallest-range-covering-elements-from-k-lists',
    title: 'Smallest Range Covering Elements from K Lists',
    difficulty: 'hard',
    tags: ['Heap'],
    description:
      'Find the smallest range that includes at least one number from each list.',
    testCases: [
      { input: 'nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', expected_output: '[20,24]', is_sample: true },
      { input: 'nums = [[1,2,3],[1,2,3],[1,2,3]]', expected_output: '[1,1]', is_sample: true },
    ],
  },
  {
    slug: 'reorganize-string',
    title: 'Reorganize String',
    difficulty: 'medium',
    tags: ['Heap', 'String'],
    description:
      'Rearrange characters so that no two adjacent characters are the same.',
    testCases: [
      { input: 's = "aab"', expected_output: '"aba"', is_sample: true },
      { input: 's = "aaab"', expected_output: '""', is_sample: true },
    ],
  },
  {
    slug: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    difficulty: 'medium',
    tags: ['Heap', 'Intervals'],
    description:
      'Return the minimum number of meeting rooms required.',
    testCases: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', expected_output: '2', is_sample: true },
      { input: 'intervals = [[7,10],[2,4]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'easy',
    tags: ['Heap'],
    description:
      'Simulate smashing stones and return the weight of the final stone.',
    testCases: [
      { input: 'stones = [2,7,4,1,8,1]', expected_output: '1', is_sample: true },
      { input: 'stones = [1]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'ipo',
    title: 'IPO',
    difficulty: 'hard',
    tags: ['Heap', 'Greedy'],
    description:
      'Maximize capital after completing at most k projects.',
    testCases: [
      { input: 'k = 2\nw = 0\nprofits = [1,2,3]\ncapital = [0,1,1]', expected_output: '4', is_sample: true },
      { input: 'k = 3\nw = 0\nprofits = [1,2,3]\ncapital = [0,1,2]', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'sliding-window-median',
    title: 'Sliding Window Median',
    difficulty: 'hard',
    tags: ['Heap', 'Sliding Window'],
    description:
      'Return the median of every sliding window of size k.',
    testCases: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7]\nk = 3', expected_output: '[1,-1,-1,3,5,6]', is_sample: true },
      { input: 'nums = [1,2]\nk = 1', expected_output: '[1,2]', is_sample: true },
    ],
  },
  {
    slug: 'k-closest-points-to-origin',
    title: 'K Closest Points to Origin',
    difficulty: 'medium',
    tags: ['Heap', 'Geometry'],
    description:
      'Return the k points closest to the origin.',
    testCases: [
      { input: 'points = [[1,3],[-2,2]]\nk = 1', expected_output: '[[-2,2]]', is_sample: true },
      { input: 'points = [[3,3],[5,-1],[-2,4]]\nk = 2', expected_output: '[[3,3],[-2,4]]', is_sample: true },
    ],
  },
  {
    slug: 'furthest-building-you-can-reach',
    title: 'Furthest Building You Can Reach',
    difficulty: 'medium',
    tags: ['Heap', 'Greedy'],
    description:
      'Return the index of the furthest building reachable using the given bricks and ladders.',
    testCases: [
      { input: 'heights = [4,2,7,6,9,14,12]\nbricks = 5\nladders = 1', expected_output: '4', is_sample: true },
      { input: 'heights = [4,12,2,7,3,18,20,3,19]\nbricks = 10\nladders = 2', expected_output: '7', is_sample: true },
    ],
  },
  {
    slug: 'connect-ropes',
    title: 'Connect Ropes',
    difficulty: 'easy',
    tags: ['Heap'],
    description:
      'Connect all ropes with minimum total cost.',
    testCases: [
      { input: 'ropes = [1,3,11,5]', expected_output: '33', is_sample: true },
      { input: 'ropes = [3,4,5,6]', expected_output: '36', is_sample: true },
    ],
  },
  {
    slug: 'frequency-sort',
    title: 'Frequency Sort',
    difficulty: 'medium',
    tags: ['Heap', 'Hash Table'],
    description:
      'Sort numbers by increasing frequency and decreasing value when frequencies are equal.',
    testCases: [
      { input: 'nums = [1,1,2,2,2,3]', expected_output: '[3,1,1,2,2,2]', is_sample: true },
      { input: 'nums = [2,3,1,3,2]', expected_output: '[1,3,3,2,2]', is_sample: true },
    ],
  },
  {
    slug: 'find-k-pairs-with-smallest-sums',
    title: 'Find K Pairs with Smallest Sums',
    difficulty: 'medium',
    tags: ['Heap'],
    description:
      'Return the k pairs with the smallest sums from two sorted arrays.',
    testCases: [
      { input: 'nums1 = [1,7,11]\nnums2 = [2,4,6]\nk = 3', expected_output: '[[1,2],[1,4],[1,6]]', is_sample: true },
      { input: 'nums1 = [1,1,2]\nnums2 = [1,2,3]\nk = 2', expected_output: '[[1,1],[1,1]]', is_sample: true },
    ],
  },
  {
    slug: 'ugly-number-ii',
    title: 'Ugly Number II',
    difficulty: 'medium',
    tags: ['Heap', 'Dynamic Programming'],
    description:
      'Return the nth ugly number.',
    testCases: [
      { input: 'n = 10', expected_output: '12', is_sample: true },
      { input: 'n = 1', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'sort-characters-by-frequency',
    title: 'Sort Characters By Frequency',
    difficulty: 'medium',
    tags: ['Heap', 'String'],
    description:
      'Sort characters in descending order of frequency.',
    testCases: [
      { input: 's = "tree"', expected_output: '"eert"', is_sample: true },
      { input: 's = "cccaaa"', expected_output: '"cccaaa"', is_sample: true },
    ],
  },
  {
    slug: 'seat-reservation-manager',
    title: 'Seat Reservation Manager',
    difficulty: 'medium',
    tags: ['Heap', 'Design'],
    description:
      'Design a system that reserves and unreserves seats while always allocating the smallest available seat.',
    testCases: [
      { input: 'n = 5\noperations = ["reserve","reserve","unreserve","reserve"]', expected_output: '[1,2,2]', is_sample: true },
      { input: 'n = 2\noperations = ["reserve","reserve"]', expected_output: '[1,2]', is_sample: true },
    ],
  },
  {
    slug: 'minimum-cost-to-connect-sticks',
    title: 'Minimum Cost to Connect Sticks',
    difficulty: 'medium',
    tags: ['Heap'],
    description:
      'Return the minimum cost required to connect all sticks into one stick.',
    testCases: [
      { input: 'sticks = [2,4,3]', expected_output: '14', is_sample: true },
      { input: 'sticks = [1,8,3,5]', expected_output: '30', is_sample: true },
    ],
  },
  {
    slug: 'merge-k-sorted-arrays',
    title: 'Merge K Sorted Arrays',
    difficulty: 'medium',
    tags: ['Heap'],
    description:
      'Merge k sorted arrays into a single sorted array.',
    testCases: [
      { input: 'arrays = [[1,4,7],[2,5,8],[3,6,9]]', expected_output: '[1,2,3,4,5,6,7,8,9]', is_sample: true },
      { input: 'arrays = [[1],[0]]', expected_output: '[0,1]', is_sample: true },
    ],
  },
  {
    slug: 'subsets',
    title: 'Subsets',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Return all possible subsets of the given array.',
    testCases: [
      { input: 'nums = [1,2,3]', expected_output: '[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]', is_sample: true },
      { input: 'nums = [0]', expected_output: '[[],[0]]', is_sample: true },
    ],
  },
  {
    slug: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Return all unique combinations whose sum equals the target.',
    testCases: [
      { input: 'candidates = [2,3,6,7]\ntarget = 7', expected_output: '[[2,2,3],[7]]', is_sample: true },
      { input: 'candidates = [2,3,5]\ntarget = 8', expected_output: '[[2,2,2,2],[2,3,3],[3,5]]', is_sample: true },
    ],
  },
  {
    slug: 'permutations',
    title: 'Permutations',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Return all possible permutations of the array.',
    testCases: [
      { input: 'nums = [1,2,3]', expected_output: '6 permutations', is_sample: true },
      { input: 'nums = [0,1]', expected_output: '2 permutations', is_sample: true },
    ],
  },
  {
    slug: 'word-search',
    title: 'Word Search',
    difficulty: 'medium',
    tags: ['Backtracking', 'Matrix'],
    description:
      'Determine whether the given word exists in the board.',
    testCases: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nword = "ABCCED"', expected_output: 'true', is_sample: true },
      { input: 'board = [["A","B"],["C","D"]]\nword = "ABCD"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'palindrome-partitioning',
    title: 'Palindrome Partitioning',
    difficulty: 'medium',
    tags: ['Backtracking', 'String'],
    description:
      'Return all possible palindrome partitionings of a string.',
    testCases: [
      { input: 's = "aab"', expected_output: '[["a","a","b"],["aa","b"]]', is_sample: true },
      { input: 's = "a"', expected_output: '[["a"]]', is_sample: true },
    ],
  },
  {
    slug: 'letter-combinations-of-a-phone-number',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Return all possible letter combinations represented by the phone digits.',
    testCases: [
      { input: 'digits = "23"', expected_output: '9 combinations', is_sample: true },
      { input: 'digits = ""', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'n-queens',
    title: 'N-Queens',
    difficulty: 'hard',
    tags: ['Backtracking'],
    description:
      'Return all distinct ways to place n queens on an n×n board.',
    testCases: [
      { input: 'n = 4', expected_output: '2 solutions', is_sample: true },
      { input: 'n = 1', expected_output: '1 solution', is_sample: true },
    ],
  },
  {
    slug: 'sudoku-solver',
    title: 'Sudoku Solver',
    difficulty: 'hard',
    tags: ['Backtracking'],
    description:
      'Solve the Sudoku puzzle in-place.',
    testCases: [
      { input: 'board = valid sudoku board', expected_output: 'solved board', is_sample: true },
      { input: 'board = partially filled board', expected_output: 'solved board', is_sample: true },
    ],
  },
  {
    slug: 'restore-ip-addresses',
    title: 'Restore IP Addresses',
    difficulty: 'medium',
    tags: ['Backtracking', 'String'],
    description:
      'Return all valid IP addresses that can be formed from the string.',
    testCases: [
      { input: 's = "25525511135"', expected_output: '["255.255.11.135","255.255.111.35"]', is_sample: true },
      { input: 's = "0000"', expected_output: '["0.0.0.0"]', is_sample: true },
    ],
  },
  {
    slug: 'combination-sum-ii',
    title: 'Combination Sum II',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Return all unique combinations where each number may be used once.',
    testCases: [
      { input: 'candidates = [10,1,2,7,6,1,5]\ntarget = 8', expected_output: '[[1,1,6],[1,2,5],[1,7],[2,6]]', is_sample: true },
      { input: 'candidates = [2,5,2,1,2]\ntarget = 5', expected_output: '[[1,2,2],[5]]', is_sample: true },
    ],
  },
  {
    slug: 'subsets-ii',
    title: 'Subsets II',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Return all unique subsets when duplicates may exist.',
    testCases: [
      { input: 'nums = [1,2,2]', expected_output: '[[],[1],[2],[1,2],[2,2],[1,2,2]]', is_sample: true },
      { input: 'nums = [0]', expected_output: '[[],[0]]', is_sample: true },
    ],
  },
  {
    slug: 'permutations-ii',
    title: 'Permutations II',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Return all unique permutations of an array containing duplicates.',
    testCases: [
      { input: 'nums = [1,1,2]', expected_output: '3 permutations', is_sample: true },
      { input: 'nums = [1]', expected_output: '1 permutation', is_sample: true },
    ],
  },
  {
    slug: 'expression-add-operators',
    title: 'Expression Add Operators',
    difficulty: 'hard',
    tags: ['Backtracking'],
    description:
      'Insert operators between digits so the expression evaluates to the target.',
    testCases: [
      { input: 'num = "123"\ntarget = 6', expected_output: '["1+2+3","1*2*3"]', is_sample: true },
      { input: 'num = "232"\ntarget = 8', expected_output: '["2*3+2","2+3*2"]', is_sample: true },
    ],
  },
  {
    slug: 'word-break-ii',
    title: 'Word Break II',
    difficulty: 'hard',
    tags: ['Backtracking', 'Dynamic Programming'],
    description:
      'Return all valid sentences that can be formed using dictionary words.',
    testCases: [
      { input: 's = "catsanddog"\nwordDict = ["cat","cats","and","sand","dog"]', expected_output: '["cats and dog","cat sand dog"]', is_sample: true },
      { input: 's = "pineapplepenapple"', expected_output: 'valid sentences', is_sample: true },
    ],
  },
  {
    slug: 'beautiful-arrangement',
    title: 'Beautiful Arrangement',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Count the number of beautiful arrangements of numbers from 1 to n.',
    testCases: [
      { input: 'n = 2', expected_output: '2', is_sample: true },
      { input: 'n = 1', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'rat-in-a-maze',
    title: 'Rat in a Maze',
    difficulty: 'medium',
    tags: ['Backtracking', 'Matrix'],
    description:
      'Return all paths from the top-left corner to the bottom-right corner of the maze.',
    testCases: [
      { input: 'maze = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]', expected_output: '["DDRDRR","DRDDRR"]', is_sample: true },
      { input: 'maze = [[1,0],[0,1]]', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'm-coloring-problem',
    title: 'M-Coloring Problem',
    difficulty: 'medium',
    tags: ['Backtracking', 'Graph'],
    description:
      'Determine whether a graph can be colored using at most m colors so that no adjacent vertices share the same color.',
    testCases: [
      { input: 'graph = [[0,1,1],[1,0,1],[1,1,0]]\nm = 3', expected_output: 'true', is_sample: true },
      { input: 'graph = [[0,1,1],[1,0,1],[1,1,0]]\nm = 2', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'knight-tour',
    title: 'Knight Tour',
    difficulty: 'hard',
    tags: ['Backtracking', 'Matrix'],
    description:
      'Find a valid knight tour that visits every square exactly once.',
    testCases: [
      { input: 'n = 5', expected_output: 'valid tour exists', is_sample: true },
      { input: 'n = 1', expected_output: '[[0]]', is_sample: true },
    ],
  },
  {
    slug: 'unique-paths-iii',
    title: 'Unique Paths III',
    difficulty: 'hard',
    tags: ['Backtracking', 'Grid'],
    description:
      'Count all unique paths that visit every non-obstacle square exactly once.',
    testCases: [
      { input: 'grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]', expected_output: '2', is_sample: true },
      { input: 'grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'generate-parentheses-backtracking',
    title: 'Generate Parentheses',
    difficulty: 'medium',
    tags: ['Backtracking'],
    description:
      'Generate all valid combinations of n pairs of parentheses using backtracking.',
    testCases: [
      { input: 'n = 3', expected_output: '["((()))","(()())","(())()","()(())","()()()"]', is_sample: true },
      { input: 'n = 1', expected_output: '["()"]', is_sample: true },
    ],
  },

  // GRAPHS

  {
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'medium',
    tags: ['Graphs', 'DFS'],
    description:
      'Count the number of islands in a binary grid.',
    testCases: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected_output: '1', is_sample: true },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'medium',
    tags: ['Graphs'],
    description:
      'Create a deep copy of an undirected graph.',
    testCases: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', expected_output: 'cloned graph', is_sample: true },
      { input: 'adjList = [[]]', expected_output: 'cloned graph', is_sample: true },
    ],
  },
  {
    slug: 'max-area-of-island',
    title: 'Max Area of Island',
    difficulty: 'medium',
    tags: ['Graphs', 'DFS'],
    description:
      'Return the maximum area of any island in the grid.',
    testCases: [
      { input: 'grid = [[0,0,1,0],[1,1,1,0],[0,1,0,0]]', expected_output: '5', is_sample: true },
      { input: 'grid = [[0,0],[0,0]]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'pacific-atlantic-water-flow',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    tags: ['Graphs', 'DFS'],
    description:
      'Return all coordinates from which water can flow to both oceans.',
    testCases: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', expected_output: 'valid coordinates', is_sample: true },
      { input: 'heights = [[1]]', expected_output: '[[0,0]]', is_sample: true },
    ],
  },
  {
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'medium',
    tags: ['Graphs', 'Topological Sort'],
    description:
      'Determine whether all courses can be finished.',
    testCases: [
      { input: 'numCourses = 2\nprerequisites = [[1,0]]', expected_output: 'true', is_sample: true },
      { input: 'numCourses = 2\nprerequisites = [[1,0],[0,1]]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'course-schedule-ii',
    title: 'Course Schedule II',
    difficulty: 'medium',
    tags: ['Graphs', 'Topological Sort'],
    description:
      'Return a valid ordering of courses.',
    testCases: [
      { input: 'numCourses = 2\nprerequisites = [[1,0]]', expected_output: '[0,1]', is_sample: true },
      { input: 'numCourses = 4\nprerequisites = [[1,0],[2,0],[3,1],[3,2]]', expected_output: '[0,1,2,3]', is_sample: true },
    ],
  },
  {
    slug: 'graph-valid-tree',
    title: 'Graph Valid Tree',
    difficulty: 'medium',
    tags: ['Graphs', 'Union Find'],
    description:
      'Determine whether the graph forms a valid tree.',
    testCases: [
      { input: 'n = 5\nedges = [[0,1],[0,2],[0,3],[1,4]]', expected_output: 'true', is_sample: true },
      { input: 'n = 5\nedges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'redundant-connection',
    title: 'Redundant Connection',
    difficulty: 'medium',
    tags: ['Graphs', 'Union Find'],
    description:
      'Return the edge that can be removed so the graph becomes a tree.',
    testCases: [
      { input: 'edges = [[1,2],[1,3],[2,3]]', expected_output: '[2,3]', is_sample: true },
      { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', expected_output: '[1,4]', is_sample: true },
    ],
  },
  {
    slug: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'hard',
    tags: ['Graphs', 'BFS'],
    description:
      'Return the length of the shortest transformation sequence.',
    testCases: [
      { input: 'beginWord = "hit"\nendWord = "cog"\nwordList = ["hot","dot","dog","lot","log","cog"]', expected_output: '5', is_sample: true },
      { input: 'beginWord = "hit"\nendWord = "cog"\nwordList = ["hot","dot","dog","lot","log"]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'network-delay-time',
    title: 'Network Delay Time',
    difficulty: 'medium',
    tags: ['Graphs', 'Dijkstra'],
    description:
      'Return the time required for all nodes to receive the signal.',
    testCases: [
      { input: 'times = [[2,1,1],[2,3,1],[3,4,1]]\nn = 4\nk = 2', expected_output: '2', is_sample: true },
      { input: 'times = [[1,2,1]]\nn = 2\nk = 1', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'cheapest-flights-within-k-stops',
    title: 'Cheapest Flights Within K Stops',
    difficulty: 'medium',
    tags: ['Graphs', 'Shortest Path'],
    description:
      'Return the cheapest price from source to destination using at most k stops.',
    testCases: [
      { input: 'n = 4\nflights = [[0,1,100],[1,2,100],[2,3,100],[0,3,500]]\nsrc = 0\ndst = 3\nk = 1', expected_output: '500', is_sample: true },
      { input: 'n = 3\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nsrc = 0\ndst = 2\nk = 1', expected_output: '200', is_sample: true },
    ],
  },
  {
    slug: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'medium',
    tags: ['Graphs', 'BFS'],
    description:
      'Return the minimum minutes needed until no fresh orange remains.',
    testCases: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', expected_output: '4', is_sample: true },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'alien-dictionary',
    title: 'Alien Dictionary',
    difficulty: 'hard',
    tags: ['Graphs', 'Topological Sort'],
    description:
      'Determine a valid character ordering from a sorted alien dictionary.',
    testCases: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', expected_output: '"wertf"', is_sample: true },
      { input: 'words = ["z","x"]', expected_output: '"zx"', is_sample: true },
    ],
  },
  {
    slug: 'surrounded-regions',
    title: 'Surrounded Regions',
    difficulty: 'medium',
    tags: ['Graphs', 'DFS'],
    description:
      'Capture all regions surrounded by X.',
    testCases: [
      { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', expected_output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]', is_sample: true },
      { input: 'board = [["X"]]', expected_output: '[["X"]]', is_sample: true },
    ],
  },
  {
    slug: 'detect-cycle-in-directed-graph',
    title: 'Detect Cycle in Directed Graph',
    difficulty: 'medium',
    tags: ['Graphs', 'DFS'],
    description:
      'Determine whether a directed graph contains a cycle.',
    testCases: [
      { input: 'V = 4\nedges = [[0,1],[1,2],[2,3]]', expected_output: 'false', is_sample: true },
      { input: 'V = 3\nedges = [[0,1],[1,2],[2,0]]', expected_output: 'true', is_sample: true },
    ],
  },
  {
    slug: 'bipartite-graph',
    title: 'Bipartite Graph',
    difficulty: 'medium',
    tags: ['Graphs', 'BFS'],
    description:
      'Determine whether the graph is bipartite.',
    testCases: [
      { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', expected_output: 'true', is_sample: true },
      { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'dijkstra-algorithm',
    title: 'Dijkstra Algorithm',
    difficulty: 'medium',
    tags: ['Graphs', 'Shortest Path'],
    description:
      'Find the shortest distance from the source to all vertices in a weighted graph.',
    testCases: [
      { input: 'V = 3\nedges = [[0,1,4],[0,2,1],[2,1,2]]\nsrc = 0', expected_output: '[0,3,1]', is_sample: true },
      { input: 'V = 2\nedges = [[0,1,5]]\nsrc = 0', expected_output: '[0,5]', is_sample: true },
    ],
  },
  {
    slug: 'bellman-ford-algorithm',
    title: 'Bellman Ford Algorithm',
    difficulty: 'medium',
    tags: ['Graphs', 'Shortest Path'],
    description:
      'Compute shortest paths from a source vertex and detect negative cycles.',
    testCases: [
      { input: 'V = 5\nsrc = 0\nedges = [[0,1,6],[0,2,7],[1,3,5],[2,3,-3]]', expected_output: 'shortest distances', is_sample: true },
      { input: 'graph contains negative cycle', expected_output: 'negative cycle detected', is_sample: true },
    ],
  },
  {
    slug: 'floyd-warshall',
    title: 'Floyd Warshall',
    difficulty: 'medium',
    tags: ['Graphs', 'Shortest Path'],
    description:
      'Find all-pairs shortest paths in a weighted graph.',
    testCases: [
      { input: 'matrix = [[0,3,-1],[2,0,-1],[-1,7,0]]', expected_output: 'all-pairs shortest path matrix', is_sample: true },
      { input: 'matrix = [[0,5],[5,0]]', expected_output: '[[0,5],[5,0]]', is_sample: true },
    ],
  },
  {
    slug: 'kosaraju-algorithm',
    title: 'Kosaraju Algorithm',
    difficulty: 'hard',
    tags: ['Graphs', 'Strongly Connected Components'],
    description:
      'Find the number of strongly connected components in a directed graph.',
    testCases: [
      { input: 'V = 5\nedges = [[1,0],[0,2],[2,1],[0,3],[3,4]]', expected_output: '3', is_sample: true },
      { input: 'V = 3\nedges = [[0,1],[1,2]]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'easy',
    tags: ['Dynamic Programming'],
    description:
      'Return the number of distinct ways to reach the top of the staircase.',
    testCases: [
      { input: 'n = 2', expected_output: '2', is_sample: true },
      { input: 'n = 3', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Return the maximum amount of money that can be robbed without robbing adjacent houses.',
    testCases: [
      { input: 'nums = [1,2,3,1]', expected_output: '4', is_sample: true },
      { input: 'nums = [2,7,9,3,1]', expected_output: '12', is_sample: true },
    ],
  },
  {
    slug: 'house-robber-ii',
    title: 'House Robber II',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Return the maximum amount that can be robbed from houses arranged in a circle.',
    testCases: [
      { input: 'nums = [2,3,2]', expected_output: '3', is_sample: true },
      { input: 'nums = [1,2,3,1]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Return the minimum number of coins needed to make the target amount.',
    testCases: [
      { input: 'coins = [1,2,5]\namount = 11', expected_output: '3', is_sample: true },
      { input: 'coins = [2]\namount = 3', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Return the length of the longest strictly increasing subsequence.',
    testCases: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', expected_output: '4', is_sample: true },
      { input: 'nums = [0,1,0,3,2,3]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    difficulty: 'medium',
    tags: ['Dynamic Programming', 'Strings'],
    description:
      'Return the length of the longest common subsequence between two strings.',
    testCases: [
      { input: 'text1 = "abcde"\ntext2 = "ace"', expected_output: '3', is_sample: true },
      { input: 'text1 = "abc"\ntext2 = "abc"', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Determine whether the string can be segmented into dictionary words.',
    testCases: [
      { input: 's = "leetcode"\nwordDict = ["leet","code"]', expected_output: 'true', is_sample: true },
      { input: 's = "catsandog"\nwordDict = ["cats","dog","sand","and","cat"]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'combination-sum-iv',
    title: 'Combination Sum IV',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Return the number of possible ordered combinations that sum to target.',
    testCases: [
      { input: 'nums = [1,2,3]\ntarget = 4', expected_output: '7', is_sample: true },
      { input: 'nums = [9]\ntarget = 3', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'decode-ways',
    title: 'Decode Ways',
    difficulty: 'medium',
    tags: ['Dynamic Programming', 'Strings'],
    description:
      'Return the number of ways to decode the digit string.',
    testCases: [
      { input: 's = "12"', expected_output: '2', is_sample: true },
      { input: 's = "226"', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'medium',
    tags: ['Dynamic Programming', 'Grid'],
    description:
      'Return the number of unique paths from the top-left to bottom-right corner.',
    testCases: [
      { input: 'm = 3\nn = 7', expected_output: '28', is_sample: true },
      { input: 'm = 3\nn = 2', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'jump-game',
    title: 'Jump Game',
    difficulty: 'medium',
    tags: ['Dynamic Programming', 'Greedy'],
    description:
      'Determine whether the last index can be reached.',
    testCases: [
      { input: 'nums = [2,3,1,1,4]', expected_output: 'true', is_sample: true },
      { input: 'nums = [3,2,1,0,4]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'partition-equal-subset-sum',
    title: 'Partition Equal Subset Sum',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Determine whether the array can be partitioned into two equal-sum subsets.',
    testCases: [
      { input: 'nums = [1,5,11,5]', expected_output: 'true', is_sample: true },
      { input: 'nums = [1,2,3,5]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'hard',
    tags: ['Dynamic Programming', 'Strings'],
    description:
      'Return the minimum number of operations needed to convert one string into another.',
    testCases: [
      { input: 'word1 = "horse"\nword2 = "ros"', expected_output: '3', is_sample: true },
      { input: 'word1 = "intention"\nword2 = "execution"', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'burst-balloons',
    title: 'Burst Balloons',
    difficulty: 'hard',
    tags: ['Dynamic Programming'],
    description:
      'Return the maximum coins obtainable by bursting balloons optimally.',
    testCases: [
      { input: 'nums = [3,1,5,8]', expected_output: '167', is_sample: true },
      { input: 'nums = [1,5]', expected_output: '10', is_sample: true },
    ],
  },
  {
    slug: 'regular-expression-matching',
    title: 'Regular Expression Matching',
    difficulty: 'hard',
    tags: ['Dynamic Programming', 'Strings'],
    description:
      'Implement regex matching with support for "." and "*".',
    testCases: [
      { input: 's = "aa"\np = "a"', expected_output: 'false', is_sample: true },
      { input: 's = "aa"\np = "a*"', expected_output: 'true', is_sample: true },
    ],
  },
  {
    slug: 'distinct-subsequences',
    title: 'Distinct Subsequences',
    difficulty: 'hard',
    tags: ['Dynamic Programming', 'Strings'],
    description:
      'Return the number of distinct subsequences of s that equal t.',
    testCases: [
      { input: 's = "rabbbit"\nt = "rabbit"', expected_output: '3', is_sample: true },
      { input: 's = "babgbag"\nt = "bag"', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'best-time-to-buy-and-sell-stock-with-cooldown',
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Return the maximum profit with as many transactions as desired and a one-day cooldown after selling.',
    testCases: [
      { input: 'prices = [1,2,3,0,2]', expected_output: '3', is_sample: true },
      { input: 'prices = [1]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'target-sum',
    title: 'Target Sum',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Count the number of ways to assign + and - signs to reach the target value.',
    testCases: [
      { input: 'nums = [1,1,1,1,1]\ntarget = 3', expected_output: '5', is_sample: true },
      { input: 'nums = [1]\ntarget = 1', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: '0-1-knapsack',
    title: '0/1 Knapsack',
    difficulty: 'medium',
    tags: ['Dynamic Programming'],
    description:
      'Find the maximum value obtainable within the given knapsack capacity.',
    testCases: [
      { input: 'weights = [1,3,4,5]\nvalues = [1,4,5,7]\ncapacity = 7', expected_output: '9', is_sample: true },
      { input: 'weights = [2,3,4]\nvalues = [4,5,6]\ncapacity = 5', expected_output: '9', is_sample: true },
    ],
  },
  {
    slug: 'matrix-chain-multiplication',
    title: 'Matrix Chain Multiplication',
    difficulty: 'hard',
    tags: ['Dynamic Programming'],
    description:
      'Return the minimum number of scalar multiplications needed to multiply the chain of matrices.',
    testCases: [
      { input: 'arr = [40,20,30,10,30]', expected_output: '26000', is_sample: true },
      { input: 'arr = [10,20,30,40,30]', expected_output: '30000', is_sample: true },
    ],
  },

  // GREEDY

  {
    slug: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'medium',
    tags: ['Greedy'],
    description:
      'Return the minimum number of jumps needed to reach the last index.',
    testCases: [
      { input: 'nums = [2,3,1,1,4]', expected_output: '2', is_sample: true },
      { input: 'nums = [2,3,0,1,4]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'gas-station',
    title: 'Gas Station',
    difficulty: 'medium',
    tags: ['Greedy'],
    description:
      'Return the starting gas station index from which the circuit can be completed.',
    testCases: [
      { input: 'gas = [1,2,3,4,5]\ncost = [3,4,5,1,2]', expected_output: '3', is_sample: true },
      { input: 'gas = [2,3,4]\ncost = [3,4,3]', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'hand-of-straights',
    title: 'Hand of Straights',
    difficulty: 'medium',
    tags: ['Greedy'],
    description:
      'Determine whether the cards can be rearranged into groups of consecutive cards.',
    testCases: [
      { input: 'hand = [1,2,3,6,2,3,4,7,8]\ngroupSize = 3', expected_output: 'true', is_sample: true },
      { input: 'hand = [1,2,3,4,5]\ngroupSize = 4', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'merge-triplets-to-form-target-triplet',
    title: 'Merge Triplets to Form Target Triplet',
    difficulty: 'medium',
    tags: ['Greedy'],
    description:
      'Determine whether the target triplet can be formed by merging triplets.',
    testCases: [
      { input: 'triplets = [[2,5,3],[1,8,4],[1,7,5]]\ntarget = [2,7,5]', expected_output: 'true', is_sample: true },
      { input: 'triplets = [[3,4,5],[4,5,6]]\ntarget = [3,2,5]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'partition-labels',
    title: 'Partition Labels',
    difficulty: 'medium',
    tags: ['Greedy'],
    description:
      'Partition a string so that each letter appears in at most one part.',
    testCases: [
      { input: 's = "ababcbacadefegdehijhklij"', expected_output: '[9,7,8]', is_sample: true },
      { input: 's = "eccbbbbdec"', expected_output: '[10]', is_sample: true },
    ],
  },
  {
    slug: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'medium',
    tags: ['Greedy', 'Intervals'],
    description:
      'Return the minimum number of intervals to remove so that the rest do not overlap.',
    testCases: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', expected_output: '1', is_sample: true },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'medium',
    tags: ['Greedy', 'Intervals'],
    description:
      'Return the minimum number of arrows needed to burst all balloons.',
    testCases: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', expected_output: '2', is_sample: true },
      { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'candy',
    title: 'Candy',
    difficulty: 'hard',
    tags: ['Greedy'],
    description:
      'Distribute candies to children while satisfying rating constraints using the minimum candies.',
    testCases: [
      { input: 'ratings = [1,0,2]', expected_output: '5', is_sample: true },
      { input: 'ratings = [1,2,2]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'assign-cookies',
    title: 'Assign Cookies',
    difficulty: 'easy',
    tags: ['Greedy'],
    description:
      'Return the maximum number of children that can be satisfied.',
    testCases: [
      { input: 'g = [1,2,3]\ns = [1,1]', expected_output: '1', is_sample: true },
      { input: 'g = [1,2]\ns = [1,2,3]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'maximum-units-on-a-truck',
    title: 'Maximum Units on a Truck',
    difficulty: 'easy',
    tags: ['Greedy'],
    description:
      'Return the maximum units that can be loaded onto the truck.',
    testCases: [
      { input: 'boxTypes = [[1,3],[2,2],[3,1]]\ntruckSize = 4', expected_output: '8', is_sample: true },
      { input: 'boxTypes = [[5,10],[2,5],[4,7],[3,9]]\ntruckSize = 10', expected_output: '91', is_sample: true },
    ],
  },
  {
    slug: 'bag-of-tokens',
    title: 'Bag of Tokens',
    difficulty: 'medium',
    tags: ['Greedy', 'Two Pointers'],
    description:
      'Return the maximum score obtainable using the available tokens and power.',
    testCases: [
      { input: 'tokens = [100]\npower = 50', expected_output: '0', is_sample: true },
      { input: 'tokens = [100,200,300,400]\npower = 200', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'boats-to-save-people',
    title: 'Boats to Save People',
    difficulty: 'medium',
    tags: ['Greedy', 'Two Pointers'],
    description:
      'Return the minimum number of boats required to rescue everyone.',
    testCases: [
      { input: 'people = [1,2]\nlimit = 3', expected_output: '1', is_sample: true },
      { input: 'people = [3,2,2,1]\nlimit = 3', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'queue-reconstruction-by-height',
    title: 'Queue Reconstruction by Height',
    difficulty: 'medium',
    tags: ['Greedy'],
    description:
      'Reconstruct the queue based on height and position constraints.',
    testCases: [
      { input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]', expected_output: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]', is_sample: true },
      { input: 'people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]', expected_output: 'valid queue', is_sample: true },
    ],
  },
  {
    slug: 'lemonade-change',
    title: 'Lemonade Change',
    difficulty: 'easy',
    tags: ['Greedy'],
    description:
      'Determine whether correct change can be provided to every customer.',
    testCases: [
      { input: 'bills = [5,5,5,10,20]', expected_output: 'true', is_sample: true },
      { input: 'bills = [5,5,10,10,20]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'can-place-flowers',
    title: 'Can Place Flowers',
    difficulty: 'easy',
    tags: ['Greedy'],
    description:
      'Determine whether n new flowers can be planted without violating adjacency rules.',
    testCases: [
      { input: 'flowerbed = [1,0,0,0,1]\nn = 1', expected_output: 'true', is_sample: true },
      { input: 'flowerbed = [1,0,0,0,1]\nn = 2', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'monotone-increasing-digits',
    title: 'Monotone Increasing Digits',
    difficulty: 'medium',
    tags: ['Greedy', 'Math'],
    description:
      'Return the largest number less than or equal to n with digits in monotone increasing order.',
    testCases: [
      { input: 'n = 10', expected_output: '9', is_sample: true },
      { input: 'n = 332', expected_output: '299', is_sample: true },
    ],
  },
  {
    slug: 'advantage-shuffle',
    title: 'Advantage Shuffle',
    difficulty: 'medium',
    tags: ['Greedy', 'Sorting'],
    description:
      'Rearrange nums1 to maximize the number of positions where nums1[i] > nums2[i].',
    testCases: [
      { input: 'nums1 = [2,7,11,15]\nnums2 = [1,10,4,11]', expected_output: '[2,11,7,15]', is_sample: true },
      { input: 'nums1 = [12,24,8,32]\nnums2 = [13,25,32,11]', expected_output: 'valid arrangement', is_sample: true },
    ],
  },
  {
    slug: 'remove-covered-intervals',
    title: 'Remove Covered Intervals',
    difficulty: 'medium',
    tags: ['Greedy', 'Intervals'],
    description:
      'Return the number of intervals remaining after removing covered intervals.',
    testCases: [
      { input: 'intervals = [[1,4],[3,6],[2,8]]', expected_output: '2', is_sample: true },
      { input: 'intervals = [[1,4],[2,3]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'minimum-add-to-make-parentheses-valid',
    title: 'Minimum Add to Make Parentheses Valid',
    difficulty: 'medium',
    tags: ['Greedy', 'String'],
    description:
      'Return the minimum number of parentheses that must be added to make the string valid.',
    testCases: [
      { input: 's = "())"', expected_output: '1', is_sample: true },
      { input: 's = "((("', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'jump-game-greedy',
    title: 'Jump Game',
    difficulty: 'medium',
    tags: ['Greedy'],
    description:
      'Determine whether the last index can be reached using a greedy approach.',
    testCases: [
      { input: 'nums = [2,3,1,1,4]', expected_output: 'true', is_sample: true },
      { input: 'nums = [3,2,1,0,4]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'medium',
    tags: ['Intervals'],
    description:
      'Insert a new interval into a list of non-overlapping intervals and merge if necessary.',
    testCases: [
      { input: 'intervals = [[1,3],[6,9]]\nnewInterval = [2,5]', expected_output: '[[1,5],[6,9]]', is_sample: true },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]\nnewInterval = [4,8]', expected_output: '[[1,2],[3,10],[12,16]]', is_sample: true },
    ],
  },
  {
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'medium',
    tags: ['Intervals'],
    description:
      'Merge all overlapping intervals.',
    testCases: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expected_output: '[[1,6],[8,10],[15,18]]', is_sample: true },
      { input: 'intervals = [[1,4],[4,5]]', expected_output: '[[1,5]]', is_sample: true },
    ],
  },
  {
    slug: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'easy',
    tags: ['Intervals'],
    description:
      'Determine whether a person can attend all meetings.',
    testCases: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', expected_output: 'false', is_sample: true },
      { input: 'intervals = [[7,10],[12,15]]', expected_output: 'true', is_sample: true },
    ],
  },
  {
    slug: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    difficulty: 'medium',
    tags: ['Intervals', 'Heap'],
    description:
      'Return the minimum number of meeting rooms required.',
    testCases: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', expected_output: '2', is_sample: true },
      { input: 'intervals = [[7,10],[2,4]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'interval-list-intersections',
    title: 'Interval List Intersections',
    difficulty: 'medium',
    tags: ['Intervals', 'Two Pointers'],
    description:
      'Return the intersections between two interval lists.',
    testCases: [
      { input: 'firstList = [[0,2],[5,10],[13,23],[24,25]]\nsecondList = [[1,5],[8,12],[15,24],[25,26]]', expected_output: '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]', is_sample: true },
      { input: 'firstList = []\nsecondList = [[1,3]]', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'employee-free-time',
    title: 'Employee Free Time',
    difficulty: 'hard',
    tags: ['Intervals'],
    description:
      'Return the common free time intervals across all employees.',
    testCases: [
      { input: 'schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]', expected_output: '[[3,4]]', is_sample: true },
      { input: 'schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]', expected_output: '[[5,6],[7,9]]', is_sample: true },
    ],
  },
  {
    slug: 'my-calendar-i',
    title: 'My Calendar I',
    difficulty: 'medium',
    tags: ['Intervals', 'Design'],
    description:
      'Implement a calendar that supports booking non-overlapping events.',
    testCases: [
      { input: 'book(10,20), book(15,25), book(20,30)', expected_output: '[true,false,true]', is_sample: true },
      { input: 'book(5,10), book(10,15)', expected_output: '[true,true]', is_sample: true },
    ],
  },
  {
    slug: 'data-stream-as-disjoint-intervals',
    title: 'Data Stream as Disjoint Intervals',
    difficulty: 'hard',
    tags: ['Intervals', 'Design'],
    description:
      'Maintain a summary of disjoint intervals from a stream of numbers.',
    testCases: [
      { input: 'addNum(1), addNum(3), addNum(7), addNum(2), addNum(6)', expected_output: '[[1,3],[6,7]]', is_sample: true },
      { input: 'addNum(1), addNum(2)', expected_output: '[[1,2]]', is_sample: true },
    ],
  },
  {
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'medium',
    tags: ['Intervals', 'Greedy'],
    description:
      'Return the minimum number of arrows required to burst all balloons.',
    testCases: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', expected_output: '2', is_sample: true },
      { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'remove-covered-intervals',
    title: 'Remove Covered Intervals',
    difficulty: 'medium',
    tags: ['Intervals', 'Greedy'],
    description:
      'Return the number of intervals remaining after removing covered intervals.',
    testCases: [
      { input: 'intervals = [[1,4],[3,6],[2,8]]', expected_output: '2', is_sample: true },
      { input: 'intervals = [[1,4],[2,3]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'video-stitching',
    title: 'Video Stitching',
    difficulty: 'medium',
    tags: ['Intervals', 'Greedy'],
    description:
      'Return the minimum number of video clips needed to cover the target interval.',
    testCases: [
      { input: 'clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]]\ntime = 10', expected_output: '3', is_sample: true },
      { input: 'clips = [[0,1],[1,2]]\ntime = 5', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'teemo-attacking',
    title: 'Teemo Attacking',
    difficulty: 'easy',
    tags: ['Intervals'],
    description:
      'Return the total duration that the target remains poisoned.',
    testCases: [
      { input: 'timeSeries = [1,4]\nduration = 2', expected_output: '4', is_sample: true },
      { input: 'timeSeries = [1,2]\nduration = 2', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'summary-ranges',
    title: 'Summary Ranges',
    difficulty: 'easy',
    tags: ['Intervals'],
    description:
      'Summarize consecutive ranges in a sorted unique integer array.',
    testCases: [
      { input: 'nums = [0,1,2,4,5,7]', expected_output: '["0->2","4->5","7"]', is_sample: true },
      { input: 'nums = [0,2,3,4,6,8,9]', expected_output: '["0","2->4","6","8->9"]', is_sample: true },
    ],
  },
  {
    slug: 'partition-labels-intervals',
    title: 'Partition Labels',
    difficulty: 'medium',
    tags: ['Intervals', 'Greedy'],
    description:
      'Partition a string into as many parts as possible so each letter appears in at most one part.',
    testCases: [
      { input: 's = "ababcbacadefegdehijhklij"', expected_output: '[9,7,8]', is_sample: true },
      { input: 's = "eccbbbbdec"', expected_output: '[10]', is_sample: true },
    ],
  },
  {
    slug: 'range-module',
    title: 'Range Module',
    difficulty: 'hard',
    tags: ['Intervals', 'Design'],
    description:
      'Design a data structure that tracks and queries numeric ranges.',
    testCases: [
      { input: 'addRange(10,20), removeRange(14,16), queryRange(10,14)', expected_output: 'true', is_sample: true },
      { input: 'queryRange(13,15)', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'car-pooling',
    title: 'Car Pooling',
    difficulty: 'medium',
    tags: ['Intervals', 'Prefix Sum'],
    description:
      'Determine whether all trips can be completed without exceeding capacity.',
    testCases: [
      { input: 'trips = [[2,1,5],[3,3,7]]\ncapacity = 4', expected_output: 'false', is_sample: true },
      { input: 'trips = [[2,1,5],[3,3,7]]\ncapacity = 5', expected_output: 'true', is_sample: true },
    ],
  },
  {
    slug: 'erase-overlap-intervals',
    title: 'Erase Overlap Intervals',
    difficulty: 'medium',
    tags: ['Intervals', 'Greedy'],
    description:
      'Return the minimum number of intervals that must be removed to eliminate overlaps.',
    testCases: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', expected_output: '1', is_sample: true },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'attend-maximum-events',
    title: 'Attend Maximum Events',
    difficulty: 'medium',
    tags: ['Intervals', 'Heap'],
    description:
      'Return the maximum number of events that can be attended.',
    testCases: [
      { input: 'events = [[1,2],[2,3],[3,4]]', expected_output: '3', is_sample: true },
      { input: 'events = [[1,2],[2,3],[3,4],[1,2]]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'maximum-length-of-pair-chain',
    title: 'Maximum Length of Pair Chain',
    difficulty: 'medium',
    tags: ['Intervals', 'Greedy'],
    description:
      'Return the length of the longest chain that can be formed from pairs.',
    testCases: [
      { input: 'pairs = [[1,2],[2,3],[3,4]]', expected_output: '2', is_sample: true },
      { input: 'pairs = [[1,2],[7,8],[4,5]]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'merge-overlapping-ranges',
    title: 'Merge Overlapping Ranges',
    difficulty: 'easy',
    tags: ['Intervals'],
    description:
      'Given a list of ranges, merge all overlapping ranges and return the resulting intervals.',
    testCases: [
      { input: 'ranges = [[1,4],[2,5],[7,9]]', expected_output: '[[1,5],[7,9]]', is_sample: true },
      { input: 'ranges = [[1,3],[5,7]]', expected_output: '[[1,3],[5,7]]', is_sample: true },
    ],
  },
  {
    slug: 'implement-trie',
    title: 'Implement Trie',
    difficulty: 'medium',
    tags: ['Tries'],
    description:
      'Implement insert, search, and startsWith operations in a trie.',
    testCases: [
      { input: 'insert("apple"), search("apple"), startsWith("app")', expected_output: '[true,true]', is_sample: true },
      { input: 'search("app") before insert("app")', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'design-add-and-search-words-data-structure',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'medium',
    tags: ['Tries'],
    description:
      'Design a data structure supporting word insertion and wildcard searches.',
    testCases: [
      { input: 'addWord("bad"), addWord("dad"), search(".ad")', expected_output: 'true', is_sample: true },
      { input: 'search("b..")', expected_output: 'true', is_sample: true },
    ],
  },
  {
    slug: 'word-search-ii',
    title: 'Word Search II',
    difficulty: 'hard',
    tags: ['Tries', 'Backtracking'],
    description:
      'Find all dictionary words present in the board.',
    testCases: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\nwords = ["oath","pea","eat","rain"]', expected_output: '["eat","oath"]', is_sample: true },
      { input: 'board = [["a","b"],["c","d"]]\nwords = ["abcb"]', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'replace-words',
    title: 'Replace Words',
    difficulty: 'medium',
    tags: ['Tries', 'Strings'],
    description:
      'Replace words in a sentence with the shortest matching root from the dictionary.',
    testCases: [
      { input: 'dictionary = ["cat","bat","rat"]\nsentence = "the cattle was rattled by the battery"', expected_output: '"the cat was rat by the bat"', is_sample: true },
      { input: 'dictionary = ["a","b","c"]\nsentence = "aadsfasf absbs bbab cadsfafs"', expected_output: '"a a b c"', is_sample: true },
    ],
  },
  {
    slug: 'map-sum-pairs',
    title: 'Map Sum Pairs',
    difficulty: 'medium',
    tags: ['Tries'],
    description:
      'Implement a map supporting insertion and prefix sum queries.',
    testCases: [
      { input: 'insert("apple",3), sum("ap")', expected_output: '3', is_sample: true },
      { input: 'insert("app",2), sum("ap")', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'maximum-xor-of-two-numbers-in-an-array',
    title: 'Maximum XOR of Two Numbers in an Array',
    difficulty: 'medium',
    tags: ['Tries', 'Bit Manipulation'],
    description:
      'Return the maximum XOR obtainable from any two numbers.',
    testCases: [
      { input: 'nums = [3,10,5,25,2,8]', expected_output: '28', is_sample: true },
      { input: 'nums = [0]', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'concatenated-words',
    title: 'Concatenated Words',
    difficulty: 'hard',
    tags: ['Tries', 'Dynamic Programming'],
    description:
      'Find all words that can be formed by concatenating two or more dictionary words.',
    testCases: [
      { input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]', expected_output: '["catsdogcats","dogcatsdog","ratcatdogcat"]', is_sample: true },
      { input: 'words = ["cat","dog"]', expected_output: '[]', is_sample: true },
    ],
  },
  {
    slug: 'stream-of-characters',
    title: 'Stream of Characters',
    difficulty: 'hard',
    tags: ['Tries'],
    description:
      'Query whether the current stream suffix matches any inserted word.',
    testCases: [
      { input: 'words = ["cd","f","kl"]', expected_output: 'stream checker works', is_sample: true },
      { input: 'query sequence', expected_output: 'boolean outputs', is_sample: true },
    ],
  },
  {
    slug: 'longest-word-in-dictionary',
    title: 'Longest Word in Dictionary',
    difficulty: 'medium',
    tags: ['Tries'],
    description:
      'Return the longest word that can be built one character at a time.',
    testCases: [
      { input: 'words = ["w","wo","wor","worl","world"]', expected_output: '"world"', is_sample: true },
      { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', expected_output: '"apple"', is_sample: true },
    ],
  },
  {
    slug: 'palindrome-pairs',
    title: 'Palindrome Pairs',
    difficulty: 'hard',
    tags: ['Tries', 'Strings'],
    description:
      'Return all index pairs whose concatenation forms a palindrome.',
    testCases: [
      { input: 'words = ["abcd","dcba","lls","s","sssll"]', expected_output: '[[0,1],[1,0],[3,2],[2,4]]', is_sample: true },
      { input: 'words = ["bat","tab","cat"]', expected_output: '[[0,1],[1,0]]', is_sample: true },
    ],
  },
  {
    slug: 'phone-directory',
    title: 'Phone Directory',
    difficulty: 'medium',
    tags: ['Tries'],
    description:
      'Design a phone directory that returns contact suggestions for every typed prefix.',
    testCases: [
      { input: 'contacts = ["geeikistest","geeksforgeeks","geeksfortest"]\nquery = "geeips"', expected_output: 'suggestions for each prefix', is_sample: true },
      { input: 'contacts = ["alice","bob"]\nquery = "al"', expected_output: '["alice"]', is_sample: true },
    ],
  },
  {
    slug: 'auto-complete-system',
    title: 'Auto Complete System',
    difficulty: 'hard',
    tags: ['Tries', 'Design'],
    description:
      'Design an autocomplete system that returns the top matching sentences for a prefix.',
    testCases: [
      { input: 'sentences = ["i love you","island","ironman","i love leetcode"]', expected_output: 'top suggestions', is_sample: true },
      { input: 'input stream with # terminator', expected_output: 'updated suggestions', is_sample: true },
    ],
  },
  {
    slug: 'camelcase-matching',
    title: 'Camelcase Matching',
    difficulty: 'medium',
    tags: ['Tries', 'Strings'],
    description:
      'Determine whether each query matches the given camelcase pattern.',
    testCases: [
      { input: 'queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"]\npattern = "FB"', expected_output: '[true,false,true,true,false]', is_sample: true },
      { input: 'queries = ["FooBar"]\npattern = "FoBa"', expected_output: '[true]', is_sample: true },
    ],
  },
  {
    slug: 'prefix-and-suffix-search',
    title: 'Prefix and Suffix Search',
    difficulty: 'hard',
    tags: ['Tries'],
    description:
      'Return the largest index of a word matching the given prefix and suffix.',
    testCases: [
      { input: 'words = ["apple"]\nf("a","e")', expected_output: '0', is_sample: true },
      { input: 'words = ["apple","apply"]', expected_output: 'matching index', is_sample: true },
    ],
  },
  {
    slug: 'word-squares',
    title: 'Word Squares',
    difficulty: 'hard',
    tags: ['Tries', 'Backtracking'],
    description:
      'Return all possible word squares that can be formed from the given words.',
    testCases: [
      { input: 'words = ["area","lead","wall","lady","ball"]', expected_output: '2 word squares', is_sample: true },
      { input: 'words = ["abat","baba","atan","atal"]', expected_output: 'valid squares', is_sample: true },
    ],
  },
  {
    slug: 'search-suggestions-system',
    title: 'Search Suggestions System',
    difficulty: 'medium',
    tags: ['Tries'],
    description:
      'Return up to three lexicographically minimum product suggestions after each character typed.',
    testCases: [
      { input: 'products = ["mobile","mouse","moneypot","monitor","mousepad"]\nsearchWord = "mouse"', expected_output: 'suggestions per prefix', is_sample: true },
      { input: 'products = ["havana"]\nsearchWord = "havana"', expected_output: 'suggestions per prefix', is_sample: true },
    ],
  },
  {
    slug: 'count-distinct-substrings',
    title: 'Count Distinct Substrings',
    difficulty: 'medium',
    tags: ['Tries', 'Strings'],
    description:
      'Count the number of distinct substrings in a string.',
    testCases: [
      { input: 's = "ababa"', expected_output: '10', is_sample: true },
      { input: 's = "aaa"', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'implement-magic-dictionary',
    title: 'Implement Magic Dictionary',
    difficulty: 'medium',
    tags: ['Tries'],
    description:
      'Design a dictionary that supports searching with exactly one modified character.',
    testCases: [
      { input: 'buildDict(["hello","leetcode"]), search("hhllo")', expected_output: 'true', is_sample: true },
      { input: 'search("hello")', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'lexicographical-numbers',
    title: 'Lexicographical Numbers',
    difficulty: 'medium',
    tags: ['Tries', 'DFS'],
    description:
      'Return numbers from 1 to n in lexicographical order.',
    testCases: [
      { input: 'n = 13', expected_output: '[1,10,11,12,13,2,3,4,5,6,7,8,9]', is_sample: true },
      { input: 'n = 2', expected_output: '[1,2]', is_sample: true },
    ],
  },
  {
    slug: 'word-break-using-trie',
    title: 'Word Break Using Trie',
    difficulty: 'medium',
    tags: ['Tries', 'Dynamic Programming'],
    description:
      'Determine whether a string can be segmented into dictionary words using a trie.',
    testCases: [
      { input: 's = "leetcode"\ndictionary = ["leet","code"]', expected_output: 'true', is_sample: true },
      { input: 's = "catsandog"\ndictionary = ["cats","dog","sand","and","cat"]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'single-number',
    title: 'Single Number',
    difficulty: 'easy',
    tags: ['Bit Manipulation'],
    description:
      'Return the element that appears exactly once while every other element appears twice.',
    testCases: [
      { input: 'nums = [2,2,1]', expected_output: '1', is_sample: true },
      { input: 'nums = [4,1,2,1,2]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    difficulty: 'easy',
    tags: ['Bit Manipulation'],
    description:
      'Return the number of set bits in the binary representation of the integer.',
    testCases: [
      { input: 'n = 11', expected_output: '3', is_sample: true },
      { input: 'n = 128', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'counting-bits',
    title: 'Counting Bits',
    difficulty: 'easy',
    tags: ['Bit Manipulation', 'Dynamic Programming'],
    description:
      'Return an array where each element contains the number of set bits for that index.',
    testCases: [
      { input: 'n = 2', expected_output: '[0,1,1]', is_sample: true },
      { input: 'n = 5', expected_output: '[0,1,1,2,1,2]', is_sample: true },
    ],
  },
  {
    slug: 'reverse-bits',
    title: 'Reverse Bits',
    difficulty: 'easy',
    tags: ['Bit Manipulation'],
    description:
      'Reverse the bits of a 32-bit unsigned integer.',
    testCases: [
      { input: 'n = 43261596', expected_output: '964176192', is_sample: true },
      { input: 'n = 4294967293', expected_output: '3221225471', is_sample: true },
    ],
  },
  {
    slug: 'missing-number',
    title: 'Missing Number',
    difficulty: 'easy',
    tags: ['Bit Manipulation'],
    description:
      'Return the missing number from the range [0, n].',
    testCases: [
      { input: 'nums = [3,0,1]', expected_output: '2', is_sample: true },
      { input: 'nums = [0,1]', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'sum-of-two-integers',
    title: 'Sum of Two Integers',
    difficulty: 'medium',
    tags: ['Bit Manipulation'],
    description:
      'Calculate the sum of two integers without using + or - operators.',
    testCases: [
      { input: 'a = 1\nb = 2', expected_output: '3', is_sample: true },
      { input: 'a = 2\nb = 3', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'bitwise-and-of-numbers-range',
    title: 'Bitwise AND of Numbers Range',
    difficulty: 'medium',
    tags: ['Bit Manipulation'],
    description:
      'Return the bitwise AND of all numbers in the inclusive range.',
    testCases: [
      { input: 'left = 5\nright = 7', expected_output: '4', is_sample: true },
      { input: 'left = 0\nright = 0', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'power-of-two',
    title: 'Power of Two',
    difficulty: 'easy',
    tags: ['Bit Manipulation'],
    description:
      'Determine whether the integer is a power of two.',
    testCases: [
      { input: 'n = 16', expected_output: 'true', is_sample: true },
      { input: 'n = 3', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'power-of-four',
    title: 'Power of Four',
    difficulty: 'easy',
    tags: ['Bit Manipulation'],
    description:
      'Determine whether the integer is a power of four.',
    testCases: [
      { input: 'n = 16', expected_output: 'true', is_sample: true },
      { input: 'n = 5', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'subsets-bitmask',
    title: 'Subsets',
    difficulty: 'medium',
    tags: ['Bit Manipulation'],
    description:
      'Generate all subsets using bitmasking.',
    testCases: [
      { input: 'nums = [1,2,3]', expected_output: '8 subsets', is_sample: true },
      { input: 'nums = [0]', expected_output: '2 subsets', is_sample: true },
    ],
  },
  {
    slug: 'maximum-xor-of-two-numbers-in-an-array',
    title: 'Maximum XOR of Two Numbers in an Array',
    difficulty: 'medium',
    tags: ['Bit Manipulation', 'Tries'],
    description:
      'Return the maximum XOR value obtainable from any pair of numbers.',
    testCases: [
      { input: 'nums = [3,10,5,25,2,8]', expected_output: '28', is_sample: true },
      { input: 'nums = [14,70,53,83,49,91,36,80,92,51,66,70]', expected_output: '127', is_sample: true },
    ],
  },
  {
    slug: 'gray-code',
    title: 'Gray Code',
    difficulty: 'medium',
    tags: ['Bit Manipulation'],
    description:
      'Generate the Gray code sequence for n bits.',
    testCases: [
      { input: 'n = 2', expected_output: '[0,1,3,2]', is_sample: true },
      { input: 'n = 1', expected_output: '[0,1]', is_sample: true },
    ],
  },
  {
    slug: 'utf-8-validation',
    title: 'UTF-8 Validation',
    difficulty: 'medium',
    tags: ['Bit Manipulation'],
    description:
      'Determine whether the given byte sequence is valid UTF-8.',
    testCases: [
      { input: 'data = [197,130,1]', expected_output: 'true', is_sample: true },
      { input: 'data = [235,140,4]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'divide-two-integers',
    title: 'Divide Two Integers',
    difficulty: 'medium',
    tags: ['Bit Manipulation', 'Math'],
    description:
      'Divide two integers without using multiplication, division, or modulo operators.',
    testCases: [
      { input: 'dividend = 10\ndivisor = 3', expected_output: '3', is_sample: true },
      { input: 'dividend = 7\ndivisor = -3', expected_output: '-2', is_sample: true },
    ],
  },
  {
    slug: 'bitmask-dp',
    title: 'Bitmask DP',
    difficulty: 'hard',
    tags: ['Bit Manipulation', 'Dynamic Programming'],
    description:
      'Solve optimization problems using dynamic programming over subsets.',
    testCases: [
      { input: 'n = 4\nmask states over subsets', expected_output: 'optimal result', is_sample: true },
      { input: 'subset transition example', expected_output: 'correct DP value', is_sample: true },
    ],
  },
  {
    slug: 'xor-queries-of-a-subarray',
    title: 'XOR Queries of a Subarray',
    difficulty: 'medium',
    tags: ['Bit Manipulation', 'Prefix Sum'],
    description:
      'Answer XOR range queries efficiently.',
    testCases: [
      { input: 'arr = [1,3,4,8]\nqueries = [[0,1],[1,2],[0,3],[3,3]]', expected_output: '[2,7,14,8]', is_sample: true },
      { input: 'arr = [4,8,2,10]\nqueries = [[2,3],[1,3],[0,0],[0,3]]', expected_output: '[8,0,4,4]', is_sample: true },
    ],
  },
  {
    slug: 'count-triplets-that-can-form-two-arrays-of-equal-xor',
    title: 'Count Triplets That Can Form Two Arrays of Equal XOR',
    difficulty: 'medium',
    tags: ['Bit Manipulation'],
    description:
      'Count triplets satisfying equal XOR partition conditions.',
    testCases: [
      { input: 'arr = [2,3,1,6,7]', expected_output: '4', is_sample: true },
      { input: 'arr = [1,1,1,1,1]', expected_output: '10', is_sample: true },
    ],
  },
  {
    slug: 'minimum-flips-to-make-a-or-b-equal-to-c',
    title: 'Minimum Flips to Make a OR b Equal to c',
    difficulty: 'medium',
    tags: ['Bit Manipulation'],
    description:
      'Return the minimum number of bit flips required.',
    testCases: [
      { input: 'a = 2\nb = 6\nc = 5', expected_output: '3', is_sample: true },
      { input: 'a = 4\nb = 2\nc = 7', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'find-xor-sum-of-all-pairs-bitwise-and',
    title: 'Find XOR Sum of All Pairs Bitwise AND',
    difficulty: 'hard',
    tags: ['Bit Manipulation'],
    description:
      'Return the XOR sum of all pairwise bitwise AND values.',
    testCases: [
      { input: 'arr1 = [1,2,3]\narr2 = [6,5]', expected_output: '0', is_sample: true },
      { input: 'arr1 = [12]\narr2 = [4]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'decode-xored-array',
    title: 'Decode XORed Array',
    difficulty: 'easy',
    tags: ['Bit Manipulation'],
    description:
      'Recover the original array from its XOR-encoded representation.',
    testCases: [
      { input: 'encoded = [1,2,3]\nfirst = 1', expected_output: '[1,0,2,1]', is_sample: true },
      { input: 'encoded = [6,2,7,3]\nfirst = 4', expected_output: '[4,2,0,7,4]', is_sample: true },
    ],
  },
  {
    slug: 'minimum-spanning-tree',
    title: 'Minimum Spanning Tree',
    difficulty: 'medium',
    tags: ['Advanced Graphs'],
    description:
      'Find the minimum cost spanning tree of a connected weighted graph.',
    testCases: [
      { input: 'V = 4\nedges = [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]', expected_output: '19', is_sample: true },
      { input: 'V = 3\nedges = [[0,1,1],[1,2,2],[0,2,3]]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'disjoint-set-union',
    title: 'Disjoint Set Union',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'Union Find'],
    description:
      'Implement union-find with path compression and union by rank.',
    testCases: [
      { input: 'union(1,2), union(2,3), find(1)==find(3)', expected_output: 'true', is_sample: true },
      { input: 'union(1,2), find(1)==find(4)', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'accounts-merge',
    title: 'Accounts Merge',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'Union Find'],
    description:
      'Merge accounts that share common email addresses.',
    testCases: [
      { input: 'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"]]', expected_output: 'merged accounts', is_sample: true },
      { input: 'accounts = [["Alex","a@mail.com"],["Alex","b@mail.com"]]', expected_output: 'separate accounts', is_sample: true },
    ],
  },
  {
    slug: 'swim-in-rising-water',
    title: 'Swim in Rising Water',
    difficulty: 'hard',
    tags: ['Advanced Graphs', 'Dijkstra'],
    description:
      'Return the minimum time required to reach the bottom-right cell.',
    testCases: [
      { input: 'grid = [[0,2],[1,3]]', expected_output: '3', is_sample: true },
      { input: 'grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]', expected_output: '16', is_sample: true },
    ],
  },
  {
    slug: 'path-with-minimum-effort',
    title: 'Path With Minimum Effort',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'Dijkstra'],
    description:
      'Return the minimum effort required to travel from the top-left to bottom-right cell.',
    testCases: [
      { input: 'heights = [[1,2,2],[3,8,2],[5,3,5]]', expected_output: '2', is_sample: true },
      { input: 'heights = [[1,2,3],[3,8,4],[5,3,5]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'critical-connections-in-a-network',
    title: 'Critical Connections in a Network',
    difficulty: 'hard',
    tags: ['Advanced Graphs', 'Tarjan'],
    description:
      'Return all bridges in the network.',
    testCases: [
      { input: 'n = 4\nconnections = [[0,1],[1,2],[2,0],[1,3]]', expected_output: '[[1,3]]', is_sample: true },
      { input: 'n = 2\nconnections = [[0,1]]', expected_output: '[[0,1]]', is_sample: true },
    ],
  },
  {
    slug: 'strongly-connected-components',
    title: 'Strongly Connected Components',
    difficulty: 'hard',
    tags: ['Advanced Graphs'],
    description:
      'Find all strongly connected components in a directed graph.',
    testCases: [
      { input: 'V = 5\nedges = [[1,0],[0,2],[2,1],[0,3],[3,4]]', expected_output: '3 SCCs', is_sample: true },
      { input: 'V = 3\nedges = [[0,1],[1,2]]', expected_output: '3 SCCs', is_sample: true },
    ],
  },
  {
    slug: 'euler-path',
    title: 'Euler Path',
    difficulty: 'hard',
    tags: ['Advanced Graphs'],
    description:
      'Determine and construct an Euler path if one exists.',
    testCases: [
      { input: 'graph with exactly two odd degree vertices', expected_output: 'valid euler path', is_sample: true },
      { input: 'graph without euler path', expected_output: 'not possible', is_sample: true },
    ],
  },
  {
    slug: 'travelling-salesman-problem',
    title: 'Travelling Salesman Problem',
    difficulty: 'hard',
    tags: ['Advanced Graphs', 'Bitmask DP'],
    description:
      'Find the minimum cost tour that visits every city exactly once.',
    testCases: [
      { input: 'graph = [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]', expected_output: '80', is_sample: true },
      { input: '4-city complete graph', expected_output: 'minimum tour cost', is_sample: true },
    ],
  },
  {
    slug: 'minimum-cost-to-connect-all-points',
    title: 'Minimum Cost to Connect All Points',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'MST'],
    description:
      'Return the minimum cost required to connect all points.',
    testCases: [
      { input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]', expected_output: '20', is_sample: true },
      { input: 'points = [[3,12],[-2,5],[-4,1]]', expected_output: '18', is_sample: true },
    ],
  },
  {
    slug: 'shortest-path-in-binary-matrix',
    title: 'Shortest Path in Binary Matrix',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'BFS'],
    description:
      'Return the length of the shortest clear path from the top-left to the bottom-right cell.',
    testCases: [
      { input: 'grid = [[0,1],[1,0]]', expected_output: '2', is_sample: true },
      { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'a-star-search',
    title: 'A* Search',
    difficulty: 'hard',
    tags: ['Advanced Graphs', 'Pathfinding'],
    description:
      'Find the shortest path between two nodes using the A* search algorithm.',
    testCases: [
      { input: 'grid with heuristic distances', expected_output: 'optimal path length', is_sample: true },
      { input: 'blocked cells and target node', expected_output: 'shortest valid path', is_sample: true },
    ],
  },
  {
    slug: 'tarjan-algorithm',
    title: 'Tarjan Algorithm',
    difficulty: 'hard',
    tags: ['Advanced Graphs'],
    description:
      'Use Tarjan’s algorithm to identify articulation points or strongly connected components.',
    testCases: [
      { input: 'graph with articulation points', expected_output: 'critical vertices', is_sample: true },
      { input: 'directed graph SCC detection', expected_output: 'list of SCCs', is_sample: true },
    ],
  },
  {
    slug: 'union-find-applications',
    title: 'Union Find Applications',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'Union Find'],
    description:
      'Solve connectivity and grouping problems using the union-find data structure.',
    testCases: [
      { input: 'union operations over disjoint sets', expected_output: 'connected components count', is_sample: true },
      { input: 'dynamic connectivity queries', expected_output: 'correct connectivity answers', is_sample: true },
    ],
  },
  {
    slug: 'reconstruct-itinerary',
    title: 'Reconstruct Itinerary',
    difficulty: 'hard',
    tags: ['Advanced Graphs', 'Euler Path'],
    description:
      'Reconstruct the itinerary using all flight tickets exactly once in lexical order.',
    testCases: [
      { input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', expected_output: '["JFK","MUC","LHR","SFO","SJC"]', is_sample: true },
      { input: 'tickets = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]', expected_output: '["JFK","NRT","JFK","KUL"]', is_sample: true },
    ],
  },
  {
    slug: 'open-the-lock',
    title: 'Open the Lock',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'BFS'],
    description:
      'Return the minimum number of turns required to open the lock.',
    testCases: [
      { input: 'deadends = ["0201","0101","0102","1212","2002"]\ntarget = "0202"', expected_output: '6', is_sample: true },
      { input: 'deadends = ["8888"]\ntarget = "0009"', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'snakes-and-ladders',
    title: 'Snakes and Ladders',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'BFS'],
    description:
      'Return the minimum number of moves required to reach the final square.',
    testCases: [
      { input: 'board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]', expected_output: '4', is_sample: true },
      { input: 'board = [[-1,-1],[-1,3]]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'regions-cut-by-slashes',
    title: 'Regions Cut By Slashes',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'Union Find'],
    description:
      'Return the number of regions formed by slashes in the grid.',
    testCases: [
      { input: 'grid = [" /","/ "]', expected_output: '2', is_sample: true },
      { input: 'grid = [" /","  "]', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'find-eventual-safe-states',
    title: 'Find Eventual Safe States',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'Topological Sort'],
    description:
      'Return all nodes that are eventually safe.',
    testCases: [
      { input: 'graph = [[1,2],[2,3],[5],[0],[5],[],[]]', expected_output: '[2,4,5,6]', is_sample: true },
      { input: 'graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]', expected_output: '[4]', is_sample: true },
    ],
  },
  {
    slug: 'number-of-provinces',
    title: 'Number of Provinces',
    difficulty: 'medium',
    tags: ['Advanced Graphs', 'Union Find'],
    description:
      'Return the number of connected provinces in the adjacency matrix.',
    testCases: [
      { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', expected_output: '2', is_sample: true },
      { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'range-sum-query-mutable',
    title: 'Range Sum Query Mutable',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Design a data structure that supports point updates and range sum queries.',
    testCases: [
      { input: 'nums = [1,3,5]\nsumRange(0,2), update(1,2), sumRange(0,2)', expected_output: '[9,8]', is_sample: true },
      { input: 'nums = [7,2,7,2,0]', expected_output: 'correct query results', is_sample: true },
    ],
  },
  {
    slug: 'range-minimum-query',
    title: 'Range Minimum Query',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Answer minimum queries over arbitrary subarray ranges efficiently.',
    testCases: [
      { input: 'arr = [1,3,2,7,9,11]\nquery(1,4)', expected_output: '2', is_sample: true },
      { input: 'arr = [5,4,3,2,1]\nquery(0,4)', expected_output: '1', is_sample: true },
    ],
  },
  {
    slug: 'segment-tree-implementation',
    title: 'Segment Tree Implementation',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Implement a segment tree supporting updates and range queries.',
    testCases: [
      { input: 'build, update, query operations', expected_output: 'correct results', is_sample: true },
      { input: 'multiple point updates', expected_output: 'updated range answers', is_sample: true },
    ],
  },
  {
    slug: 'fenwick-tree-implementation',
    title: 'Fenwick Tree Implementation',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Implement a Binary Indexed Tree supporting prefix sums and updates.',
    testCases: [
      { input: 'add(1,5), add(3,2), sum(3)', expected_output: '7', is_sample: true },
      { input: 'prefix/range queries', expected_output: 'correct values', is_sample: true },
    ],
  },
  {
    slug: 'count-of-smaller-numbers-after-self',
    title: 'Count of Smaller Numbers After Self',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Return the number of smaller elements to the right of each element.',
    testCases: [
      { input: 'nums = [5,2,6,1]', expected_output: '[2,1,1,0]', is_sample: true },
      { input: 'nums = [-1]', expected_output: '[0]', is_sample: true },
    ],
  },
  {
    slug: 'reverse-pairs',
    title: 'Reverse Pairs',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Count important reverse pairs in the array.',
    testCases: [
      { input: 'nums = [1,3,2,3,1]', expected_output: '2', is_sample: true },
      { input: 'nums = [2,4,3,5,1]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'create-sorted-array-through-instructions',
    title: 'Create Sorted Array through Instructions',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Return the cost of building a sorted array according to insertion rules.',
    testCases: [
      { input: 'instructions = [1,5,6,2]', expected_output: '1', is_sample: true },
      { input: 'instructions = [1,2,3,6,5,4]', expected_output: '3', is_sample: true },
    ],
  },
  {
    slug: 'range-sum-query-2d',
    title: 'Range Sum Query 2D',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Support sum queries over submatrices with updates.',
    testCases: [
      { input: 'matrix query operations', expected_output: 'correct sums', is_sample: true },
      { input: 'multiple updates and queries', expected_output: 'correct values', is_sample: true },
    ],
  },
  {
    slug: 'my-calendar-iii',
    title: 'My Calendar III',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Return the maximum number of overlapping events after each booking.',
    testCases: [
      { input: 'book sequence of intervals', expected_output: 'running max overlap', is_sample: true },
      { input: 'overlapping events', expected_output: 'correct counts', is_sample: true },
    ],
  },
  {
    slug: 'lazy-propagation',
    title: 'Lazy Propagation',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Implement efficient range updates and range queries using lazy propagation.',
    testCases: [
      { input: 'range update + range sum query', expected_output: 'correct answer', is_sample: true },
      { input: 'multiple deferred updates', expected_output: 'correct result', is_sample: true },
    ],
  },
  {
    slug: 'dynamic-range-sum-queries',
    title: 'Dynamic Range Sum Queries',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Process point updates and range sum queries efficiently on a dynamic array.',
    testCases: [
      { input: 'update(2,5), query(1,4)', expected_output: 'correct sum', is_sample: true },
      { input: 'multiple updates and queries', expected_output: 'correct answers', is_sample: true },
    ],
  },
  {
    slug: 'kquery',
    title: 'KQUERY',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'For each query, count elements greater than k in the given range.',
    testCases: [
      { input: 'arr = [5,1,2,3,4]\nquery(1,5,2)', expected_output: '3', is_sample: true },
      { input: 'multiple offline queries', expected_output: 'correct counts', is_sample: true },
    ],
  },
  {
    slug: 'distinct-characters-queries',
    title: 'Distinct Characters Queries',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Support updates and queries for the number of distinct characters in substrings.',
    testCases: [
      { input: 's = "abcda"\nquery(1,5)', expected_output: '4', is_sample: true },
      { input: 'character update + query', expected_output: 'correct distinct count', is_sample: true },
    ],
  },
  {
    slug: 'horrible-queries',
    title: 'Horrible Queries',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Handle range increment updates and range sum queries efficiently.',
    testCases: [
      { input: 'range add + range sum operations', expected_output: 'correct sums', is_sample: true },
      { input: 'multiple lazy updates', expected_output: 'correct answer', is_sample: true },
    ],
  },
  {
    slug: 'maximum-sum-queries',
    title: 'Maximum Sum Queries',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Answer maximum sum queries subject to value constraints.',
    testCases: [
      { input: 'nums1 = [4,3,1,2]\nnums2 = [2,4,9,5]\nqueries = [[4,1],[1,3],[2,5]]', expected_output: '[6,10,7]', is_sample: true },
      { input: 'constraint-based queries', expected_output: 'correct results', is_sample: true },
    ],
  },
  {
    slug: '2d-binary-indexed-tree',
    title: '2D Binary Indexed Tree',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Implement a 2D Fenwick Tree supporting updates and submatrix sum queries.',
    testCases: [
      { input: 'matrix updates and rectangle queries', expected_output: 'correct sums', is_sample: true },
      { input: 'multiple point updates', expected_output: 'correct query values', is_sample: true },
    ],
  },
  {
    slug: 'range-frequency-queries',
    title: 'Range Frequency Queries',
    difficulty: 'medium',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Return the frequency of a value inside a given range.',
    testCases: [
      { input: 'arr = [12,33,4,56,22,2,34,33,22,12,34,56]\nquery(1,2,4)', expected_output: '1', is_sample: true },
      { input: 'query value occurrence count', expected_output: 'correct frequency', is_sample: true },
    ],
  },
  {
    slug: 'longest-increasing-subsequence-ii',
    title: 'Longest Increasing Subsequence II',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick', 'Dynamic Programming'],
    description:
      'Find the length of the longest increasing subsequence with bounded differences.',
    testCases: [
      { input: 'nums = [1,5,4,6,2,3,7]\nk = 2', expected_output: '5', is_sample: true },
      { input: 'nums = [4,2,1,4,3,4,5,8,15]\nk = 3', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'order-statistic-tree',
    title: 'Order Statistic Tree',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Support insertion, deletion, kth smallest, and rank queries efficiently.',
    testCases: [
      { input: 'insert values, kth(3)', expected_output: '3rd smallest element', is_sample: true },
      { input: 'rank(x)', expected_output: 'elements less than x', is_sample: true },
    ],
  },
  {
    slug: 'falling-squares',
    title: 'Falling Squares',
    difficulty: 'hard',
    tags: ['Segment Tree / Fenwick'],
    description:
      'Return the height of the tallest stack after each square falls.',
    testCases: [
      { input: 'positions = [[1,2],[2,3],[6,1]]', expected_output: '[2,5,5]', is_sample: true },
      { input: 'positions = [[100,100],[200,100]]', expected_output: '[100,100]', is_sample: true },
    ],
  },
  {
    slug: 'powx-n',
    title: 'Pow(x, n)',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Implement fast exponentiation and return x raised to the power n.',
    testCases: [
      { input: 'x = 2.0\nn = 10', expected_output: '1024.0', is_sample: true },
      { input: 'x = 2.1\nn = 3', expected_output: '9.261', is_sample: true },
    ],
  },
  {
    slug: 'happy-number',
    title: 'Happy Number',
    difficulty: 'easy',
    tags: ['Math & Number Theory'],
    description:
      'Determine whether a number is a happy number.',
    testCases: [
      { input: 'n = 19', expected_output: 'true', is_sample: true },
      { input: 'n = 2', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'plus-one',
    title: 'Plus One',
    difficulty: 'easy',
    tags: ['Math & Number Theory'],
    description:
      'Increment the large integer represented by the digit array by one.',
    testCases: [
      { input: 'digits = [1,2,3]', expected_output: '[1,2,4]', is_sample: true },
      { input: 'digits = [9,9,9]', expected_output: '[1,0,0,0]', is_sample: true },
    ],
  },
  {
    slug: 'factorial-trailing-zeroes',
    title: 'Factorial Trailing Zeroes',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Return the number of trailing zeroes in n factorial.',
    testCases: [
      { input: 'n = 3', expected_output: '0', is_sample: true },
      { input: 'n = 25', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'excel-sheet-column-number',
    title: 'Excel Sheet Column Number',
    difficulty: 'easy',
    tags: ['Math & Number Theory'],
    description:
      'Convert an Excel column title into its corresponding column number.',
    testCases: [
      { input: 'columnTitle = "A"', expected_output: '1', is_sample: true },
      { input: 'columnTitle = "ZY"', expected_output: '701', is_sample: true },
    ],
  },
  {
    slug: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'medium',
    tags: ['Math & Number Theory', 'Matrix'],
    description:
      'Rotate the n × n matrix 90 degrees clockwise in-place.',
    testCases: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', expected_output: '[[7,4,1],[8,5,2],[9,6,3]]', is_sample: true },
      { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', expected_output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]', is_sample: true },
    ],
  },
  {
    slug: 'multiply-strings',
    title: 'Multiply Strings',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Multiply two non-negative integers represented as strings.',
    testCases: [
      { input: 'num1 = "2"\nnum2 = "3"', expected_output: '"6"', is_sample: true },
      { input: 'num1 = "123"\nnum2 = "456"', expected_output: '"56088"', is_sample: true },
    ],
  },
  {
    slug: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'easy',
    tags: ['Math & Number Theory'],
    description:
      'Convert a Roman numeral to an integer.',
    testCases: [
      { input: 's = "III"', expected_output: '3', is_sample: true },
      { input: 's = "MCMXCIV"', expected_output: '1994', is_sample: true },
    ],
  },
  {
    slug: 'integer-to-roman',
    title: 'Integer to Roman',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Convert an integer to its Roman numeral representation.',
    testCases: [
      { input: 'num = 3', expected_output: '"III"', is_sample: true },
      { input: 'num = 1994', expected_output: '"MCMXCIV"', is_sample: true },
    ],
  },
  {
    slug: 'count-primes',
    title: 'Count Primes',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Return the number of prime numbers less than n.',
    testCases: [
      { input: 'n = 10', expected_output: '4', is_sample: true },
      { input: 'n = 0', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'sieve-of-eratosthenes',
    title: 'Sieve of Eratosthenes',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Generate all prime numbers up to n using the sieve method.',
    testCases: [
      { input: 'n = 10', expected_output: '[2,3,5,7]', is_sample: true },
      { input: 'n = 20', expected_output: '[2,3,5,7,11,13,17,19]', is_sample: true },
    ],
  },
  {
    slug: 'fast-exponentiation',
    title: 'Fast Exponentiation',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Compute a^b efficiently using binary exponentiation.',
    testCases: [
      { input: 'a = 2\nb = 10', expected_output: '1024', is_sample: true },
      { input: 'a = 3\nb = 5', expected_output: '243', is_sample: true },
    ],
  },
  {
    slug: 'modular-arithmetic',
    title: 'Modular Arithmetic',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Perform modular addition, subtraction, multiplication, and exponentiation operations.',
    testCases: [
      { input: '(7 + 8) mod 5', expected_output: '0', is_sample: true },
      { input: '(3 * 4) mod 5', expected_output: '2', is_sample: true },
    ],
  },
  {
    slug: 'euler-totient-function',
    title: 'Euler Totient Function',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Return the count of positive integers less than or equal to n that are coprime with n.',
    testCases: [
      { input: 'n = 9', expected_output: '6', is_sample: true },
      { input: 'n = 10', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'chinese-remainder-theorem',
    title: 'Chinese Remainder Theorem',
    difficulty: 'hard',
    tags: ['Math & Number Theory'],
    description:
      'Find the smallest number satisfying a system of modular congruences.',
    testCases: [
      { input: 'x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)', expected_output: '23', is_sample: true },
      { input: 'x ≡ 1 (mod 2), x ≡ 2 (mod 3)', expected_output: '5', is_sample: true },
    ],
  },
  {
    slug: 'gcd-queries',
    title: 'GCD Queries',
    difficulty: 'medium',
    tags: ['Math & Number Theory'],
    description:
      'Answer greatest common divisor queries efficiently over ranges.',
    testCases: [
      { input: 'arr = [2,4,6,8]\nquery(1,3)', expected_output: '2', is_sample: true },
      { input: 'arr = [12,18,24]\nquery(0,2)', expected_output: '6', is_sample: true },
    ],
  },
  {
    slug: 'prime-factorization',
    title: 'Prime Factorization',
    difficulty: 'easy',
    tags: ['Math & Number Theory'],
    description:
      'Return the prime factorization of a positive integer.',
    testCases: [
      { input: 'n = 60', expected_output: '[2,2,3,5]', is_sample: true },
      { input: 'n = 97', expected_output: '[97]', is_sample: true },
    ],
  },
  {
    slug: 'catalan-numbers',
    title: 'Catalan Numbers',
    difficulty: 'medium',
    tags: ['Math & Number Theory', 'Dynamic Programming'],
    description:
      'Compute the nth Catalan number.',
    testCases: [
      { input: 'n = 3', expected_output: '5', is_sample: true },
      { input: 'n = 4', expected_output: '14', is_sample: true },
    ],
  },
  {
    slug: 'combinatorics-basics',
    title: 'Combinatorics Basics',
    difficulty: 'easy',
    tags: ['Math & Number Theory'],
    description:
      'Compute combinations and permutations using standard counting principles.',
    testCases: [
      { input: 'n = 5, r = 2\nnCr', expected_output: '10', is_sample: true },
      { input: 'n = 5, r = 2\nnPr', expected_output: '20', is_sample: true },
    ],
  },
  {
    slug: 'matrix-exponentiation',
    title: 'Matrix Exponentiation',
    difficulty: 'hard',
    tags: ['Math & Number Theory'],
    description:
      'Raise a matrix to a power efficiently using binary exponentiation.',
    testCases: [
      { input: 'Fibonacci matrix, n = 10', expected_output: '55', is_sample: true },
      { input: '2x2 matrix power query', expected_output: 'correct matrix result', is_sample: true },
    ],
  },
  {
    slug: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    tags: ['Strings'],
    description:
      'Return the longest palindromic substring in the given string.',
    testCases: [
      { input: 's = "babad"', expected_output: '"bab"', is_sample: true },
      { input: 's = "cbbd"', expected_output: '"bb"', is_sample: true },
    ],
  },
  {
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'easy',
    tags: ['Strings'],
    description:
      'Determine whether two strings are anagrams of each other.',
    testCases: [
      { input: 's = "anagram"\nt = "nagaram"', expected_output: 'true', is_sample: true },
      { input: 's = "rat"\nt = "car"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'medium',
    tags: ['Strings'],
    description:
      'Group words that are anagrams into separate lists.',
    testCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', is_sample: true },
      { input: 'strs = [""]', expected_output: '[[""]]', is_sample: true },
    ],
  },
  {
    slug: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'easy',
    tags: ['Strings'],
    description:
      'Return the longest common prefix shared by all strings.',
    testCases: [
      { input: 'strs = ["flower","flow","flight"]', expected_output: '"fl"', is_sample: true },
      { input: 'strs = ["dog","racecar","car"]', expected_output: '""', is_sample: true },
    ],
  },
  {
    slug: 'zigzag-conversion',
    title: 'Zigzag Conversion',
    difficulty: 'medium',
    tags: ['Strings'],
    description:
      'Convert a string into zigzag format and read line by line.',
    testCases: [
      { input: 's = "PAYPALISHIRING"\nnumRows = 3', expected_output: '"PAHNAPLSIIGYIR"', is_sample: true },
      { input: 's = "PAYPALISHIRING"\nnumRows = 4', expected_output: '"PINALSIGYAHRPI"', is_sample: true },
    ],
  },
  {
    slug: 'string-to-integer-atoi',
    title: 'String to Integer (atoi)',
    difficulty: 'medium',
    tags: ['Strings'],
    description:
      'Implement the atoi function according to specified parsing rules.',
    testCases: [
      { input: 's = "42"', expected_output: '42', is_sample: true },
      { input: 's = "   -42"', expected_output: '-42', is_sample: true },
    ],
  },
  {
    slug: 'implement-strstr',
    title: 'Implement strStr()',
    difficulty: 'easy',
    tags: ['Strings'],
    description:
      'Return the index of the first occurrence of a substring.',
    testCases: [
      { input: 'haystack = "sadbutsad"\nneedle = "sad"', expected_output: '0', is_sample: true },
      { input: 'haystack = "leetcode"\nneedle = "leeto"', expected_output: '-1', is_sample: true },
    ],
  },
  {
    slug: 'kmp-algorithm',
    title: 'KMP Algorithm',
    difficulty: 'medium',
    tags: ['Strings'],
    description:
      'Perform efficient pattern matching using the KMP algorithm.',
    testCases: [
      { input: 'text = "ababcabcabababd"\npattern = "ababd"', expected_output: '10', is_sample: true },
      { input: 'pattern search example', expected_output: 'first occurrence index', is_sample: true },
    ],
  },
  {
    slug: 'rabin-karp',
    title: 'Rabin-Karp',
    difficulty: 'medium',
    tags: ['Strings'],
    description:
      'Perform string pattern matching using rolling hash.',
    testCases: [
      { input: 'text = "geeksforgeeks"\npattern = "geeks"', expected_output: '[0,8]', is_sample: true },
      { input: 'text = "aaaaa"\npattern = "aa"', expected_output: '[0,1,2,3]', is_sample: true },
    ],
  },
  {
    slug: 'z-algorithm',
    title: 'Z Algorithm',
    difficulty: 'medium',
    tags: ['Strings'],
    description:
      'Use the Z-array to efficiently find pattern occurrences.',
    testCases: [
      { input: 'text = "aabxaabxcaabxaabxay"\npattern = "aabx"', expected_output: 'pattern matches found', is_sample: true },
      { input: 'compute Z array', expected_output: 'correct Z values', is_sample: true },
    ],
  },
  {
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'hard',
    tags: ['Strings', 'Sliding Window'],
    description:
      'Return the smallest substring of s containing all characters of t.',
    testCases: [
      { input: 's = "ADOBECODEBANC"\nt = "ABC"', expected_output: '"BANC"', is_sample: true },
      { input: 's = "a"\nt = "a"', expected_output: '"a"', is_sample: true },
    ],
  },
  {
    slug: 'text-justification',
    title: 'Text Justification',
    difficulty: 'hard',
    tags: ['Strings'],
    description:
      'Format text so that each line has exactly the required width and is fully justified.',
    testCases: [
      { input: 'words = ["This","is","an","example","of","text","justification."]\nmaxWidth = 16', expected_output: 'fully justified lines', is_sample: true },
      { input: 'words = ["What","must","be","acknowledgment","shall","be"]', expected_output: 'formatted text', is_sample: true },
    ],
  },
  {
    slug: 'interleaving-string',
    title: 'Interleaving String',
    difficulty: 'medium',
    tags: ['Strings', 'Dynamic Programming'],
    description:
      'Determine whether s3 is formed by interleaving s1 and s2.',
    testCases: [
      { input: 's1 = "aabcc"\ns2 = "dbbca"\ns3 = "aadbbcbcac"', expected_output: 'true', is_sample: true },
      { input: 's1 = "aabcc"\ns2 = "dbbca"\ns3 = "aadbbbaccc"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'scramble-string',
    title: 'Scramble String',
    difficulty: 'hard',
    tags: ['Strings', 'Dynamic Programming'],
    description:
      'Determine whether one string is a scrambled form of another.',
    testCases: [
      { input: 's1 = "great"\ns2 = "rgeat"', expected_output: 'true', is_sample: true },
      { input: 's1 = "abcde"\ns2 = "caebd"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'palindrome-partitioning',
    title: 'Palindrome Partitioning',
    difficulty: 'medium',
    tags: ['Strings', 'Backtracking'],
    description:
      'Return all possible palindrome partitionings of a string.',
    testCases: [
      { input: 's = "aab"', expected_output: '[["a","a","b"],["aa","b"]]', is_sample: true },
      { input: 's = "a"', expected_output: '[["a"]]', is_sample: true },
    ],
  },
  {
    slug: 'repeated-substring-pattern',
    title: 'Repeated Substring Pattern',
    difficulty: 'easy',
    tags: ['Strings'],
    description:
      'Determine whether the string can be formed by repeating a substring.',
    testCases: [
      { input: 's = "abab"', expected_output: 'true', is_sample: true },
      { input: 's = "aba"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'longest-happy-prefix',
    title: 'Longest Happy Prefix',
    difficulty: 'hard',
    tags: ['Strings', 'KMP'],
    description:
      'Return the longest prefix that is also a suffix, excluding the whole string.',
    testCases: [
      { input: 's = "level"', expected_output: '"l"', is_sample: true },
      { input: 's = "ababab"', expected_output: '"abab"', is_sample: true },
    ],
  },
  {
    slug: 'shortest-palindrome',
    title: 'Shortest Palindrome',
    difficulty: 'hard',
    tags: ['Strings'],
    description:
      'Add characters in front of a string to form the shortest palindrome.',
    testCases: [
      { input: 's = "aacecaaa"', expected_output: '"aaacecaaa"', is_sample: true },
      { input: 's = "abcd"', expected_output: '"dcbabcd"', is_sample: true },
    ],
  },
  {
    slug: 'buddy-strings',
    title: 'Buddy Strings',
    difficulty: 'easy',
    tags: ['Strings'],
    description:
      'Determine whether two strings can become equal by swapping exactly one pair of characters.',
    testCases: [
      { input: 's = "ab"\ngoal = "ba"', expected_output: 'true', is_sample: true },
      { input: 's = "ab"\ngoal = "ab"', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'orderly-queue',
    title: 'Orderly Queue',
    difficulty: 'hard',
    tags: ['Strings'],
    description:
      'Return the lexicographically smallest string after allowed operations.',
    testCases: [
      { input: 's = "cba"\nk = 1', expected_output: '"acb"', is_sample: true },
      { input: 's = "baaca"\nk = 3', expected_output: '"aaabc"', is_sample: true },
    ],
  },
  {
    slug: 'design-twitter',
    title: 'Design Twitter',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Design a simplified Twitter system supporting tweets, follows, unfollows, and news feeds.',
    testCases: [
      { input: 'postTweet, follow, getNewsFeed', expected_output: 'recent tweets returned', is_sample: true },
      { input: 'follow/unfollow operations', expected_output: 'correct feed', is_sample: true },
    ],
  },
  {
    slug: 'design-hit-counter',
    title: 'Design Hit Counter',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Count the number of hits received in the past 5 minutes.',
    testCases: [
      { input: 'hit(1), hit(2), hit(3), getHits(4)', expected_output: '3', is_sample: true },
      { input: 'hit(300), getHits(300)', expected_output: '4', is_sample: true },
    ],
  },
  {
    slug: 'insert-delete-getrandom-o1',
    title: 'Insert Delete GetRandom O(1)',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Design a data structure supporting insert, delete, and random retrieval in O(1).',
    testCases: [
      { input: 'insert(1), remove(2), insert(2)', expected_output: 'valid operations', is_sample: true },
      { input: 'getRandom()', expected_output: 'random existing value', is_sample: true },
    ],
  },
  {
    slug: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Design a Least Recently Used cache with O(1) operations.',
    testCases: [
      { input: 'capacity=2\nput/get operations', expected_output: 'correct cache behavior', is_sample: true },
      { input: 'eviction scenario', expected_output: 'least recently used removed', is_sample: true },
    ],
  },
  {
    slug: 'lfu-cache',
    title: 'LFU Cache',
    difficulty: 'hard',
    tags: ['System Design Style Coding'],
    description:
      'Design a Least Frequently Used cache with O(1) average operations.',
    testCases: [
      { input: 'capacity=2\nput/get operations', expected_output: 'correct LFU behavior', is_sample: true },
      { input: 'frequency tie-breaking', expected_output: 'LRU among LFU removed', is_sample: true },
    ],
  },
  {
    slug: 'design-underground-system',
    title: 'Design Underground System',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Track passenger travel times and compute average route durations.',
    testCases: [
      { input: 'checkIn/checkOut operations', expected_output: 'correct average time', is_sample: true },
      { input: 'multiple trips on same route', expected_output: 'updated average', is_sample: true },
    ],
  },
  {
    slug: 'time-based-key-value-store',
    title: 'Time Based Key-Value Store',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Store values with timestamps and retrieve the latest value at a given time.',
    testCases: [
      { input: 'set/get operations with timestamps', expected_output: 'correct value', is_sample: true },
      { input: 'multiple updates', expected_output: 'latest valid value', is_sample: true },
    ],
  },
  {
    slug: 'design-circular-queue',
    title: 'Design Circular Queue',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Implement a circular queue with fixed capacity.',
    testCases: [
      { input: 'enqueue/dequeue sequence', expected_output: 'correct queue state', is_sample: true },
      { input: 'full and empty checks', expected_output: 'correct boolean results', is_sample: true },
    ],
  },
  {
    slug: 'design-authentication-manager',
    title: 'Design Authentication Manager',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Manage authentication tokens with expiration times.',
    testCases: [
      { input: 'generate, renew, countUnexpiredTokens', expected_output: 'correct token count', is_sample: true },
      { input: 'expired token renewal', expected_output: 'ignored renewal', is_sample: true },
    ],
  },
  {
    slug: 'tinyurl-encoder',
    title: 'TinyURL Encoder',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Encode and decode URLs using a TinyURL-style service.',
    testCases: [
      { input: 'encode(longUrl)', expected_output: 'short URL', is_sample: true },
      { input: 'decode(shortUrl)', expected_output: 'original URL', is_sample: true },
    ],
  },
  {
    slug: 'food-ratings-system',
    title: 'Food Ratings System',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Design a system that supports rating updates and queries for the highest-rated food in a cuisine.',
    testCases: [
      { input: 'initialize foods, cuisines, ratings', expected_output: 'system created', is_sample: true },
      { input: 'changeRating + highestRated', expected_output: 'correct food name', is_sample: true },
    ],
  },
  {
    slug: 'movie-renting-system',
    title: 'Movie Renting System',
    difficulty: 'hard',
    tags: ['System Design Style Coding'],
    description:
      'Design a movie renting platform supporting search, rent, drop, and report operations.',
    testCases: [
      { input: 'search(movie)', expected_output: 'available shops', is_sample: true },
      { input: 'rent/drop/report sequence', expected_output: 'correct state', is_sample: true },
    ],
  },
  {
    slug: 'snapshot-array',
    title: 'Snapshot Array',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Implement an array that supports snapshots and historical value retrieval.',
    testCases: [
      { input: 'set(0,5), snap(), get(0,snapId)', expected_output: '5', is_sample: true },
      { input: 'multiple snapshots', expected_output: 'correct historical value', is_sample: true },
    ],
  },
  {
    slug: 'all-oone-data-structure',
    title: 'All O`one Data Structure',
    difficulty: 'hard',
    tags: ['System Design Style Coding'],
    description:
      'Design a data structure supporting O(1) increment, decrement, min-key, and max-key operations.',
    testCases: [
      { input: 'inc("hello"), inc("hello")', expected_output: 'count updated', is_sample: true },
      { input: 'getMaxKey(), getMinKey()', expected_output: 'correct keys', is_sample: true },
    ],
  },
  {
    slug: 'random-pick-with-weight',
    title: 'Random Pick with Weight',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Randomly pick an index according to the given weight distribution.',
    testCases: [
      { input: 'w = [1]', expected_output: '0', is_sample: true },
      { input: 'w = [1,3]', expected_output: 'index 1 chosen ~75% of time', is_sample: true },
    ],
  },
  {
    slug: 'browser-history',
    title: 'Browser History',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Implement browser navigation with visit, back, and forward operations.',
    testCases: [
      { input: 'visit pages then back()', expected_output: 'previous page', is_sample: true },
      { input: 'forward operation', expected_output: 'next page', is_sample: true },
    ],
  },
  {
    slug: 'autocomplete-system',
    title: 'Autocomplete System',
    difficulty: 'hard',
    tags: ['System Design Style Coding'],
    description:
      'Design an autocomplete engine that returns top matching sentences as characters are typed.',
    testCases: [
      { input: 'input sequence = "i"', expected_output: 'top suggestions', is_sample: true },
      { input: 'sentence completion', expected_output: 'updated frequency counts', is_sample: true },
    ],
  },
  {
    slug: 'design-excel-sum-formula',
    title: 'Design Excel Sum Formula',
    difficulty: 'hard',
    tags: ['System Design Style Coding'],
    description:
      'Implement spreadsheet cells supporting values and formula-based sums.',
    testCases: [
      { input: 'set cell values and SUM formula', expected_output: 'correct computed value', is_sample: true },
      { input: 'dependency update', expected_output: 'recalculated result', is_sample: true },
    ],
  },
  {
    slug: 'parking-system',
    title: 'Parking System',
    difficulty: 'easy',
    tags: ['System Design Style Coding'],
    description:
      'Design a parking system that manages slots for different vehicle sizes.',
    testCases: [
      { input: 'big=1, medium=1, small=0', expected_output: 'system initialized', is_sample: true },
      { input: 'addCar operations', expected_output: 'true/false based on capacity', is_sample: true },
    ],
  },
  {
    slug: 'design-tic-tac-toe',
    title: 'Design Tic-Tac-Toe',
    difficulty: 'medium',
    tags: ['System Design Style Coding'],
    description:
      'Design a Tic-Tac-Toe game that efficiently determines the winner after each move.',
    testCases: [
      { input: 'sequence of moves leading to win', expected_output: 'winning player id', is_sample: true },
      { input: 'ongoing game state', expected_output: '0', is_sample: true },
    ],
  },
  {
    slug: 'sherlock-and-array',
    title: 'Sherlock and Array',
    difficulty: 'medium',
    tags: ['Prefix Sum', 'Array'],
    description:
      'Determine whether there is an index where the sum of values to the left equals the sum of values to the right.',
    testCases: [
      { input: 'arr = [1,2,3]', expected_output: 'NO', is_sample: true },
      { input: 'arr = [1,2,3,3]', expected_output: 'YES', is_sample: true },
    ],
  },
];

function splitInputLines(input) {
  return String(input || '')
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function inferValueType(name, rawValue) {
  const value = String(rawValue || '').trim();
  const lowerName = String(name || '').toLowerCase();

  if (/^true$|^false$/i.test(value)) return 'boolean';
  if (/^-?\d+\.\d+$/.test(value)) return 'double';
  if (/^-?\d+$/.test(value)) {
    return Math.abs(Number(value)) > 2147483647 || lowerName === 'n' ? 'long' : 'int';
  }
  if (value.startsWith('"') && value.endsWith('"')) return 'string';
  if (value.startsWith('[[')) {
    if (/"[^"]*"/.test(value)) return 'string[][]';
    return 'int[][]';
  }
  if (value.startsWith('[')) {
    if (/"[^"]*"/.test(value)) return 'string[]';
    if (/null/.test(value)) return 'TreeNode';
    return 'int[]';
  }

  return 'string';
}

function inferOutputType(expectedOutput) {
  const output = String(expectedOutput || '').trim();

  if (/^true$|^false$/i.test(output)) return 'boolean';
  if (/^-?\d+\.\d+$/.test(output)) return 'double';
  if (/^-?\d+$/.test(output)) return Math.abs(Number(output)) > 2147483647 ? 'long' : 'int';
  if (output.startsWith('[[')) {
    if (/"[^"]*"/.test(output)) return 'string[][]';
    return 'int[][]';
  }
  if (output.startsWith('[')) {
    if (/"[^"]*"/.test(output)) return 'string[]';
    return 'int[]';
  }
  if (output.includes('\n')) return 'string';

  return 'string';
}

function inferProblemOutputType(testCases = []) {
  const types = testCases.map((testCase) => inferOutputType(testCase.expected_output));
  if (types.includes('string')) return 'string';
  if (types.includes('double')) return 'double';
  if (types.includes('long')) return 'long';
  return types[0] || 'string';
}

function extractInputAssignments(input) {
  const assignmentPattern =
    /([A-Za-z_]\w*)\s*=\s*(\[\[[^\n]*?\]\]|\[[^\n]*?\]|"[^"]*"|true|false|-?\d+(?:\.\d+)?)/gi;
  const assignments = [];

  for (const line of splitInputLines(input)) {
    for (const match of line.matchAll(assignmentPattern)) {
      assignments.push({ name: match[1], value: match[2] });
    }
  }

  return assignments;
}

function buildInputSignature(problem) {
  const firstSample = problem.testCases?.[0]?.input || '';

  return extractInputAssignments(firstSample)
    .map((assignment) => ({
      name: assignment.name,
      type: inferValueType(assignment.name, assignment.value),
    }));
}

function outputRuleFor(type) {
  if (type.endsWith('[][]')) return `Return a ${type} in JSON-style nested array format.`;
  if (type.endsWith('[]')) return `Return a ${type} in JSON-style array format.`;
  if (type === 'boolean') return 'Return true or false in lowercase.';
  if (type === 'string') return 'Return the exact string output shown by the examples.';
  return `Return a single ${type} value.`;
}

function buildExamples(problem) {
  return (problem.testCases || [])
    .filter((testCase) => testCase.is_sample)
    .slice(0, 2)
    .map((testCase, index) => ({
      label: `Example ${index + 1}`,
      input: testCase.input,
      output: testCase.expected_output,
      explanation: `For the given input, the required result is ${testCase.expected_output || 'an empty string'}.`,
    }));
}

function rangeConstraintForType(signature) {
  if (!signature) return null;
  if (signature.type.endsWith('[][]')) {
    return `${signature.name} has between 1 and 200 rows and columns unless the prompt implies a smaller fixed shape.`;
  }
  if (signature.type.endsWith('[]')) {
    return `1 <= ${signature.name}.length <= 100,000.`;
  }
  if (signature.type === 'string') {
    return `0 <= ${signature.name}.length <= 100,000.`;
  }
  if (signature.type === 'long') {
    return `0 <= ${signature.name} <= 10^12.`;
  }
  if (signature.type === 'int') {
    return `-10^9 <= ${signature.name} <= 10^9.`;
  }
  return null;
}

function buildConstraints(problem, inputSignature, outputSignature) {
  const constraints = [];
  const firstInput = inputSignature[0];
  const primaryRange = rangeConstraintForType(firstInput);

  if (primaryRange) constraints.push(primaryRange);
  if (inputSignature.length > 1) {
    constraints.push(`All input variables use the names and types shown in the signature.`);
  }
  if (problem.tags.includes('Array')) {
    constraints.push('Array values may include duplicates unless the statement says they are distinct.');
  }
  if (problem.tags.includes('String')) {
    constraints.push('Strings may contain lowercase letters, uppercase letters, digits, spaces, or symbols as shown in the examples.');
  }
  if (problem.tags.includes('Graph')) {
    constraints.push('Graph nodes are labeled with valid integer ids and edges use the pair format shown in the examples.');
  }
  if (problem.tags.includes('Grid') || problem.tags.includes('Matrix')) {
    constraints.push('Grid and matrix cells use only the value types shown in the examples.');
  }
  if (problem.tags.includes('Dynamic Programming')) {
    constraints.push('A brute force solution may time out on larger hidden tests.');
  }
  if (problem.slug === 'two-sum') {
    constraints.push('Exactly one valid pair exists for each test case.');
    constraints.push('Return two distinct indices in increasing order.');
  }
  constraints.push(outputRuleFor(outputSignature));

  return [...new Set(constraints)].slice(0, 5);
}

function normalizeCatalogTags(tags) {
  const aliases = {
    Strings: ['String'],
    'Stack & Queue': ['Stack', 'Queue'],
    'Trees & Graphs': ['Tree', 'Graph'],
    'Math & Number Theory': ['Math', 'Number Theory'],
    'System Design Style Coding': ['Design'],
  };
  const normalizedTags = [];

  for (const tag of tags || []) {
    const trimmedTag = String(tag || '').trim();
    normalizedTags.push(...(aliases[trimmedTag] || [trimmedTag]));
  }

  return sanitizeTags(normalizedTags);
}

function uniqueProblemSeeds(seeds) {
  const seen = new Set();

  return seeds.filter((problem) => {
    if (!problem?.slug) return false;
    if (seen.has(problem.slug)) return false;
    seen.add(problem.slug);
    return true;
  });
}

function enrichProblem(problem) {
  const tags = normalizeCatalogTags(problem.tags);
  const normalizedProblem = {
    ...problem,
    tags,
  };
  const specialSignatures = {
    'merge-two-sorted-lists': {
      inputSignature: [
        { name: 'list1', type: 'ListNode' },
        { name: 'list2', type: 'ListNode' },
      ],
      outputSignature: 'ListNode',
    },
    'serialize-and-deserialize-binary-tree': {
      inputSignature: [{ name: 'root', type: 'TreeNode' }],
      outputSignature: 'TreeNode',
    },
    'clone-graph': {
      inputSignature: [{ name: 'node', type: 'Node' }],
      outputSignature: 'Node',
    },
  };
  const specialSignature = specialSignatures[problem.slug] || {};
  const inputSignature = specialSignature.inputSignature || problem.inputSignature || buildInputSignature(problem);
  const outputSignature =
    specialSignature.outputSignature || problem.outputSignature || inferProblemOutputType(problem.testCases);

  return {
    ...normalizedProblem,
    tags,
    inputSignature,
    outputSignature,
    examples: problem.examples || buildExamples(problem),
    constraints: problem.constraints || buildConstraints(normalizedProblem, inputSignature, outputSignature),
  };
}

function slugToFunctionName(slug) {
  return String(slug || 'solve').replace(/-([a-z0-9])/g, (_, value) => value.toUpperCase());
}

const catalogSeeds = uniqueProblemSeeds(problemSeeds);

const problems = catalogSeeds.map((problem, index) => enrichProblem({
  id: index + 1,
  function_name: slugToFunctionName(problem.slug),
  starter_code: starterCode,
  ...problem,
  starter_code: problem.starter_code || starterCode,
}));

module.exports = {
  problems,
  problemSeeds: problems,
};
