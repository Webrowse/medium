import { Quote } from "../components/Quote"
import { SignUpField } from "../components/SignUpField"

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-2 ">
        
            <div> 
                <SignUpField /> 
            </div>
            <div className="invisible md:visible">
                <Quote />
            </div>

        </div>
    </div>
}