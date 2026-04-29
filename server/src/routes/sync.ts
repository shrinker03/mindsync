import { Router } from 'express';
import { SmsBatchSchema, CallBatchSchema, NotificationBatchSchema } from '@mind-sync/shared';
import { prisma } from '../db/prisma.js';
import { HttpError } from '../middleware/error.js';

export const syncRouter = Router();

syncRouter.post('/:type', async (req, res, next) => {
  try {
    const { type } = req.params;

    if (type === 'sms') {
      const parsed = SmsBatchSchema.safeParse(req.body);
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
      const parsed = CallBatchSchema.safeParse(req.body);
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
      const parsed = NotificationBatchSchema.safeParse(req.body);
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
