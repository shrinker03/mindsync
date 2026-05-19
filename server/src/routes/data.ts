import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma.js';

export const dataRouter = Router();

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

function parseLimit(raw: unknown): number {
  if (typeof raw !== 'string') return DEFAULT_LIMIT;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(Math.floor(n), MAX_LIMIT);
}

function parseCursor(raw: unknown): bigint | undefined {
  if (typeof raw !== 'string' || raw.length === 0) return undefined;
  try {
    return BigInt(raw);
  } catch {
    return undefined;
  }
}

function parseString(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

dataRouter.get('/sms', async (req, res, next) => {
  try {
    const limit = parseLimit(req.query.limit);
    const cursor = parseCursor(req.query.cursor);
    const q = parseString(req.query.q);

    const where: Prisma.SmsMessageWhereInput = {
      ...(cursor !== undefined && { id: { lt: cursor } }),
      ...(q && {
        OR: [
          { body: { contains: q, mode: 'insensitive' } },
          { address: { contains: q, mode: 'insensitive' } },
        ],
      }),
    };

    const rows = await prisma.smsMessage.findMany({
      where,
      orderBy: { id: 'desc' },
      take: limit + 1,
    });

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const last = items[items.length - 1];
    const nextCursor = hasMore && last ? last.id.toString() : null;

    res.json({ items, nextCursor });
  } catch (e) {
    next(e);
  }
});

dataRouter.get('/calls', async (req, res, next) => {
  try {
    const limit = parseLimit(req.query.limit);
    const cursor = parseCursor(req.query.cursor);
    const q = parseString(req.query.q);

    const where: Prisma.CallEntryWhereInput = {
      ...(cursor !== undefined && { id: { lt: cursor } }),
      ...(q && {
        OR: [
          { number: { contains: q, mode: 'insensitive' } },
          { name: { contains: q, mode: 'insensitive' } },
        ],
      }),
    };

    const rows = await prisma.callEntry.findMany({
      where,
      orderBy: { id: 'desc' },
      take: limit + 1,
    });

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const last = items[items.length - 1];
    const nextCursor = hasMore && last ? last.id.toString() : null;

    res.json({ items, nextCursor });
  } catch (e) {
    next(e);
  }
});

dataRouter.get('/notifications/pkgs', async (_req, res, next) => {
  try {
    const rows = await prisma.notification.groupBy({
      by: ['pkg'],
      _count: { _all: true },
      orderBy: { _count: { pkg: 'desc' } },
    });
    res.json({
      items: rows.map(r => ({ pkg: r.pkg, count: r._count._all })),
    });
  } catch (e) {
    next(e);
  }
});

dataRouter.get('/notifications', async (req, res, next) => {
  try {
    const limit = parseLimit(req.query.limit);
    const cursor = parseCursor(req.query.cursor);
    const q = parseString(req.query.q);
    const pkg = parseString(req.query.pkg);

    const where: Prisma.NotificationWhereInput = {
      ...(cursor !== undefined && { id: { lt: cursor } }),
      ...(pkg && { pkg }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { text: { contains: q, mode: 'insensitive' } },
        ],
      }),
    };

    const rows = await prisma.notification.findMany({
      where,
      orderBy: { id: 'desc' },
      take: limit + 1,
    });

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const last = items[items.length - 1];
    const nextCursor = hasMore && last ? last.id.toString() : null;

    res.json({ items, nextCursor });
  } catch (e) {
    next(e);
  }
});
