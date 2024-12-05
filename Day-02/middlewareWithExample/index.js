import express from "express"
const app = express()
const PORT = 3000


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


app.get("/", calculateRequest, (req, res) => {
    res.send("Hello Ji")
})


app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})