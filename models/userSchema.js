const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true,
       trim:true
    },
    email:{
       type:String,
       required:true,
       unique:true,
       trim:true,
       lowercase:true
    },
    number:{
       type:Number,
       required:true,
       unique:true
    },
    age:{
       type:Number,
       required:true,
        
    },
    gender:{
       type:String,
       required:true
    },  
    password:{
       type:String,
       required:true,    
       select:false
    }
    
},{
       timestamps:true
    })

module.exports=mongoose.model("user",userSchema)