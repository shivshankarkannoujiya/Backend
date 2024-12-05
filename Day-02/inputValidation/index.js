import express from "express"
import { string, z } from "zod"

const app = express()
const PORT = 3000

// Defining zod schema for kidneys 
const schema = z.array(z.number())
app.use(express.json())



app.post("/health-check", (req, res) => {
    const { kidneys } = req.body
    const response = schema.safeParse(kidneys)

    if (!response.success) {
        return res
            .status(411)
            .json({
                message: `Invalid inputs`
            })
    }

    return res
        .status(200)
        .json({
            message: `Valid Inputs`,
            response
        })

})






// TODO: Write Schemas

/**
    {
    email: string => email,
    password: atleast 8 Character,
    country: "IN", "US"
}
 */

//! solution
/**
    const Schemas = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    country: z.literal("IN").or(z.literal("US")),
    kidneys: z.array(z.number())
})
 */


//! Important
// validator function

const validateInputs = (obj) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })
    return schema.safeParse(obj)
}


app.post("/login", (req, res) => {
    const response = validateInputs(req.body)
    if (!response.success) {
        return res
            .status(411)
            .json({
                message: "Invalid Inputs !!!"
            })
    }

    return res
        .status(200)
        .json({
            message: "Hurray, got Valid inputs",
            response
        })
})


app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})
