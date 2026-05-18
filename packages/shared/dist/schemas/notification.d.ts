import { z } from 'zod';
export declare const NotificationEnvelopeSchema: z.ZodObject<{
    id: z.ZodString;
    pkg: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    text: z.ZodNullable<z.ZodString>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    pkg: string;
    title: string | null;
    text: string | null;
    timestamp: number;
}, {
    id: string;
    pkg: string;
    title: string | null;
    text: string | null;
    timestamp: number;
}>;
export declare const NotificationBatchSchema: z.ZodObject<{
    source: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        pkg: z.ZodString;
        title: z.ZodNullable<z.ZodString>;
        text: z.ZodNullable<z.ZodString>;
        timestamp: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        pkg: string;
        title: string | null;
        text: string | null;
        timestamp: number;
    }, {
        id: string;
        pkg: string;
        title: string | null;
        text: string | null;
        timestamp: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    source: string;
    items: {
        id: string;
        pkg: string;
        title: string | null;
        text: string | null;
        timestamp: number;
    }[];
}, {
    source: string;
    items: {
        id: string;
        pkg: string;
        title: string | null;
        text: string | null;
        timestamp: number;
    }[];
}>;
//# sourceMappingURL=notification.d.ts.map