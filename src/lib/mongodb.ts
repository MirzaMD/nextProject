import mongoose from "mongoose"
declare global{
    var mongooseGlobal:{
        conn?:mongoose.Connection | null
        promise?: Promise<mongoose.Connection> | null
    }
}
export async function dbconnect(){
    if(global.mongooseGlobal?.conn)
        return global.mongooseGlobal.conn;
    if(!process.env.MONGO_URL)
        throw new Error("Couldn't locate the MONGO_URL environmental variable");

    global.mongooseGlobal= global.mongooseGlobal || {}

    global.mongooseGlobal.promise=global.mongooseGlobal.promise
    ||
    mongoose.connect(process.env.MONGO_URL,
        {
            dbName:"contactsdb",
            autoIndex:true
        }
    ).then((mongooseInstance)=>mongooseInstance.connection)

    global.mongooseGlobal.conn=await (global.mongooseGlobal.promise)

    return global.mongooseGlobal.conn;
}