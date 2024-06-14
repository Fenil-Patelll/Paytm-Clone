export function Button({label, onClick}){
    return(
        <>
          <button onClick={onClick} className="rounded-xl bg-blue-600 text-white h-10 mt-5 hover:bg-blue-700">{label}</button>
        </>
    )
}