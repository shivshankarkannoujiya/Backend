import express from "express";
import cors from "cors"

const app = express();

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ limit: "16kb", extended: true }))
app.use(cors())


// import router 
import rootRouter from "./routes/user.routes.js"
app.use("/api/v1", rootRouter)


export { app }