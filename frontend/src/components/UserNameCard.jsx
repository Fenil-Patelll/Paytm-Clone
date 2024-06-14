import { Link } from "react-router-dom"

export function UserNameCard({name}){

    
    return (<>
    
    <div  className="flex justify-between my-2">
        <div className="flex">
          <div className="display:block w-7 h-7 border-2 bg-blue-200 border-black rounded-full text-black-500 font-semibold"><h1 className="ml-2">{name.firstName[0].toUpperCase()}</h1></div>
          <h1 className="ml-2 font-semibold">{name.firstName +' '+name.lastName}</h1>
        </div>
        <button className= "text-white bg-slate-800 rounded-md w-[10%]"><Link to={'/sendmoney?id='+name.userName+ '&firstName='+name.firstName+ '&lastName=' +name.lastName}>Send Money</Link></button>
    </div>
    </>)
}