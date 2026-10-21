const mongoose=require('mongoose')



const chatSchema= mongoose.Schema({
    members:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
              ref: "User",
        required: true,
        }],
     isGroup: {
      type: Boolean,
      default: false,
    },

    groupName: {
      type: String,
      default: "",
    },

    lastMessage: {
      type: String,
      default: "",
    },
       
    }

},{timestamps:true})

module.exports= mongoose.model("chat",chatSchema)