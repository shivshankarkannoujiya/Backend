import express from "express"
const app = express()
const PORT = 3000


app.use(express.json())

/**
 * TODO:
 * Write a middleware to calculateRequest (load that is comming on my Server)
 */

let numberOfRequest = 0
const calculateRequest = (req, res, next) => {
    numberOfRequest++
    console.log(numberOfRequest)
    next()
}


app.get("/", calculateRequest, (_, res) => {
    res.send("Hello Ji")
})


app.post("/health-check", (req, res) => {

    // kidneys = [1,2]
    const kidneys = req.body.kidneys
    const kidneyLength = kidneys.length

    return res
        .status(200)
        .json({
            message: `You have ${kidneyLength} kidneys !!`
        })

})


// global catchtes
app.use((err, req, res, next) => {
    return res
        .status(500)
        .json({
            message: `Sorry, something is up with our server`
        })
})


app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})