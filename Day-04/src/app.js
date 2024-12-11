import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        Credential: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

//importing routers
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import courseRouter from "./routes/course.routes.js"

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

export { app };
