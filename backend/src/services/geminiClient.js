const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_GEMINI_TIMEOUT_MS = 12000;

function isLowEffortAnswer(answer) {
  const normalized = String(answer || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w\s']/g, '');
  if (!normalized) return false;

  const words = normalized.split(/\s+/).filter(Boolean);
  const lowEffortPhrases = new Set([
    'hi',
    'hello',
    'hey',
    'ok',
    'okay',
    'yes',
    'no',
    'good',
    'fine',
    'idk',
    "i don't know",
    'i dont know',
  ]);

  return words.length < 4 || lowEffortPhrases.has(normalized);
}

function fallbackQuestion({ domain, resumeText, answer, silence }) {
  const domainLabel = domain || 'software engineering';
  const resumeHint = resumeText ? 'I have reviewed your CV context.' : 'I will use your answers as context.';

  if (silence) {
    return `No worries, take a breath. Could you briefly explain one ${domainLabel} project you are comfortable discussing?`;
  }

  if (answer) {
    if (isLowEffortAnswer(answer)) {
      return `I need a more detailed answer to evaluate you properly. Could you answer the previous question with a specific example from your CV or ${domainLabel} experience?`;
    }

    const lower = answer.toLowerCase();
    if (lower.includes('react')) {
      return 'You mentioned React. How do you decide when to use state, context, or a dedicated state management library in a project?';
    }
    if (lower.includes('project')) {
      return 'Tell me more about that project. What was the hardest technical decision you made, and why?';
    }
    return `Let us go deeper: what tradeoff did you consider while solving that ${domainLabel} problem?`;
  }

  return `Hi, welcome to your ${domainLabel} mock interview. ${resumeHint} To start, could you briefly introduce yourself and describe one project or experience from your CV?`;
}

function fallbackFeedback(messages) {
  const userAnswers = messages.filter((message) => message.role === 'user');
  return {
    score: Math.min(85, 55 + userAnswers.length * 8),
    strengths: 'You completed the interview flow and provided answers that can be reviewed.',
    improvements:
      'Add more specific examples, explain tradeoffs clearly, and connect your answers to measurable project impact.',
    summary: 'This fallback feedback was generated because no Gemini API key is configured.',
  };
}

async function askGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!apiKey) return null;

  const controller = new AbortController();
  const timeoutMs = Number(process.env.GEMINI_TIMEOUT_MS || DEFAULT_GEMINI_TIMEOUT_MS);
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let response;

  try {
    response = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Gemini request timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Gemini request failed with ${response.status}`);
  }

  const payload = await response.json();
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text).join('\n').trim() || null;
}

async function generateQuestion({ domain, resumeText, history, answer, silence = false }) {
  const isOpeningQuestion =
    !answer && !silence && !(history || []).some((message) => message.role === 'user');
  const prompt = [
    'You are a realistic AI mock interviewer.',
    'Ask exactly one concise next question.',
    isOpeningQuestion
      ? 'This is the first question of the interview. Start with a brief warm greeting, then ask the candidate to introduce themselves and describe one CV project or experience before any technical deep dive.'
      : 'Continue the interview naturally from the previous answer.',
    'Adapt to the candidate CV, selected domain, conversation history, and latest answer.',
    'Use the CV context when choosing project, skill, and experience follow-ups.',
    'Do not praise low-effort, irrelevant, or greeting-only answers.',
    'If the latest answer is too short, irrelevant, or only a greeting, ask the candidate to answer the previous question with a specific example.',
    'Do not produce feedback yet.',
    `Domain: ${domain}`,
    `CV context: ${resumeText || 'No CV text available'}`,
    `Conversation so far: ${JSON.stringify(history || [])}`,
    `Latest answer: ${answer || ''}`,
    `Silence recovery: ${silence ? 'yes' : 'no'}`,
  ].join('\n\n');

  let generated = null;
  try {
    generated = await askGemini(prompt);
  } catch (err) {
    console.warn(err.message);
  }
  return generated || fallbackQuestion({ domain, resumeText, answer, silence });
}

async function generateFeedback({ domain, resumeText, history }) {
  const prompt = [
    'You are an AI interview evaluator.',
    'Return JSON with keys: score, strengths, improvements, summary.',
    'Score should be 0-100.',
    `Domain: ${domain}`,
    `CV context: ${resumeText || 'No CV text available'}`,
    `Conversation: ${JSON.stringify(history || [])}`,
  ].join('\n\n');

  let generated = null;
  try {
    generated = await askGemini(prompt);
  } catch (err) {
    console.warn(err.message);
  }
  if (!generated) return fallbackFeedback(history || []);

  try {
    return JSON.parse(generated.replace(/^```json|```$/g, '').trim());
  } catch (err) {
    return {
      score: 75,
      strengths: 'The candidate gave relevant answers during the interview.',
      improvements: 'Structure answers with specific examples, tradeoffs, and measurable outcomes.',
      summary: generated,
    };
  }
}

module.exports = {
  generateQuestion,
  generateFeedback,
};
