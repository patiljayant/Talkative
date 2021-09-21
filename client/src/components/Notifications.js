import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import '../assets/Notifications.css'
import Note from "./Note"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUserDetails } from "../redux/user/userActions"

const Notifications = (props) => {
    const navbarProps = {...props, scrolled : true};
    const data = useSelector(state => state);
    const dispatch = useDispatch();
    const connections = data.userDetails?.details?.connections?.filter(connection => connection.status === false);
    useEffect(()=>{
        const info = {
            token : data.user.userInfo?.token,
            id : data.user.userInfo?.userId
        }
        dispatch(getUserDetails(info));
    },[dispatch, data.user.userInfo?.userId , data.user.userInfo?.token, data.user.userDetails?.details])
    return (
        <>
            <Navbar props={navbarProps}/>
            <div className="flex">
                <Sidebar />
                <div className="notifications flex">
                {
                    connections?.length ? connections.map(connection => <Note connection={connection.requester} key={connection._id} />) :
                    !data.userDetails?.isLoading &&
                    <div className="notifications-na">
                        No connection requests yet :)
                    </div>
                }
                </div> 
            </div>
        </>
    )
}

export default Notifications
