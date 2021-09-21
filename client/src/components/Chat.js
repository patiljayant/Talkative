import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import '../assets/Chat.css';
import { addMessage, getConversation, setCurrentConversation } from '../redux/chat/chatActions';
import Conversation from './Conversation';
import GetColor from './GetColor';
import Message from './Message';



const Chat = ({props,showMessages,showChats}) => {
    const [text, setText] = useState("");
    const data = useSelector(state => state);
    const conversation = data.conversation.conversation;   
    const dispatch = useDispatch();
    const currentConversation = data.conversation.currentConversation;
    const sender = currentConversation?.members.filter(m => m._id !== data.user.userInfo.userId)[0];
    const [reply, setReply] = useState(null);
    const [padding, setPadding] = useState(0);
    const [scrollToMessage, setScrollToMessage] = useState(null);
    const scrollRef = useRef();
    const handleSend = (e) => {
        e.preventDefault();
        dispatch(addMessage({
            token : data.user.userInfo.token,
            messageInfo : {
                sender : data.user.userInfo.userId,
                text : text,
                conversationId : currentConversation._id,
                replyTo : reply ? reply._id : null
            }
        }));
        setText("");
        setReply(null);
    }

    const handleLink = (id) => {
        if(id !== props.match.params.id)
            props.history.push('/chat/'+id);
    }

    useEffect(()=>{  
        if(scrollToMessage)
            document.getElementById(scrollToMessage).scrollIntoView({ behavior: "smooth" });
    },[scrollToMessage])

    useEffect(()=>{  
        dispatch(getConversation(data.user.userInfo.token));
    },[data.user.userInfo.token, dispatch])
    useEffect(()=>{
        if(props.match.params.id)
            dispatch(setCurrentConversation(conversation?.filter(c => c._id === props.match.params.id)[0]));
        else
            dispatch(setCurrentConversation(null))
    },[props.match.params.id, conversation, dispatch]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [currentConversation?.messages]);

    useEffect(()=>{
        if(document.querySelector(".reply-message"))
          setPadding(document.querySelector(".reply-message")?.clientHeight+5);
        else
          setPadding(5);
    },[reply])
    return ( 
        <>
            <div className="chat">
                {showChats &&
                <div className="chat-persons">
                    <div className="chat-person-head flex">
                    <div className="go-back" onClick={()=>{props.history.push('/home');}}><i className="fas fa-arrow-left"></i></div>
                    <div className="abcxyz">Chats</div>
                    </div>
                    <div className="scroll-this">
                        {
                            conversation && 
                            conversation.filter(c=> c.messages.length > 0).map(c => <div key={c._id} onClick={() => {handleLink(c._id)}} >
                                <Conversation conversation={c} userId={data.user.userInfo.userId}/>
                            </div>)
                        }
                    </div>
                </div>}
                {
                showMessages && (props.match.params.id ?
                <div className="chat-details">
                    <div className="chat-details-head">
                        <div className="go-back" onClick={()=>{props.history.push('/chat');}}><i className="fas fa-arrow-left"></i></div>
                        {props.match.params.id ? <div className="profile-image-sm" style={{backgroundColor : GetColor(sender?.name[0].toLowerCase())}}>{
                            currentConversation && 
                            sender.name.split(" ").filter(str => str.length).map(name => name[0].toUpperCase()).join("")}</div> 
                            : <></>}
                        <div className="chat-details-name capitalize">{currentConversation && sender.name}</div>
                    </div>
                    <div className="chat-details-messages" style={{paddingBottom : padding+"px"}}>

                    { currentConversation && 
                      currentConversation.messages.map(message => {
                        const own = message.sender === data.user.userInfo.userId ? " own" : "";
                        return (
                            <div key={message._id} id={message._id} ref={scrollRef} className={"message-container"+own}>
                                <Message message={message} userId={data.user.userInfo.userId} members={currentConversation.members} setScrollToMessage={setScrollToMessage}/>
                                {own.length ? <i className="fas fa-share" onClick={() => setReply(message)}></i> :
                                              <i className="fas fa-reply" onClick={() => setReply(message)}></i>
                                }
                            </div>
                        )
                      })}
                        
                            {   reply ? <div className="reply-message flex">
                                            <div className="flex">
                                                <i className="fas fa-share reply-icon"></i>
                                                <div className="reply-bar flex"></div>
                                                <div className="reply-info">
                                                    <div className="reply-name capitalize"> 
                                                        {currentConversation?.members.filter(m => m._id === reply.sender)[0].name}
                                                    </div>
                                                    <div className="reply-text">{reply.text}</div>
                                                </div>
                                            </div>
                                            <i className="fas fa-times" onClick={()=>setReply(null)}></i>
                                </div> : <></>}
                        
                        <div className="chat-send">       
                            <form className="message-form" onSubmit={(e) => {handleSend(e)}}>
                                <input name="file-message" id="file-message" className="file" type="file" placeholder=""/>
                                <label htmlFor="file-message" className="message-send-button" ><i className="fas fa-paperclip"></i></label>
                                <textarea name="message" className="message-input" type="text" value={text} placeholder="Type a message . . ." onChange={(e)=>{setText(e.target.value);}}></textarea>
                                <button className="message-send-button" disabled={!text.replace(/\s/g, '').length || !text.length ? true : false} type="send"><i className="fas fa-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                    
                </div> : 
                <div className="chat-alt flex">
                      Start a new conversation or Open the existing one.
                </div>)}
            </div>
        </>
        
     );
}
 
export default Chat;