const server=require('./Server')
require("dotenv").config();
const connectdb=require('./config/db')






const startServer=async()=>{
    try{
        await connectdb()
        server.listen(3000,()=>{
            console.log("app is listening on port 3000")
        })
    }catch(err){
        console.error("Failed to connect to MongoDB:",err.message)
        process.exitCode=1
    }
}

startServer()