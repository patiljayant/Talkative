import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
    requester : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    recipient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status : {
        type : Boolean
    }
},{
    timestamps : true
});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;