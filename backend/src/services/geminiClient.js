const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

function fallbackQuestion({ domain, resumeText, answer, silence }) {
  const domainLabel = domain || 'software engineering';
  const resumeHint = resumeText ? 'I have reviewed your CV context.' : 'I will use your answers as context.';

  if (silence) {
    return `No worries, take a breath. Could you briefly explain one ${domainLabel} project you are comfortable discussing?`;
  }

  if (answer) {
    const lower = answer.toLowerCase();
    if (lower.includes('react')) {
      return 'You mentioned React. How do you decide when to use state, context, or a dedicated state management library in a project?';
    }
    if (lower.includes('project')) {
      return 'Tell me more about that project. What was the hardest technical decision you made, and why?';
    }
    return `Good. Let us go deeper: what tradeoff did you consider while solving that ${domainLabel} problem?`;
  }

  return `${resumeHint} Let us begin your ${domainLabel} interview. Can you introduce yourself and highlight one project from your CV?`;
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

  const response = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed with ${response.status}`);
  }

  const payload = await response.json();
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text).join('\n').trim() || null;
}

async function generateQuestion({ domain, resumeText, history, answer, silence = false }) {
  const prompt = [
    'You are a realistic AI mock interviewer.',
    'Ask exactly one concise next question.',
    'Adapt to the candidate CV, domain, and latest answer.',
    'Do not produce feedback yet.',
    `Domain: ${domain}`,
    `CV context: ${resumeText || 'No CV text available'}`,
    `Conversation so far: ${JSON.stringify(history || [])}`,
    `Latest answer: ${answer || ''}`,
    `Silence recovery: ${silence ? 'yes' : 'no'}`,
  ].join('\n\n');

  const generated = await askGemini(prompt);
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

  const generated = await askGemini(prompt);
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
