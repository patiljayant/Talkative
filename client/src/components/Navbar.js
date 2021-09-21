import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import '../assets/Navbar.css';
import { userLogout } from '../redux/user/userActions';

const Navbar = ({props}) => {
    const token = useSelector(state => state.user.userInfo?.token);
    const dispatch = useDispatch();
    return ( 
        <div className={props.scrolled ? ("navbar active") : ("navbar")}>
            <nav>
                <div className="brand">
                    Talkative
                </div>
                <div className="nav-items-container">{
                    token ? <span className="nav-item" onClick={()=>dispatch(userLogout())}>LOGOUT <i className="fas fa-sign-out-alt"></i></span> :
                    <>
                        <span className="nav-item"><Link to={'/login'}>LOG IN</Link></span>
                        <span className="nav-item"><Link to={'/signup'}>SIGN UP</Link></span>
                    </>}
                </div>
            </nav>
        </div>
     );
}
 
export default Navbar;