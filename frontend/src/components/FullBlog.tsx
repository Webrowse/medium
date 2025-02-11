import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";



export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (<div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 pt-12 w-full max-w-screen-xl">
                <div className="col-span-8 ">
                    <h1 className="text-5xl font-extrabold"> {blog.title}</h1>
                    <div className="text-slate-500 pt-4">
                        Post on 11 Feb 2015
                    </div>
                    <p className="text-slate-900 pt-4 text-justify">Content: {blog.content}</p>

                </div>
                <div className="col-span-4 pl-10">
                    Author
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar name={`${blog.author.name || "Anonymous"}`} size={6} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500 w-full">
                                Random data about the author
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
