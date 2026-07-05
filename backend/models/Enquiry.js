import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(

{

property:{

type:mongoose.Schema.Types.ObjectId,

ref:"Property",

required:true

},

name:{

type:String,

required:true,

trim:true

},

email:{

type:String,

required:true,

trim:true

},

phone:{

type:String,

required:true,

trim:true

},

message:{

type:String,

default:""

},

status:{

type:String,

enum:[
"New",
"Contacted",
"Closed"
],

default:"New"

}

},

{

timestamps:true

}

);

export default mongoose.model(
"Enquiry",
enquirySchema
);