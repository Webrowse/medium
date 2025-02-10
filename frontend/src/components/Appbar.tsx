import { Avatar } from "./BlogCard"

export const Appbar = () =>{
    return <div className="border-b border-slate-200
    flex justify-between px-10 py-4">
        <div className="flex items-center">
            Medium
        </div>
        <div>
            <Avatar name={"Adarsh"} size={6}/>
        </div>
    </div>
}