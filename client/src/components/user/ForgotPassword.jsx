import { useState } from "react";
import "./ForgotPassword.css";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";
import { serverURL } from "../../config/config";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { token } = useSelector((state) => state.user);
  console.log(token, "token-----");
  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("hello");
      const res = await fetch(`${serverURL}/user/forget/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      if (data.success === true) {
        toast.success(data.message);
        // navigate(`/password/reset/${token}`);
      }
    } catch (error) {
      setLoading(false);

      toast.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
