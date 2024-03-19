import { useRef, useState } from "react";
import "./LoginSignUp.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/profile.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/registerUserSlice";
import { serverURL } from "../../config/config";
const LoginSignUp = () => {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(null);

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.signInStart());

      const res = await fetch(`${serverURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginEmail,
          loginPassword,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        dispatch(userActions.signInFailure(data.message));
        return;
      }

      dispatch(userActions.signInSuccess(data.rest));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      dispatch(userActions.signInFailure(error));
    }
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      setUser({ ...user, [e.target.name]: e.target.value });
      setAvatar(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUpData = new FormData();
      signUpData.append("name", name);
      signUpData.append("email", email);
      signUpData.append("password", password);
      signUpData.append("avatar", avatar);

      const res = await fetch(`${serverURL}/user/register`, {
        method: "POST",
        body: signUpData,
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      switchTabs("e", "login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" />
              ) : (
                <img src={profile} alt="Avatar Preview" />
              )}

              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
