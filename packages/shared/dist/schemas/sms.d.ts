import { z } from 'zod';
export declare const SmsEnvelopeSchema: z.ZodObject<{
    id: z.ZodString;
    address: z.ZodString;
    body: z.ZodString;
    date: z.ZodNumber;
    type: z.ZodNumber;
    threadId: z.ZodString;
    read: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    address: string;
    body: string;
    date: number;
    type: number;
    threadId: string;
    read: number;
}, {
    id: string;
    address: string;
    body: string;
    date: number;
    type: number;
    threadId: string;
    read: number;
}>;
export declare const SmsBatchSchema: z.ZodObject<{
    source: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        address: z.ZodString;
        body: z.ZodString;
        date: z.ZodNumber;
        type: z.ZodNumber;
        threadId: z.ZodString;
        read: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        address: string;
        body: string;
        date: number;
        type: number;
        threadId: string;
        read: number;
    }, {
        id: string;
        address: string;
        body: string;
        date: number;
        type: number;
        threadId: string;
        read: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    source: string;
    items: {
        id: string;
        address: string;
        body: string;
        date: number;
        type: number;
        threadId: string;
        read: number;
    }[];
}, {
    source: string;
    items: {
        id: string;
        address: string;
        body: string;
        date: number;
        type: number;
        threadId: string;
        read: number;
    }[];
}>;
//# sourceMappingURL=sms.d.ts.map