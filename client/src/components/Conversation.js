import '../assets/Conversation.css';
import GetColor from './GetColor';
import moment from 'moment';

const Conversation = ({conversation, userId}) => {
    const name = conversation.members.filter(member => member._id !== userId)[0].name;
    const profileName  = name.split(" ").filter(str => str.length).map(name => name[0].toUpperCase()).join("");
    const bg = GetColor(name[0].toLowerCase());
    return ( 
            <div className="chat-person">
                <div className="profile-image-md" style={{backgroundColor : bg}}>{profileName}</div>
                <div className="message-info">
                    <div className="message-person-name flex capitalize">
                        {name}
                        <span>{moment(conversation.updatedAt).format("LT")}</span>
                    </div>
                    <div className="message-person-text">
                        {conversation.messages[conversation.messages.length-1].text.substring(0,30)}
                    </div>
                </div>
            </div>
     );
}
 
export default Conversation;