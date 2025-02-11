import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () =>{
    return <div className="border-b border-slate-200
    flex justify-between px-10 py-4">
        <Link to={'/blogs'}>
        <div className="flex items-center cursor-pointer">
            Medium
        </div>
        </Link>
        <div className="flex">
            <div>
                <Link to={'/publish'}>
                <button type="button" className={`text-white bg-green-700 hover:bg-green-800 
                focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
                text-sm px-5 py-2.5 text-center me-2 mb-2 mr-6`}>Create a Post</button>
                </Link>
            </div>
            <div>
                <Avatar name={"Romy"} size={10}/>
            </div>

        </div>
        
    </div>
}