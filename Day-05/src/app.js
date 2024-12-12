import express from "express"

const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ limit: "16kb", extended: true }))


// import router 
import todoRouter from "./routes/todo.routes.js"
app.use("/api/v1/todos", todoRouter)


export {
    app
}