export function Inputbox({label,inputType,placeHolder, onChange}){
    return (
        <>
            <div className="flex flex-col my-3">
               <label htmlFor="" className="font-semibold">{label}</label>
               <input onChange={onChange} className="text-lg rounded-md mt-2 border-2 border-grey-900 pl-1 bg-slate hover:border-blue-500" type={inputType} placeholder={placeHolder}/>
            </div>
           
        </>
    )
}