import axios from "axios"
import { useEffect } from "react"

export function UserBalace({balance}){
   
    return(<>
      <h1>Your Balace : Rs {balance}</h1> 
    </>)
}