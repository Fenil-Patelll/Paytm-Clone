import { useState , useEffect} from "react";
import { AppBar } from "../components/AppBar";
import { UserBalace } from "../components/UserBalance";
import { UserLists } from "../components/UserLists";
import axios from "axios";
export const Dashboard = function Dashboard(){
 
    const [balance, setBalance] = useState('')

    useEffect( () => {
        axios.post('http://ec2-18-233-168-76.compute-1.amazonaws.com:3000/api/v1/user/balance',{
          
          userName : localStorage.getItem('userName')
          
        },{ headers : {'authorization': 'Bearer '+ localStorage.getItem('token')}}).then(val=>{
            setBalance(val.data)
        }).catch(e=> {console.log(e)})

      },[balance])

    return(
    <div>
        <AppBar></AppBar>
        <div className="flex flex-col p-5">
        <UserBalace balance={balance}></UserBalace>
        <UserLists></UserLists>
        </div>
    </div>
    );
}


