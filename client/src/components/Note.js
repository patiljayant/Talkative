import { Link } from 'react-router-dom'
import '../assets/Note.css'
import GetColor from './GetColor';

const Note = ({connection}) => {
    const profileName  = connection.name.split(" ").filter(str => str.length).map(name => name[0].toUpperCase()).join("");
    const bg = GetColor(connection.name[0].toLowerCase());
    return (
        <div className="notification flex">
            <div className="note-data flex">
                <div className="profile-image-md note-margin" style={{backgroundColor : bg}}>{profileName}</div>
                <div><Link to={"/profile/"+connection._id} className="capitalize">{connection.name}</Link> wants to connet with you.</div>
            </div> 
            <div className="note-icons flex">
                <i className="fas fa-check flex"></i>
                <i className="fas fa-times flex"></i>
            </div>
        </div>
    )
}

export default Note
