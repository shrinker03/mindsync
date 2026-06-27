import { Router } from 'express';
import { SmsBatchSchema, CallBatchSchema, NotificationBatchSchema } from '@mind-sync/shared';
import { prisma } from '../db/prisma.js';
import { HttpError } from '../middleware/error.js';

export const syncRouter = Router();

// The app wraps batches as { enc: 'b64', data: <base64 of the JSON batch> } so
// Render's upstream Cloudflare WAF can't pattern-match message content and 403
// the request. Unwrap here before validation; plain (unwrapped) bodies still work.
function decodeEnvelope(body: unknown): unknown {
  if (
    body !== null &&
    typeof body === 'object' &&
    (body as Record<string, unknown>).enc === 'b64' &&
    typeof (body as Record<string, unknown>).data === 'string'
  ) {
    const json = Buffer.from((body as { data: string }).data, 'base64').toString('utf8');
    return JSON.parse(json);
  }
  return body;
}

syncRouter.post('/:type', async (req, res, next) => {
  try {
    const { type } = req.params;
    let payload: unknown;
    try {
      payload = decodeEnvelope(req.body);
    } catch {
      throw new HttpError(400, 'Malformed base64 envelope');
    }

    if (type === 'sms') {
      const parsed = SmsBatchSchema.safeParse(payload);
      if (!parsed.success) throw new HttpError(400, parsed.error.message);
      const { source, items } = parsed.data;
      const rows = items.map(item => ({
        source,
        externalId: item.id,
        address: item.address,
        body: item.body,
        date: BigInt(item.date),
        type: item.type,
        threadId: item.threadId,
        read: item.read,
      }));
      const result = await prisma.smsMessage.createMany({ data: rows, skipDuplicates: true });
      res.json({ accepted: result.count, duplicates: rows.length - result.count });

    } else if (type === 'call') {
      const parsed = CallBatchSchema.safeParse(payload);
      if (!parsed.success) throw new HttpError(400, parsed.error.message);
      const { source, items } = parsed.data;
      const rows = items.map(item => ({
        source,
        externalId: item.id,
        number: item.number,
        duration: item.duration,
        date: BigInt(item.date),
        type: item.type,
        name: item.name,
      }));
      const result = await prisma.callEntry.createMany({ data: rows, skipDuplicates: true });
      res.json({ accepted: result.count, duplicates: rows.length - result.count });

    } else if (type === 'notification') {
      const parsed = NotificationBatchSchema.safeParse(payload);
      if (!parsed.success) throw new HttpError(400, parsed.error.message);
      const { source, items } = parsed.data;
      const rows = items.map(item => ({
        source,
        externalId: item.id,
        pkg: item.pkg,
        title: item.title,
        text: item.text,
        timestamp: BigInt(item.timestamp),
      }));
      const result = await prisma.notification.createMany({ data: rows, skipDuplicates: true });
      res.json({ accepted: result.count, duplicates: rows.length - result.count });

    } else {
      throw new HttpError(400, `Unknown sync type: ${type}`);
    }
  } catch (err) {
    next(err);
  }
});
