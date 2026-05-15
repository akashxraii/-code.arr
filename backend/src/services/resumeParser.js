function extractResumeText(file) {
  if (!file) {
    throw new Error('Resume file is required');
  }

  const extension = file.originalname.split('.').pop().toLowerCase();
  const raw = file.buffer.toString('utf8');
  const readable = raw
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (extension === 'txt' || file.mimetype === 'text/plain') {
    return readable;
  }

  return readable || `Uploaded ${extension.toUpperCase()} resume: ${file.originalname}`;
}

module.exports = {
  extractResumeText,
};
