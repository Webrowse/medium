import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

// Define the types for the Hono instance
type Variables = {
    userId: string;
  };
  
type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  
  export const blogRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();
  
//Place for middleware to verufy and let them pass through
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization")||"";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
        c.set("userId", user.id);
        await next();
    } else{
        c.status(403);
            return c.text("Unauthorized")

        
        }
    }catch (e) {
        c.status(401);
        return c.text("Unauthorized")
    }
    
})
// Blog route for CRUD operations
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  })
  return c.json({
    id: blog.id
  })
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  })
  return c.json({
    id: blog.id
  })
});
blogRouter.get("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: body.id,
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


// Add pagination later


blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
  
    return c.json({
      blogs,
    });
});
