import { z } from 'zod';

export const NotificationEnvelopeSchema = z.object({
  id: z.string(),
  pkg: z.string(),
  title: z.string().nullable(),
  text: z.string().nullable(),
  timestamp: z.number(),
});

export const NotificationBatchSchema = z.object({
  source: z.string().min(1),
  items: z.array(NotificationEnvelopeSchema),
});
