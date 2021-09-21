import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../assets/Sidebar.css';

const Sidebar = () => {
    const id  = useSelector(state => state.user.userInfo?.userId);
    return ( 
        <>
            <div className="sidebar">
                <NavLink to="/home" className="sidebar-item" activeClassName="selected"><i className="fas fa-home"></i>Home
                <div><div></div></div>
                </NavLink>
                <NavLink to={"/profile/" + id} activeClassName="selected" className="sidebar-item"><i className="fas fa-columns"></i>Profile
                <div><div></div></div>
                </NavLink>
                <NavLink to="/notifications" activeClassName="selected" className="sidebar-item"><i className="fas fa-bell"></i>Notifications
                <div><div></div></div>
                </NavLink>
                <NavLink to="/chat" activeClassName="selected" className="sidebar-item"><i className="fas fa-comments"></i>Chat
                <div><div></div></div>
                </NavLink>
                <NavLink to="/online" activeClassName="selected" className="sidebar-item"><i className="fas fa-wifi"></i>Online
                <div><div></div></div>
                </NavLink>
                <NavLink to="/settings" activeClassName="selected" className="sidebar-item"><i className="fas fa-cog"></i>Settings
                <div><div></div></div>
                </NavLink>
            </div>
        </>
        
     );
}
 
export default Sidebar;
 