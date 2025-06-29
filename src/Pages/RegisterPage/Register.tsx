import React from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
const Register = ()=>{
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                   <h2>Welcome</h2>
                   <p>
                    The timeline’s missing your vibe, register now and let the scroll feel your presence 
                   </p>
                   <span>Do you have an account?</span>
                   <Link to="/Login">
                   <button>Login</button>
                   </Link>
                </div>
                 <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Enter Your Full Name" />
                        <input type="email" placeholder="Enter your email" />
                        <input type="text" placeholder="Enter your username" />
                        <input type="password" placeholder="Enter your password" />
                        <Link to="/Register">
                        <button>Register</button>
                        </Link>
                    </form>
                 </div>
            </div>
        </div>
    )
}

export default Register;