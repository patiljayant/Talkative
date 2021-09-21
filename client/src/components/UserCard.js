import { Link } from 'react-router-dom';
import '../assets/UserCard.css'
import GetColor from './GetColor';

const UserCard = ({user, userId}) => {
    const profileName  = user.name.split(" ").filter(str => str.length).map(name => name[0].toUpperCase()).join("");
    const bg = GetColor(user.name[0].toLowerCase());
    const check = user.connections.filter(connection => connection.requester === userId || connection.recipient === userId);
    const btn = check.length ? (check[0].status ? <div className="user-card-connect-btn disconnect flex">Disconnect</div> : <div className="user-card-connect-btn pending flex"><i className="fas fa-clock"></i></div>) : <div className="user-card-connect-btn flex">Connect</div>
    return (
        <div className="user-card flex">
            <Link to={"/profile/"+user._id} className="flex">
                <div className="profile-image-lg flex" style={{backgroundColor :bg}}>{profileName}</div>
                <div className="user-card-name capitalize">{user.name}</div>
            </Link>
            {btn}
        </div>
    )
}

export default UserCard
