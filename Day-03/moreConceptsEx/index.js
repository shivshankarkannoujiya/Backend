import express from "express"

const app = express()
const PORT = 3000
app.use(express.json())

// count request
let reqestCount = 0
app.use((req, res, next) => {
    reqestCount++
    next()
})


// rateLimiter

let numberOfRequestForUser = {}
setInterval(() => {
    numberOfRequestForUser = {}
}, 1000)

app.use((req, res, next) => {
    const userId = req.headers["user-id"]
    if (numberOfRequestForUser[userId]) {
        numberOfRequestForUser[userId]++

        if (numberOfRequestForUser[userId] > 5) {
            return res
                .status(404)
                .json({
                    message: "Limit Exceeded !!"
                })
        } else {
            next()
        }
    } else {
        numberOfRequestForUser[userId] = 1
        next()
    }
})

app.post("/user", (req, res) => {
    return res
        .status(200)
        .json({
            name: "john Doe"
        })
})





app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})