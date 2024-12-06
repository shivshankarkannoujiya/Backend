import express from "express"
import { connectDB } from "./config/db.js"
import { User } from "./model/user.model.js"
import bcypt from "bcrypt"

const app = express()
const PORT = 3000
app.use(express.json())

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`ERROR: ${error}`)
            process.exit(1)
        })

        app.listen(PORT, () => {
            console.log(`Server is listening at port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`mongoDB connection Error: ${error}`)
        process.exit(1)
    })


app.post("/signup", async (req, res) => {
    const { email, password, name } = req.body

    if (
        [email, password, name].some(field => String(field).trim() === "")
    ) {
        return res
            .status(411)
            .json({
                message: "All fields are required !!"
            })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res
            .status(400)
            .json({
                message: "Username already exist !!"
            })
    }

    // TODO: Hash Password before saving into database
    const hashedPassword = await bcypt.hash(password, 10)

    const user = new User({
        name,
        email,
        password: hashedPassword
    })

    await user.save()

    return res
        .status(200)
        .json({
            message: "User signup Successfully !!"
        })
})


