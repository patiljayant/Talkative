import '../assets/Message.css';
import moment from 'moment';

const Message = ({message, userId, members, setScrollToMessage}) => {
    const own = message.sender === userId ? " own" : "";
    return (
            <div className={"message" + own}>
                {message.replyTo ? <div className="reply-to flex" onClick={()=> setScrollToMessage(message.replyTo._id)}>
                    <div className="flex">
                        <div className="reply-to-bar flex"></div>
                        <div className="reply-to-info">
                            <div className="reply-to-name capitalize"> 
                                {members.filter(m => m._id === message.replyTo.sender)[0].name}
                            </div>
                            <div className="reply-to-text">{message.replyTo.text} </div>
                        </div>
                    </div>
                </div> : <></>}
                {message.text}
                <span>{moment(message.createdAt).format('LT')}</span>
            </div>
     );
}
 
export default Message;