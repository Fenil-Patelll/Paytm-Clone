import { useEffect, useState } from "react"
import { Inputbox } from "./Inputbox"
import { UserNameCard } from "./UserNameCard"
import axios from "axios"

export function UserLists(){

    const [filter,setFilter] = useState('')
    const [users, setUsers] = useState([])
    useEffect(()=>{
        axios.post("http://ec2-18-233-168-76.compute-1.amazonaws.com:3000/api/v1/user/bulk?filter=" + filter,{userName: localStorage.getItem('userName')},{headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}}).then(res=> {
        setUsers(res.data)
          
        }).catch(e=> {
            console.log(e)
        })
    },[filter])

    return (<div className="">
        <Inputbox onChange={(e)=>{
            setFilter(e.target.value)
        }} label={'Users'} inputType={'text'} placeHolder={'Search users...'}></Inputbox>
        
        {users.map(user => {             
               return <UserNameCard name={user}></UserNameCard>
            } )}
        
       
    </div>   
    )
} 
