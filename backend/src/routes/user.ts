import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};

export const userRouter = new Hono<{Bindings: Bindings}>();

userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  
      return c.json(token);
    } catch (e) {
      console.log(`error: ${e}`);
    }
  });
  
  //Sign in route checks credentials and returns a JWT if valid, otherwise returns 403
  userRouter.post("/signin", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
  
    if (!user) {
      c.status(403); //unauthenticated
      return c.json({ message: "Invalid credentials" });
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text( jwt );
  }catch (e){
    console.log(e);
    c.status(411);
    return c.text('Invalid')
  }
  });
  