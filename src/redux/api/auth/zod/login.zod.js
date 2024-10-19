import {z} from "zod";

const loginPayloadSchema = z.object({
    email: z.string().email().min(1, {
        message: `Email not provided`
    }),
    password: z.string().min(1, {
        message: `Password not provided`
    }),
});

export default loginPayloadSchema;