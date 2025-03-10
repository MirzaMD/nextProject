import { dbconnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Contacts from "@/app/models/contacts";

export async function GET(){
    await dbconnect();
    try{
        const data= await Contacts.find({})
      return NextResponse.json(data,{status:200});
    }
    catch(error){
        return NextResponse.json({error:"Failed to GET"},{status:400})
    }
}

export async function POST(req:Request){
    await dbconnect()
try{
    const { name, num } = await (req.json())

    const newEntry=new Contacts({name,num})
    await (newEntry.save());

    return NextResponse.json({message:"Posted in the database"},{status:201})
}
catch(error){
    return NextResponse.json({error:"Couldn;t post in the database"},{status:500})
}
}