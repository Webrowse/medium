import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@adarsh23romy/blog-commons";
// Define the types for the Hono instance
type Variables = {
  userId: string;
};

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

export const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

//Place for middleware to verufy and let them pass through
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
        //@ts-ignore
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.text("Unauthorized");
    }
  } catch (e) {
    c.status(401);
    return c.text("You're not logged in");
  }
});
// Blog route for CRUD operations
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid data" });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({
    id: blog.id,
  });
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({ message: "Input incorrect" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const userId = c.get("userId");
  const blog = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});


blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
  
    return c.json({
      blogs,
    });
  });
  
blogRouter.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({ message: "Blog not found" });
    }
    return c.json({
      blog,
    });
  } catch (e) {
    return c.json({ message: "error while fetching posts" });
  }
});


