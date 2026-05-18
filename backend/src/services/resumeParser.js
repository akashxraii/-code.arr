const mammoth = require('mammoth');
const { PDFParse } = require('pdf-parse');

const MIN_READABLE_CHARACTERS = 20;

function createParseError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function normalizeText(text) {
  return String(text || '')
    .replace(/\u0000/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function extractPdfText(file) {
  const parser = new PDFParse({ data: file.buffer });

  try {
    const result = await parser.getText({ pageJoiner: '\n\n' });
    return result.text;
  } finally {
    await parser.destroy().catch(() => {});
  }
}

async function extractDocxText(file) {
  const result = await mammoth.extractRawText({ buffer: file.buffer });
  return result.value;
}

async function extractResumeText(file) {
  if (!file) {
    throw createParseError('Resume file is required');
  }

  const extension = file.originalname.split('.').pop().toLowerCase();
  const mimeType = String(file.mimetype || '').toLowerCase();
  let extractedText = '';

  try {
    if (extension === 'txt' || mimeType === 'text/plain') {
      extractedText = file.buffer.toString('utf8');
    } else if (extension === 'pdf' || mimeType === 'application/pdf') {
      extractedText = await extractPdfText(file);
    } else if (
      extension === 'docx' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      extractedText = await extractDocxText(file);
    } else {
      throw createParseError('Unsupported resume format. Upload a PDF, DOCX, or TXT file.');
    }
  } catch (err) {
    if (err.statusCode) throw err;
    throw createParseError('Could not read this resume. Upload a text-based PDF, DOCX, or TXT file.');
  }

  const readable = normalizeText(extractedText);
  if (readable.length < MIN_READABLE_CHARACTERS) {
    throw createParseError(
      'Could not read enough text from this resume. Upload a text-based PDF, DOCX, or TXT file.',
    );
  }

  return readable;
}

module.exports = {
  extractResumeText,
};
