


import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks";
import { Blogskeleton } from "../components/Blogskeleton";

export const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blog } = useBlog({id:id??""});

    if (loading) {
        return (
        <div>
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />
            <Blogskeleton />

        </div>
        )
    }
    return <div>
        
        <div className="flex justify-center">
            <div>
                {blog? <FullBlog blog={blog}/> : <div>Blog not found</div>}
                
                

            </div>
        </div>
    </div>
}
