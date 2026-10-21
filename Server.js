const express=require("express")
const app=express()
const server=require("http").createServer(app)
const userRoutes=require('./routes/userroutes')


app.use(express.json())

app.use('/api/users',userRoutes)
const io=require('socket.io')(server,{cors:
    {origin:'http:/localhost:3000',
        method:['GET','POST']
    }
})

io.on('connect',(socket)=>{

    console.log("Socket connected:", socket.id);

     socket.on('join-room',(userid)=>{
        console.log(socket.join(userid))
      
   })
   socket.on('send-message',(message)=>{
    socket.to(message.members[0]).to(message.members[1]).emit('recieve-message',message)
      
   })
})

module.exports=server;