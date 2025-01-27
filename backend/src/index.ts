import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
// Connect to your Prisma Client

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
}
const app = new Hono<{Bindings: Bindings}>();

//Sign up route creates an entry and returns a JWT
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app;
