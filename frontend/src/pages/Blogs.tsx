import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div><Skeleton /></div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>

                {blogs.map(blog =>
                    <BlogCard
                        id={blog.id || "100"}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title || "No Topic"}
                        content={blog.content || "No content"}
                        publishedDate={"20 feb"}
                    />
                )}

            </div>
        </div>
    </div>
}