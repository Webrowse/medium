import { SignupInput } from "@adarsh23romy/blog-commons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs,
                {
                    headers: { "Content-Type": "application/json" }
                });
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (e) { console.log("error during request", e); }

    }

    return <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center px-5">
            <div>


                <div className="px-10">
                    {/* {JSON.stringify(postInputs)} */}
                    <div className="text-4xl font-extrabold">
                        {type === "signup" ? "Create an account" : "Sign-in an account"}
                    </div>
                    <div className="text-slate-500">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link to={type === "signup" ? "/signin" : "/signup"} className="pl-2 underline">
                            {type === "signup" ? "Login" : "Signup"}
                        </Link>
                    </div>
                </div>
                <div className="pt-2">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Adarsh..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="abc@xyz.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="Enter the Password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />

                </div>
                <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                     focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                      dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type = "text" }: LabelledInputType) {
    return (
    <div>
        <div>
            <label className="block mb-1 text-sm text-black font-bold pt-2">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border 
            border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 mb-3.5" placeholder={placeholder} required />
        </div>
    </div>
    )
}
