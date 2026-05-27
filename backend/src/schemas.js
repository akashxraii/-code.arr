const { z } = require('zod');
const { MAX_CODE_LENGTH, SUPPORTED_LANGUAGES } = require('./services/codeRunner');
const { PLATFORM_TAGS } = require('./services/tags');

const languageSchema = z.enum(SUPPORTED_LANGUAGES);
const codeSchema = z.string().min(1).max(MAX_CODE_LENGTH);

const inputParamSchema = z.object({
  name: z.string().regex(/^[A-Za-z_]\w{0,79}$/),
  type: z.string().min(1).max(40),
});

const testCaseSchema = z.object({
  input: z.string().min(1).max(10000),
  expected_output: z.string().max(10000),
  is_sample: z.boolean().optional(),
});

module.exports = {
  registerSchema: z.object({
    username: z.string().trim().min(3).max(50).regex(/^[A-Za-z0-9_.-]+$/),
    email: z.string().trim().email().max(120).toLowerCase(),
    password: z.string().min(8).max(200),
  }),
  loginSchema: z.object({
    email: z.string().trim().email().max(120).toLowerCase(),
    password: z.string().min(1).max(200),
  }),
  runSchema: z.object({
    problemSlug: z.string().trim().min(1).max(120),
    language: languageSchema.default('javascript'),
    code: codeSchema,
    mode: z.enum(['run', 'submit']).default('run'),
  }),
  submissionSchema: z.object({
    problem_id: z.coerce.number().int().positive(),
    language: languageSchema.default('javascript'),
    code: codeSchema,
  }),
  problemCreateSchema: z.object({
    slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(1).max(255),
    description: z.string().trim().min(1).max(20000),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    tags: z.array(
      z.string()
        .trim()
        .min(1)
        .max(40)
        .refine((tag) => !PLATFORM_TAGS.has(tag.toLowerCase()), 'Do not use coding platform names as tags'),
    ).max(20).default([]),
    starterCode: z.record(z.string(), z.string().max(MAX_CODE_LENGTH)).default({}),
    functionName: z.string().regex(/^[A-Za-z_]\w{0,79}$/).optional(),
    inputSignature: z.array(inputParamSchema).max(20).optional(),
    outputSignature: z.string().max(40).optional(),
    examples: z.array(z.record(z.string(), z.unknown())).max(10).optional(),
    constraints: z.array(z.string().max(300)).max(20).optional(),
    testCases: z.array(testCaseSchema).max(100).default([]),
  }),
  interviewCreateSchema: z.object({
    domain: z.string().trim().min(1).max(80),
    resumeId: z.coerce.number().int().positive(),
  }),
  interviewAnswerSchema: z.object({
    answer: z.string().trim().min(1).max(10000),
  }),
};
