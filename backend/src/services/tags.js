const PLATFORM_TAGS = new Set(['leetcode', 'hackerrank', 'codeforces', 'codechef']);

function sanitizeTags(tags = []) {
  return [...new Set(
    (Array.isArray(tags) ? tags : [])
      .map((tag) => String(tag || '').trim())
      .filter((tag) => tag && !PLATFORM_TAGS.has(tag.toLowerCase())),
  )];
}

module.exports = {
  PLATFORM_TAGS,
  sanitizeTags,
};
