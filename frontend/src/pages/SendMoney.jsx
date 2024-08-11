import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";

export const SendMoney = function SendMoney(){
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState();
    const id = searchParams.get('id');
    const firstName = searchParams.get('firstName')
    const lastName = searchParams.get('lastName')
    return(    
            <div className="w-full h-dvh bg-slate-200 flex justify-center">
                <div className="w-1/3 my-[14%] flex flex-col p-7 bg-white rounded-xl">

                    <Heading  label={'Transfer Money'}></Heading>
                    
                 <div className="flex flex-col  mt-12">
                    <div className="flex">
                        <div className="display:block w-7 h-7 border-2 bg-blue-200 border-black rounded-full text-black-500 font-semibold"><h1 className="ml-2">{firstName[0].toUpperCase()}</h1></div>
                        <h1 className="ml-2 font-semibold">{ firstName +' '+ lastName} </h1>
                    </div>
                    <Inputbox onChange={e=> setAmount(e.target.value)}label={'Amount (In Rs)'} inputType={'text'} placeHolder={'Enter amount'}></Inputbox>
                    <Button onClick={async () => {
                            const response =  await axios.post("http://ec2-18-233-168-76.compute-1.amazonaws.com:3000/api/v1/transaction/send",{
                                userName : localStorage.getItem('userName'),
                                recieverId : id,
                                amount : Number(amount)
                            },{headers : {Authorization : 'Bearer ' + localStorage.getItem('token')}})
                            console.log(response.data)
                    }
                    } label={'Send'}></Button>
                  </div>
                </div>
            </div>
    )

}