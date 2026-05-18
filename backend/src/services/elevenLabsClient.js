const { Readable } = require('stream');

const ELEVENLABS_TTS_ENDPOINT = 'https://api.elevenlabs.io/v1/text-to-speech';
const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';
const DEFAULT_OUTPUT_FORMAT = 'mp3_44100_128';

function createSpeechError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function getVoiceConfig() {
  return {
    apiKey: process.env.ELEVENLABS_API_KEY,
    voiceId: process.env.ELEVENLABS_VOICE_ID,
    modelId: process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID,
    outputFormat: process.env.ELEVENLABS_OUTPUT_FORMAT || DEFAULT_OUTPUT_FORMAT,
  };
}

function assertSpeechConfigured(config) {
  if (!config.apiKey || !config.voiceId) {
    throw createSpeechError(
      503,
      'Premium interviewer voice is not configured. Add ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID.',
    );
  }
}

async function streamInterviewSpeech(text) {
  const config = getVoiceConfig();
  assertSpeechConfigured(config);

  const trimmedText = String(text || '').trim();
  if (!trimmedText) {
    throw createSpeechError(400, 'No interview question is available to speak.');
  }

  const url = new URL(`${ELEVENLABS_TTS_ENDPOINT}/${config.voiceId}/stream`);
  url.searchParams.set('output_format', config.outputFormat);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': config.apiKey,
    },
    body: JSON.stringify({
      text: trimmedText,
      model_id: config.modelId,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.85,
        style: 0.25,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    throw createSpeechError(
      502,
      `ElevenLabs speech request failed with status ${response.status}.`,
    );
  }

  if (!response.body) {
    throw createSpeechError(502, 'ElevenLabs did not return an audio stream.');
  }

  return {
    stream: Readable.fromWeb(response.body),
    contentType: response.headers.get('content-type') || 'audio/mpeg',
  };
}

module.exports = {
  streamInterviewSpeech,
};
