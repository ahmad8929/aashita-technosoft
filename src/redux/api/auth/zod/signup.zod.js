import {z} from "zod";

const signupPayloadSchema = z.object({
    email: z.string().email().min(1, {
        message: `Email not provided`,
    }),
    password: z.string().min(1, {
        message: `Password not provided`,
    }),
    companyName: z.string().min(1, {
        message: `Company Name not provided`,
    }),
    phoneNumber: z.string().min(1, {
        message: `Phone not provided`,
    }),
    licenseType: z.enum([
        "Premium",
        "Silver",
        "Gold"
    ]),
});

export default signupPayloadSchema;
