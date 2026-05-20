const starterCode = {
  javascript:
    'function solve(input) {\n  // Parse input and return the required answer as a string.\n  return "";\n}\n',
};

const problemSeeds = [
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    tags: ['LeetCode', 'Array', 'Hash Table'],
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
    tags: ['LeetCode', 'Stack', 'String'],
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
    tags: ['LeetCode', 'Linked List', 'Recursion'],
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
    tags: ['LeetCode', 'Array', 'Dynamic Programming'],
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
    tags: ['LeetCode', 'Array', 'Dynamic Programming'],
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
    tags: ['LeetCode', 'Array', 'Hash Set'],
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
    tags: ['LeetCode', 'Array', 'Prefix Product'],
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
    tags: ['LeetCode', 'Array', 'Dynamic Programming'],
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
    tags: ['LeetCode', 'Binary Search', 'Array'],
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
    tags: ['LeetCode', 'Binary Search', 'Array'],
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
    tags: ['LeetCode', 'Two Pointers', 'Array'],
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
    tags: ['LeetCode', 'Two Pointers', 'Greedy'],
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
    tags: ['LeetCode', 'Sliding Window', 'String'],
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
    tags: ['LeetCode', 'String', 'Dynamic Programming'],
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
    tags: ['LeetCode', 'Hash Table', 'String'],
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
    tags: ['LeetCode', 'Heap', 'Hash Table'],
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
    tags: ['LeetCode', 'String', 'Hash Table'],
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
    tags: ['LeetCode', 'Dynamic Programming', 'Math'],
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
    tags: ['LeetCode', 'Dynamic Programming', 'BFS'],
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
    tags: ['LeetCode', 'Dynamic Programming', 'Binary Search'],
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
    tags: ['LeetCode', 'Dynamic Programming', 'Trie'],
    description:
      'Determine whether the string can be segmented into a sequence of one or more dictionary words.',
    testCases: [
      { input: 's = "leetcode"\nwordDict = ["leet","code"]', expected_output: 'true', is_sample: true },
      { input: 's = "catsandog"\nwordDict = ["cats","dog","sand","and","cat"]', expected_output: 'false', is_sample: true },
    ],
  },
  {
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'medium',
    tags: ['LeetCode', 'DFS', 'BFS', 'Grid'],
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
    tags: ['LeetCode', 'Graph', 'Topological Sort'],
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
    tags: ['LeetCode', 'Graph', 'DFS', 'BFS'],
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
    tags: ['LeetCode', 'DFS', 'BFS', 'Matrix'],
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
    tags: ['LeetCode', 'BFS', 'Grid'],
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
    tags: ['LeetCode', 'Two Pointers', 'String'],
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
    tags: ['LeetCode', 'Sliding Window', 'String'],
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
    tags: ['LeetCode', 'Tree', 'DFS', 'Design'],
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
    tags: ['LeetCode', 'Binary Search', 'Array'],
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
    tags: ['LeetCode', 'Two Pointers', 'Stack'],
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
    tags: ['LeetCode', 'Stack', 'Array'],
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
    tags: ['LeetCode', 'BFS', 'String'],
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
    tags: ['Codeforces', 'Math', 'Implementation'],
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
    tags: ['Codeforces', 'String', 'Implementation'],
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
    tags: ['Codeforces', 'Implementation'],
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
    tags: ['Codeforces', 'Sorting', 'Implementation'],
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
    tags: ['Codeforces', 'Math', 'Greedy'],
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
    tags: ['Codeforces', 'Implementation'],
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
    tags: ['Codeforces', 'Matrix', 'Implementation'],
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
    tags: ['Codeforces', 'String'],
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
    tags: ['Codeforces', 'String'],
    description:
      'Remove vowels, convert the remaining letters to lowercase, and place a dot before each remaining character.',
    testCases: [
      { input: 's = "tour"', expected_output: '.t.r', is_sample: true },
      { input: 's = "Codeforces"', expected_output: '.c.d.f.r.c.s', is_sample: true },
    ],
  },
  {
    slug: 'young-physicist',
    title: 'Young Physicist',
    difficulty: 'easy',
    tags: ['Codeforces', 'Math', 'Vectors'],
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
    tags: ['Codeforces', 'String', 'Sorting'],
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
    tags: ['Codeforces', 'String'],
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
    tags: ['Codeforces', 'String', 'Set'],
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
    tags: ['Codeforces', 'String'],
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
    tags: ['Codeforces', 'Math', 'Greedy'],
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
    tags: ['Codeforces', 'Simulation', 'String'],
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
    tags: ['Codeforces', 'Digits'],
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
    tags: ['Codeforces', 'Greedy', 'Sorting'],
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
    tags: ['Codeforces', 'Greedy', 'Sorting'],
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
    tags: ['Codeforces', 'Greedy', 'Array'],
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
    tags: ['Codeforces', 'String'],
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
    tags: ['HackerRank', 'Warmup', 'Math'],
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
    tags: ['HackerRank', 'Array', 'Warmup'],
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
    tags: ['HackerRank', 'Array'],
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
    tags: ['HackerRank', 'Array', 'BigInt'],
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
    tags: ['HackerRank', 'Matrix'],
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
    tags: ['HackerRank', 'Array', 'Ratios'],
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
    tags: ['HackerRank', 'String', 'Formatting'],
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
    tags: ['HackerRank', 'Array', 'Sorting'],
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
    tags: ['HackerRank', 'Array'],
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
    tags: ['HackerRank', 'String', 'Date Time'],
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
    tags: ['HackerRank', 'Array', 'Implementation'],
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
    tags: ['HackerRank', 'Implementation'],
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
    tags: ['HackerRank', 'Math'],
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
    tags: ['HackerRank', 'Math', 'GCD', 'LCM'],
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
    tags: ['HackerRank', 'Array'],
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
    tags: ['HackerRank', 'Sliding Window', 'Array'],
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
    tags: ['HackerRank', 'Array', 'Modulo'],
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
    tags: ['HackerRank', 'Counting', 'Array'],
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
    tags: ['HackerRank', 'Date Time', 'Implementation'],
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
    tags: ['HackerRank', 'Array', 'Implementation'],
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
    tags: ['HackerRank', 'Counting', 'Hash Table'],
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
    tags: ['HackerRank', 'String', 'Simulation'],
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
    tags: ['HackerRank', 'Greedy', 'Array'],
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
    tags: ['HackerRank', 'String', 'Math'],
    description:
      'Count how many times the letter a appears in the first n characters of an infinitely repeated string.',
    testCases: [
      { input: 's = "aba"\nn = 10', expected_output: '7', is_sample: true },
      { input: 's = "a"\nn = 1000000000000', expected_output: '1000000000000', is_sample: true },
    ],
  },
  {
    slug: 'sherlock-and-array',
    title: 'Sherlock and Array',
    difficulty: 'medium',
    tags: ['HackerRank', 'Prefix Sum', 'Array'],
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

function buildInputSignature(problem) {
  const firstSample = problem.testCases?.[0]?.input || '';

  return splitInputLines(firstSample)
    .map((line) => line.match(/^([A-Za-z_]\w*)\s*=\s*([\s\S]+)$/))
    .filter(Boolean)
    .map((match) => ({
      name: match[1],
      type: inferValueType(match[1], match[2]),
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

function enrichProblem(problem) {
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
    ...problem,
    inputSignature,
    outputSignature,
    examples: problem.examples || buildExamples(problem),
    constraints: problem.constraints || buildConstraints(problem, inputSignature, outputSignature),
  };
}

function slugToFunctionName(slug) {
  return String(slug || 'solve').replace(/-([a-z0-9])/g, (_, value) => value.toUpperCase());
}

const problems = problemSeeds.map((problem, index) => enrichProblem({
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
