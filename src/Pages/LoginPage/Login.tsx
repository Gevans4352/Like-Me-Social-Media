import React, { useContext } from "react";
import "./Login.scss"
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Autheciator";
const Login = ()=>{

    const {login} = useContext(AuthContext);

    const handleLogin  = () =>{
        
        login()
        console.log("Successful login")
    }


    return(
        <div className="login">
            <div className="card">
                <div className="left">
                   <h2>Welcome</h2>
                   <p>
                    Where the scroll never sleeps and your stories steal the spotlight, welcome to your world.
                   </p>
                   <span>Don't have an account?</span>
                   <Link to="/Register">
                   <button>Register</button>
                   </Link>
                </div>
                 <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Enter your username" />
                        <input type="password" placeholder="Enter your password" />
                        <Link to="/">
                          <button onClick={handleLogin} >Login</button>
                        </Link>
                    </form>
                 </div>
            </div>
        </div>
    )
}

export default Login;