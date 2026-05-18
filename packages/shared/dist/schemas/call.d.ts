import { z } from 'zod';
export declare const CallEnvelopeSchema: z.ZodObject<{
    id: z.ZodString;
    number: z.ZodString;
    duration: z.ZodNumber;
    date: z.ZodNumber;
    type: z.ZodNumber;
    name: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    number: string;
    id: string;
    date: number;
    type: number;
    duration: number;
    name: string | null;
}, {
    number: string;
    id: string;
    date: number;
    type: number;
    duration: number;
    name: string | null;
}>;
export declare const CallBatchSchema: z.ZodObject<{
    source: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        number: z.ZodString;
        duration: z.ZodNumber;
        date: z.ZodNumber;
        type: z.ZodNumber;
        name: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        number: string;
        id: string;
        date: number;
        type: number;
        duration: number;
        name: string | null;
    }, {
        number: string;
        id: string;
        date: number;
        type: number;
        duration: number;
        name: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    source: string;
    items: {
        number: string;
        id: string;
        date: number;
        type: number;
        duration: number;
        name: string | null;
    }[];
}, {
    source: string;
    items: {
        number: string;
        id: string;
        date: number;
        type: number;
        duration: number;
        name: string | null;
    }[];
}>;
//# sourceMappingURL=call.d.ts.map