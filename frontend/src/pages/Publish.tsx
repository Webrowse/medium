import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    return <div>
        <Appbar />


        <div className="max-w-screen flex justify-center">
            <div className="w-3/5 m-4">
                <div className="">
                    <input onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    className="block w-full p-2 mb-2 text-gray-900 border 
                    border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`${content}`} />
                </div>
                <div>
                    <div className="mb-6">
                        <textarea onChange={(e)=>{
                            setContent(e.target.value)
                        }}
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                            rows={6} placeholder="Enter the text" />
                    </div>
                </div>
                <div>
                    <button onClick={async ()=>{
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        },{
                            headers: {
                                Authorization: `${localStorage.getItem("token")}`,
                            },
                        });
                        navigate(`/blog/${response.data.id}`)
                    }} 
                        type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-15 py-2.5 me-2 mb-2">Post</button>
                </div>
            </div>
        </div>
    </div>
}