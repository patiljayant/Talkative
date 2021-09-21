import Message from '../models/MessageModel.js';
import Conversation from '../models/ConversationModel.js';

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.userId] },
        }).populate("members").populate("messages").populate({
            path: 'messages',
            populate: { path: 'replyTo' }
          });
        res.status(200).send(conversation);
      } 
      catch (err) {
        res.status(400).send({message : "Something went wrong. Please try after some time."});
      }
}

export const addConversation = async (req, res) => {
    try{
        let conversation = await Conversation.findOne({
            members : [req.userId, req.body.receiverId]
        }).populate("members");
        if(!conversation){
            const newConversation  = new Conversation({
                members : [
                    req.userId,
                    req.body.receiverId
                ]
            });
            conversation = await newConversation.save();
        }
        res.status(200).send(conversation);
    }
    catch(error){
        res.status(400).json({message : "Error building the connection. Please try after some time."});
        // res.status(400).json({ message : error.message });
    }
}

export const addMessage = async (req, res) => {
    try{
        const newMessage = new Message({
            text : req.body.text,
            sender : req.body.sender,
            replyTo : req.body.replyTo
        });
        const message = await newMessage.save();
        let foundConversation = await Conversation.findOne({_id : req.body.conversationId});
        // foundConversation.messages.push(message._id);
        foundConversation.messages = [...foundConversation.messages, message._id];
        const conversation = await foundConversation.save();
        const data = await conversation.populate("members")
                                       .populate("messages")
                                       .populate({
                                        path: 'messages',
                                        populate: { path: 'replyTo' }
                                      })
                                       .execPopulate();
        res.status(200).send(data);
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
}