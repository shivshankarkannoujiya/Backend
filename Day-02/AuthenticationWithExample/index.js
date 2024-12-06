import express from "express"
import jwt from "jsonwebtoken"
const JWT_SECRET = "9c3782e43839db1457f94d4516bcf752"

const app = express()
const PORT = 3000

app.use(express.json())

const Users = [
    {
        name: "John Doe",
        username: "john",
        password: "john123"
    },
    {
        name: "Rohan Kumar",
        username: "rohan",
        password: "Rohan123"
    },
    {
        name: "Jayant Kumar",
        username: "jayant",
        password: "jayant123"
    },
]

// TODO: Check whether User exist or not
// NOTE: find()
const userExist = (username, password) => {
    return Users.find(user => user.username === username && user.password === password)
}


app.post("/signin", (req, res) => {
    const { username, password } = req.body

    if (!userExist(username, password)) {
        return res
            .status(403)
            .json({
                message: "User doest not exist in our InMemory DB !!"
            })
    }

    // if User exist
    const token = jwt.sign({ username: username }, JWT_SECRET)

    return res
        .status(200)
        .json({
            message: "User SignIn Successfully",
            token
        })
})


app.get("/users", (req, res) => {
    const token = req.headers.authorization

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const username = decoded.username

        return res
            .status(200)
            .json({
                users: Users.filter(user => user.username !== username),
                message: "User fetched Successfully !!"
            })
    } catch (error) {
        return res
            .status(403)
            .json({
                message: "Invalid token"
            })
    }
})


app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})





