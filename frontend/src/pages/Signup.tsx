import { Quote } from "../components/Quote"


export const Signup = () => {
    return <div>
        <div className="grid grid-cols-2 ">
        
            <div> 
                SignUp 
            </div>
            <div className="invisible md:visible">
                <Quote />
            </div>

        </div>
    </div>
}