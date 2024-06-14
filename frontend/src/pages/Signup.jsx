import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
export const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassowrd] = useState('')
    const navigate = useNavigate()

    return (
        <>
            <div className="w-full h-dvh bg-slate-200 flex justify-center">
                <div className="w-1/3 my-[7%] flex flex-col p-7 bg-white rounded-xl">
                    <Heading  label={'Sign Up'}></Heading>
                    <div className="flex flex-col  mt-6">
                    <Inputbox onChange = {e => {setFirstName(e.target.value)}} label={'First Name'} inputType={'text'} placeHolder={'Your First Name'}></Inputbox>
                    <Inputbox onChange = {e => {setLastName(e.target.value)}} label={'Last Name'} inputType={'text'} placeHolder={'Your Last Name'}></Inputbox>
                    <Inputbox onChange = {e => {setUserName(e.target.value)}} label={'Email'} inputType={'email'} placeHolder={'name@company.com'}></Inputbox>
                    <Inputbox onChange = {e => {setPassowrd(e.target.value)}} label={'Password'} inputType={'password'} placeHolder={'*********'}></Inputbox>
                    <Button onClick = {async () => {
                        console.log("In button press")
                        const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                            userName,
                            firstName,
                            lastName,
                            password
                        });
                        console.log(response.status)
                        if(response.status == 201){
                          console.log("In signup success")  
                          navigate("/Signin")
                        }   
                    }} label={'Create an Account'}></Button>
                    <h3 className="mt-4">Already Have an Account? Click <Link className="underline text-blue-500" to={'/Signin'}>Here</Link> </h3>
                    </div>
                </div>
            </div>
        </>

    )
}