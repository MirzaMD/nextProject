"use client"
import { useState } from "react";
import { PhoneNumbers } from "./components/numbers";
import Link from "next/link";
export default function Home() {
  const [ getStatus, setGEtStatus ] = useState<boolean>(false)
  return (
    <div className="w-screen h-screen flex flex-col items-center">
        <h1 className="text-lg sm:text-3xl font-serif font-bold">My Phonebook</h1>
        <div className="w-full flex justify-end">
        <Link href="/addContact"><button className={`text-md sm:text-lg hover:bg-gray-300 hover:text-black
          text-[whitesmoke] cursor-pointer rounded-lg
          font-bold`}>Add contact</button></Link>
        </div>
        <div className="w-full flex flex-col">
          <PhoneNumbers getStatus={getStatus} setGetStatus={setGEtStatus}/>
        </div>
    </div>
  );
}
