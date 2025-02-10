import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const {loading, Blogs} = useBlogs();

    if (loading) {
        return <div>Loading...</div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className={"justify-center max-w-xl"}>
                <BlogCard
                    authorName={"Adarsh Priya Singh"}
                    title={"Mastering the Art of Full-Stack Development and Web3"}
                    content={`A Comprehensive Guide to Rust, React, and Solana for High-Paying Job Opportunities in 
                    Blockchain Technology: Unlocking the Skills and Strategies Needed to Stand Out in the Web3 Industry.`}
                    publishedDate={"20 feb"} />
                
            </div>
        </div>
    </div>
}