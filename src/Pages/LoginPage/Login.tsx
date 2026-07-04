import React, { useContext, useEffect, useState } from "react";
import visibility from "../../assets/visibility_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import nonVisibility from "../../assets/visibility_off_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import "./Login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Autheciator";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState("");
  const [logged, setlogged] = useState("");
  const [offline, setOffline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
    document.title = "Login";
  }, []);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setlogged("");
    setIsLoading(true);
    if (!isOnline) {
      setOffline("You are Offline, connect to the internet!");
      setIsLoading(false);
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    if (email.trim().length === 0) {
      alert("Remove those gaps niggas!");
      setIsLoading(false);
      return;
    }

    try {
      await login(email.trim(), password);
      setlogged("Welcome back!");
      console.log("Successful login");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      {!isOnline && (
        <div className="offline-notification">
          You are currently offline. Please check your internet connection to
          login.
        </div>
      )}
      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
          <button className="error-close" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}
      {logged && (
        <div className="logged-banner">
          <span className="logged-icon">✓</span>
          <span className="logged-message">{logged}</span>
          <button className="logged-close" onClick={() => setlogged("")}>
            ✖
          </button>
        </div>
      )}
      {offline && (
        <div className="offline-banner">
          <span className="offline-icon">✓</span>
          <span className="offline-message">{offline}</span>
          <button className="offline-close" onClick={() => setOffline("")}>
            ✖
          </button>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h2>Welcome</h2>
          <p>
            Where the scroll never sleeps and your stories steal the spotlight,
            welcome to your world.
          </p>
          <span>Don't have an account?</span>
          <Link to="/Register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                id="showPasswd"
                className="password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? visibility : nonVisibility}
                  alt="show password"
                />
              </button>
            </div>
            <Link to="/Register">Register</Link>
            <a href="#">Forgot Password?</a>
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-branches">
                  <div className="branch"></div>
                  <div className="branch"></div>
                  <div className="branch"></div>
                  <div className="branch"></div>
                  <div className="branch"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
