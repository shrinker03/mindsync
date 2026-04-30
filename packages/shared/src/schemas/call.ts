import { z } from 'zod';

export const CallEnvelopeSchema = z.object({
  id: z.string(),
  number: z.string(),
  duration: z.number(),
  date: z.number(),
  type: z.number(),
  name: z.string().nullable(),
});

export const CallBatchSchema = z.object({
  source: z.string().min(1),
  items: z.array(CallEnvelopeSchema),
});
