import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Login.css';
import { addError, clearError } from '../redux/error/errorActions';
import { userRegister } from '../redux/user/userActions';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirm, setconfirm] = useState("");
    const [passwordToggler, setPasswordToggler] = useState(false);
    const [loading, setLoading] = useState(false);
    var passwordRef = React.createRef();
    const navbarProps = {...props, scrolled : true}

    const data = useSelector(state => state);
    
    const [error, setError] = useState({
        message: data.messages.message,
        style : {
            top:"-10rem"
        }
    });
    const dispatch = useDispatch();

    
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

    const toggleIcon = passwordToggler ? (
        <div className="password-toggler">
            <i className="fas fa-eye-slash" onClick={()=> {managePasswordVisibility()}}></i>
        </div>
    ) : (
        <div className="password-toggler">
            <i className="fas fa-eye" onClick={()=> {managePasswordVisibility()}}></i>
        </div>
    );

    const submitButton = loading ? (
            <button className="form-button" disabled><i className="fas fa-spinner" ></i></button>
        ) : (
            <button className="form-button">Sign Up</button>
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
        if(password === confirm){
            dispatch(userRegister({
                name : name.split(" ").filter(str => str.length).join(" "),
                email : username,
                password : password
            }));
        }

        else if(password !== confirm){
            dispatch(addError("Password does not match."));
        }

        else{
            dispatch(addError("Please select your role."))
        }
            
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
        <Navbar props={navbarProps} />
        <div className="login">
                <div className="error" style={error.style}>
                    <i className="fas fa-times-circle" onClick={clear}></i>
                    <div>{error.message}</div>
                </div>
            <div className="form-div">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        Sign Up
                    </div>
                    <div className="input-div">
                        <input 
                            type="text" 
                            name="name" 
                            className="form-input" 
                            placeholder="  " 
                            required 
                            onChange={(e)=>{
                                setName(e.target.value);
                            }}
                            />
                        <label htmlFor="name" className="form-label">Name<span>*</span></label>
                        <div className="input-icon"><i className="fas fa-user"></i></div>
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
                        <label htmlFor="email" className="form-label">Email<span>*</span></label>
                        <div className="input-icon"><i className="fas fa-envelope"></i></div>
                    </div>
                    <div className="input-div">
                        <input 
                        type="password" 
                        name="password" 
                        className="form-input" 
                        placeholder="  " 
                        required 
                        onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                        />
                        <label htmlFor="password" className="form-label">Password<span>*</span></label>
                        <div className="input-icon"><i className="fas fa-lock"></i></div>
                    </div>
                    <div className="input-div">
                        <input 
                        type="password" 
                        name="confirm" 
                        ref={passwordRef} 
                        className="form-input" 
                        placeholder="  " 
                        required 
                        onChange={(e)=>{
                                setconfirm(e.target.value);
                            }}
                        />
                        <label htmlFor="confirm" className="form-label">Confirm Password<span>*</span></label>
                        <div className="input-icon"><i className="fas fa-key"></i></div>
                        {toggleIcon}
                    </div>
                    <div className="form-footer">
                        <span><Link to={"/login"}>LogIn Instead ?</Link></span>
                        {submitButton}
                    </div>
                </form>
            </div>
        </div>
        </>
     );
}
 
export default Register;