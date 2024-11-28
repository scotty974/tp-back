import {z} from "zod";

const productSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(1),
    image: z.string().min(1),
    stock: z.number().min(1),
    category: z.string().min(1),
});

export default productSchema;