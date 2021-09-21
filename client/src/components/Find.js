import Sidebar from "./Sidebar"
import UserCard from "./UserCard"
import '../assets/Find.css'
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUsers } from "../redux/user/userActions.js"

const Find = (props) => {
    const data = useSelector(state => state);
    const dispatch = useDispatch();
    const navbarProps = {...props, scrolled : true}
    useEffect(() => {
        if(data.user.userInfo)
        dispatch(getUsers(data.user.userInfo.token))
    }, [data.user.userInfo, dispatch])
    return (
        <>
            <Navbar props={navbarProps}/>
            <div className="flex">
                <Sidebar />
                <div className="flex find-parent ">
                    <div className="home-search">
                    
                    </div>
                    <div className="find flex">
                        {data.users.usersList && 
                            data.users.usersList.map(user => <UserCard key={user._id} user={user} userId={data.user.userInfo.userId} />)
                        }
                    </div>
                </div>   
            </div>
        </>
    )
}

export default Find
