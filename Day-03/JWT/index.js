import jwt from "jsonwebtoken"
import { z } from "zod"
const JWT_SECRET = "6da8aec7e2ace8ebbc77bc6cb2dfa765"



const inputSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

const signJwt = (username, password) => {

    const response = inputSchema.safeParse({
        username,
        password
    })

    if (!response.success) {
        return null
    }

    const signature = jwt.sign({
        username
    }, JWT_SECRET)
    return signature
}

const decodeJwt = (token) => {
    const decoded = jwt.decode(token)
    if (!decoded) {
        return false
    }
    return true
}

const verifyJwt = (token) => {
    const verified = jwt.verify(token, JWT_SECRET)
    if (verified) {
        return true
    } else {
        return false
    }
}

