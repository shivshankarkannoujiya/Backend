import express from "express"
const app = express()
const port = 3000

app.get("/", function (_, res) {
    res.send("Hello World !")
})

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`)
})


/**
 * TODO:
 * 0. Create a todo app that lets users stors todos on the server
 * 1. Create a http server from scratch in c/c++
 * 2. Create a http server in rust using actix-web
 * 3. Create a http server in golang using the gurrila framework
 * 4. Create a http server in java using spring boot
 */
