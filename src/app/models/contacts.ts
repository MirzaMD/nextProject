import mongoose, {Schema, model, models} from "mongoose";

const contactsSchema=new Schema({
    name:{type:String,required:true},
    num:{type:Number,required:true}
},
{timestamps:true, collection:"contacts"}
)

const Contacts=models.Contacts || model("Contacts",contactsSchema)

export default Contacts;