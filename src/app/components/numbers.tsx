"use client"
import { useState, useEffect } from "react"
import { FaUserCircle } from "react-icons/fa"
type contactsType={
    _id:string;
    name:string;
    num:number;
}
export function PhoneNumbers({getStatus,setGetStatus}:{getStatus:boolean,setGetStatus:(e:boolean)=>void}){
    const [ details, setDetails ] = useState<contactsType[]|null>(null)
    
    useEffect(()=>{
        async function gettingContacts():Promise<void>{
            const response=await fetch("/api/contacts");
            if(!response.ok){
                throw new Error("Failed to fetch.");
            }
            const data:contactsType[]=await response.json();
            setDetails(data);
        }
        gettingContacts();
        if(getStatus)
            setGetStatus(!getStatus)
    },[getStatus])

   return (
    <section className="w-full bg-[#0a0a0a] text-[whitesmoke] mt-2 flex flex-col gap-y-2">
        {details?.map((v)=>(
            <div key={v._id} className="w-full flex border-2 border-[whitesmoke] rounded-md cursor-pointer">
                <FaUserCircle className="text-5xl sm:text-7xl text-[whitesmoke]"/>
                <div className={`text-md sm:text-2xl flex flex-col gap-y-4`}>
                    <h1 className="font-serif font-extrabold">{v.name}</h1>
                    <h3 className="font-mono font-extrabold">{v.num}</h3>
                </div>
            </div>
        ))}
    </section>
   ) 
}