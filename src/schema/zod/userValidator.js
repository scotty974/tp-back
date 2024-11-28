import {z} from "zod";

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    role: z.string().min(1),
});

export default userSchema;