import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(cors());

// import router

import userRouter from "./routes/user.routes.js";
import accountRouter from "./routes/account.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

export { app };
