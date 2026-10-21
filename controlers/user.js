const User=require("../models/userSchema")
const bcrypt=require('bcryptjs')
const webtoken=require('jsonwebtoken')

const registeruser=async(req,res)=>{
try{
        const {email,name,number,age,gender,password}=req.body
    if(!email || !name || number == null || age == null || !gender || !password){
        return res.status(400).json({
            status:false,
            message:"all fields are required "
        })

    }
        
        const existingUser = await User.findOne({
            $or:[{email},{number}]
        });
        if(existingUser){
            return res.status(409).json({
                status:false,
                message:"User already exist"
            })
        }

         const hashedPassword = await bcrypt.hash(password, 10);

         const user=await User.create({
            name,number,age,gender,email,password:hashedPassword
         })

         return res.status(201).json({
            status:true,
            message:"User Created succesfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                number:user.number,
                age:user.age,
                gender:user.gender
            }
         })

}catch(err){
    console.error("User registration failed:",err)
    if(err.code===11000){
        return res.status(409).json({
            status:false,
            message:"User already exist"
        })
    }
    return res.status(400).json({
        success: false,
        message: "Server error"
    })
}


}


const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const userfind= await User.findOne({email})
        if(!userfind){
            return res.status(400).json({
                status:false,
                message:"USer does not exists"
            })
        }

        const passwordcompare=await bcrypt.compare(password,userfind.password)
        if(!passwordcompare){
           return res.status(400).json({
                status:false,
                message:"User password is not correct"
            })  
        }

        const token =webtoken.sign({email:userfind.email,id:userfind._id,name:userfind.name,gender:userfind.gender,age:userfind.age},process.env.JWT_SECRET,{expiresIn:"1h"})
        
        return res.status(201).json({
            status:true,
            message:"User login succesfully",
            user:{
                id:userfind._id,
                email:userfind.email,
                token:token
            }
         })



    }catch(err){
         return res.status(400).json({
        success: false,
        message: "Server error"
    })
    }

}


const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password");

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.error("Get users error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



module.exports={registeruser,loginuser,getUsers}