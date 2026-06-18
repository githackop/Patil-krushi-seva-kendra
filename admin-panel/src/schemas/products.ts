import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(2),

    brand: z.string(),

    categoryId: z.string(),

    price: z.number(),

    stock: z.number(),

    description: z.string(),
});

export type ProductFormValues = z.infer<typeof productSchema>;