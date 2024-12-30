import { Hono } from "hono";

const app = new Hono();

/*
TODO: Learn
- body, headers, query parameter, middlewares, connecting to Database
c : Contain both (req,res)
*/

// TODO: middleware
const authMiddleware = async (c: any, next: () => Promise<void>) => {
  if (c.req.header("Authorization")) {
    await next();
  } else {
    return c.json({
      message: "You do not have access",
    });
  }
};

// app.use(authMiddleware)

app.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(`Body: `, body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

app.get("/user", async (c) => {
  return c.json({
    username: "Abhi",
    from: "India",
  });
});

export default app;
