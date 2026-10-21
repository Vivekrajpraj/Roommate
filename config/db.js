const mongoose=require("mongoose")

const connectdb=async()=>{
  try{
      await mongoose.connect(process.env.mongodburl)
    console.log("mongo db connected")
  }catch(err){
    console.log("database connetcion failed")
  }
}

module.exports=connectdb