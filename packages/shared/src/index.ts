import { z } from 'zod';
import { SmsEnvelopeSchema, SmsBatchSchema } from './schemas/sms.js';
import { CallEnvelopeSchema, CallBatchSchema } from './schemas/call.js';
import { NotificationEnvelopeSchema, NotificationBatchSchema } from './schemas/notification.js';

export { SmsEnvelopeSchema, SmsBatchSchema };
export { CallEnvelopeSchema, CallBatchSchema };
export { NotificationEnvelopeSchema, NotificationBatchSchema };

export type SmsEnvelope = z.infer<typeof SmsEnvelopeSchema>;
export type CallEnvelope = z.infer<typeof CallEnvelopeSchema>;
export type NotificationEnvelope = z.infer<typeof NotificationEnvelopeSchema>;
export type SmsBatch = z.infer<typeof SmsBatchSchema>;
export type CallBatch = z.infer<typeof CallBatchSchema>;
export type NotificationBatch = z.infer<typeof NotificationBatchSchema>;
