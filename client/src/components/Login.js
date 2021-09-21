import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import '../assets/Login.css';
// import { Link } from 'react-router-dom';
import { userLogin } from '../redux/user/userActions'; 
import { clearError } from '../redux/error/errorActions';
const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordToggler, setPasswordToggler] = useState(false);
    const [loading, setLoading] = useState(false);
    var passwordRef = React.createRef();
    const data = useSelector(state => state);
    
    const [error, setError] = useState({
        message: data.messages.message,
        style : {
            top:"-10rem"
        }
    });
    const dispatch = useDispatch();
    const navbarProps = {...props, scrolled : true}
    const toggleIcon = passwordToggler ? (
        <div className="password-toggler">
            <i className="fas fa-eye-slash" onClick={()=> {managePasswordVisibility()}}></i>
        </div>
    ) : (
        <div className="password-toggler">
            <i className="fas fa-eye" onClick={()=> {managePasswordVisibility()}}></i>
        </div>
    );

    useEffect(() => {
        if(data.messages.message)
            setError({
                message : data.messages.message,
                style : {
                    top : "4rem"
                }
            });

        setLoading(data.user.isLoading);
    }, [data.messages.message, data.user.isLoading])
    useEffect(()=>{
        if(data.user.userInfo?.token)
            props.history.push('/home')
    },[data.user, props.history])
    const submitButton = loading ? (
        <button className="form-button" disabled><i className="fas fa-spinner" ></i></button>
    ) : (
        <button className="form-button">Log In</button>
    )

    const managePasswordVisibility = () => {
        const node = passwordRef.current;
        if(passwordToggler){
            node.type="password";
            setPasswordToggler(false);
        }
        else{
            node.type = "text";
            setPasswordToggler(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const m = {
            email : username,
            password : password
        }
        dispatch(userLogin(m))
    }

    const clear = () => {
        setError({
            message:data.messages.message,
            style:{
                top:"-10rem"
            }
        });
        dispatch(clearError());
    }
    return ( 
        <>
            <Navbar props={navbarProps}/>
            <div className="login">
                <div className="error" style={error.style}>
                    <i className="fas fa-times-circle" onClick={clear}></i>
                    <div>{error.message}</div>
                </div>
            <div className="form-div">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        Log In
                    </div>
                    <div className="input-div">
                        <input 
                            type="email" 
                            name="email" 
                            className="form-input" 
                            placeholder="  " 
                            required 
                            onChange={(e)=>{
                                setUsername(e.target.value);
                            }}
                            />
                        <label htmlFor="email" className="form-label">Username</label>
                        <div className="input-icon"><i className="far fa-user"></i></div>
                    </div>
                    <div className="input-div">
                        <input 
                        type="password" 
                        name="password" 
                        ref={passwordRef} 
                        className="form-input" 
                        placeholder="  " 
                        required 
                        onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-icon"><i className="fas fa-lock"></i></div>
                        {toggleIcon}
                    </div>
                    <div className="form-footer">
                    <span>Forgot password ?</span>
                    {submitButton}
                    </div>
                </form>
            </div>
            </div>
        </>
     );
}
 
export default Login;