import { Link } from "react-router-dom"
import '../assets/Connection.css';
import GetColor from "./GetColor";

const Connection = ({connection}) => {
    const profileName  = connection?.name.split(" ").filter(str => str.length).map(name => name[0].toUpperCase()).join("");
    const bg = GetColor(connection?.name[0].toLowerCase());

    return (
        <Link to={'/profile/'+connection._id} className="flex">
            <div className="profile-image-md flex" style={{backgroundColor : bg}}>
                {profileName}
            </div>
            <div className="connection-name capitalize">
                {connection.name}
            </div>
        </Link>
    )
}

export default Connection
