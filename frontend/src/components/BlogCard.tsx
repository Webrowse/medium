import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}
export const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {

    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 p-4 leading-10 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">

            <div className="flex items-center">
                <div className=" pl-2">
                    <Avatar name={authorName} size={4} /></div>
                <div className="text-sm font-extralight pl-2 pt-0.5">
                    {authorName}</div>
                <div className={"flex justify-center flex-col pl-2 pt-0.5"}>
                    <Circle />
                </div>
                <div className="pl-2 text-sm font-light text-slate-500 pt-0.5">
                    {publishedDate}</div>

            </div>
        </div>
        <div className="text-2xl font-semibold pl-2 pt-2">
            {title}
        </div>
        <div className="text-base font-thin pl-2">
            {content.slice(0, 100) + '...'}
        </div>
        <div className="text-slate-500 text-sm font-thin pl-2 pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
    </div>
    </Link>
}

export function Avatar({ name, size = 6}: { name: string; size?: number }) {
    return (
    <div>
        <div 
            className={`relative inline-flex items-center justify-center size-${size} overflow-hidden bg-gray-300 rounded-full`}>
        <span className={`text-xs font-extralight text-gray-900`}>{name[0]}</span>
    </div>
    </div >);
}

export function Circle() {
    return <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
}