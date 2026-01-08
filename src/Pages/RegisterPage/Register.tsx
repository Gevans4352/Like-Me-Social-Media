import React, { useEffect, useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import imageOne from "../../assets/User.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import visibility from "../../assets/visibility_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import nonVisibility from "../../assets/visibility_off_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import { setDoc, doc } from "firebase/firestore";
import { uploadImageToCloudinary } from "../../../src/cloudinaryUpload";
import { FiUpload } from "react-icons/fi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [registered, setRegistered] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
    document.title = "Register";
  }, []);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
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

  const handleAvatar = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setRegistered("");
    setIsLoading(true);
    if (!isOnline) {
      alert(
        "You are currently offline. Please check your internet connection and try again."
      );
      setIsLoading(true);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const { username, email, password } = Object.fromEntries(formData) as any;
    console.log(username);

    try {
      let profilePicUrl = "";
      if (avatar.file) {
        profilePicUrl = await uploadImageToCloudinary(avatar.file);
        console.log("Uploaded to Cloudinary:", profilePicUrl);
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        profilePic: profilePicUrl || "",
      });
      setRegistered("You have been Registered! You can now Log in!");
      console.log("User registered successfully:", username);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed: " + err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register">
      {!isOnline && (
        <div className="offline-notification">
          ⚠️ You are currently offline. Please check your internet connection to
          register.
        </div>
      )}
      {registered && (
        <div className="registered-banner">
          <span className="registered-icon">✓</span>
          <span className="registered-message">{registered}</span>
          <button
            className="registered-close"
            onClick={() => setRegistered("")}
          >
            ✖
          </button>
        </div>
      )}
      <div className="card">
        <div className="left">
          <h2>Welcome</h2>
          <p>
            The timeline’s missing your vibe, register now and let the scroll
            feel your presence
          </p>
          <span>Do you have an account?</span>
          <Link to="/Login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <img
              src={avatar.url || imageOne}
              alt="Image Selected"
              className="avatarPreview"
            />
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleAvatar}
            />
            <label htmlFor="file" className="avatarUpload">
              <FiUpload className="fiUpload" />
            </label>
            <input
              name="fullname"
              type="text"
              placeholder="Enter Your Full Name"
            />
            <input name="email" type="email" placeholder="Enter your email" />
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
            />
            <div className="password-container">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                "Register"
              )}
            </button>
            <Link to="/Login">Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
