import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    }, 
    verified : {
        type : Boolean,
        default : false
    },
    verificationLink : {
        type : String,
        default : null
    },
    connections : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Connection"
    }]
},
{
    timestamps : true
})


const User = mongoose.model("User", userSchema);

export default User;
