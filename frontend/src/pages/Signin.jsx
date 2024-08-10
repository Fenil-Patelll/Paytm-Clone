import { Heading } from "../components/Heading"
import { Button } from "../components/Button"
import { Inputbox } from "../components/Inputbox"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signin = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return(<>
          <div className="w-full h-dvh bg-slate-200 flex justify-center">
                <div className="w-1/3 my-[14%] flex flex-col p-7 bg-white rounded-xl">
                    <Heading  label={'Sign In'}></Heading>
                    <div className="flex flex-col  mt-6">
                    <Inputbox onChange= {(e) => { setUserName(e.target.value)}} label={'Email'} inputType={'email'} placeHolder={'name@company.com'}></Inputbox>
                    <Inputbox onChange= {(e) => { setPassword(e.target.value)}}  label={'Password'} inputType={'password'} placeHolder={'*********'}></Inputbox>
                    <Button onClick= {async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            "userName": userName,
                            "password": password
                        })
                        console.log(response.status)
                        if(response.status==200){
                            localStorage.setItem("token",  response.data)
                            localStorage.setItem("userName", userName)
                            navigate("/dashboard")
                            console.log("In response success")
                        }                       
                       
                    }} label={'Sign In'}></Button>
                    </div>
                 
                </div>
            </div>
        </>)
}
