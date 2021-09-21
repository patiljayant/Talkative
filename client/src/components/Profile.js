import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import '../assets/Profile.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnectionRequest, getUserDetails } from "../redux/user/userActions";
import Connection from "./Connection";
import GetColor from "./GetColor";

const Profile = (props) => {
    const navbarProps = {...props, scrolled : true}
    const data = useSelector(state => state);
    const token = data.user.userInfo.token;
    const user = data.userDetails?.details?._id === props.match.params.id ? data.userDetails?.details : null;
    const dispatch = useDispatch();
    const profileName  = user?.name.split(" ").filter(str => str.length).map(name => name[0].toUpperCase()).join("");
    const bg = GetColor(user?.name[0].toLowerCase());
    const connections = user?.connections?.filter(connection => connection.status);
    const check = user?.connections?.filter(connection => connection.requester._id === data.user.userInfo.userId || connection.recipient._id === data.user.userInfo.userId);
    const btn = check?.length ? 
                    (check[0].status ? 
                        <div className="profile-connect-btn disconnect flex">Disconnect</div> : 
                        <div className="profile-connect-btn pending flex"><i className="fas fa-clock"></i></div>) : 
                    <div className="profile-connect-btn flex" onClick={()=>dispatch(addConnectionRequest({token : token, id : data.userDetails?.details?._id}))}>Connect</div>
    useEffect(()=>{
        const userData = {
            token : data.user.userInfo.token,
            id : props.match.params.id
        }
        dispatch(getUserDetails(userData));
    },[dispatch, props.match.params.id, data.user.userInfo.token, data.users?.usersList])
    return (
        <>
            <Navbar props={navbarProps}/>
            <div className="flex">
                <Sidebar />
                {user ? 
                    <div className="profile flex">
                    <div className="profile-details flex">
                        <div className="profile-image-xl flex" style={{backgroundColor : bg}}>{profileName}</div>
                        <div className="profile-details-name capitalize">{user.name}</div>
                        <div className="profile-details-mail"><i className="fas fa-envelope"></i> {user.email}</div>
                        {
                            user._id !== data.user.userInfo.userId &&
                            btn
                        }
                        
                        {/* <div className="profile-connect-btn flex">Connect</div> */}
                        {
                            user._id !== data.user.userInfo.userId && btn.props.children === "Disconnect" &&
                            <div className="profile-connect-btn flex" style={{backgroundColor : "blue"}}>Start a Chat</div>
                        }
                    </div>
                    <div className="connections flex">
                        <div className="connections-head">
                            Connections
                        </div>
                        {   connections?.length ?
                            connections.map(connection => {
                                if(data.userDetails?.details?._id === connection.recipient._id)
                                    return <Connection connection={connection.requester} key={connection.requester._id }/>

                                else
                                    return <Connection connection={connection.recipient} key={connection.recipient._id }/>
                                }) :
                            <span>
                                There is nothing to show.
                            </span>
                        }
                    </div>

                </div> : 
                !data.userDetails?.isLoading &&
                <div className="no-user-found flex">
                    The user you are looking for does not exist.
                </div> }
            </div>
        </>
    )
}
 
export default Profile;