import { z } from 'zod';

export const SmsEnvelopeSchema = z.object({
  id: z.string(),
  address: z.string(),
  body: z.string(),
  date: z.number(),
  type: z.number(),
  threadId: z.string(),
  read: z.number(),
});

export const SmsBatchSchema = z.object({
  source: z.string().min(1),
  items: z.array(SmsEnvelopeSchema),
});
