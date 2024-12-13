import { z } from "zod";

const signupBody = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(8)
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(8)
})


export { signupBody, signinBody }