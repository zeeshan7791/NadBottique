import { useState } from "react";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { imageLink, serverURL } from "../../config/config";
import { toast } from "react-toastify";
import "./UpdateProfile.css";
import { userActions } from "../../redux/user/registerUserSlice";
const UpdateProfile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatar, setAvatar] = useState(null);

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.updateUserStart());
      const updateData = new FormData();
      updateData.append("name", name);
      updateData.append("email", email);
      updateData.append("avatar", avatar);

      const res = await fetch(`${serverURL}/user/update/${currentUser._id}`, {
        method: "POST",
        body: updateData,
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        dispatch(userActions.updateUserFailure(data.message));
        return;
      }
      if (data.success === true) {
        dispatch(userActions.updateUserSuccess(data.updateUser));

        toast.success(data.message);
        return;
      }
    } catch (error) {
      dispatch(userActions.updateUserFailure(error.message));

      toast.error(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    defaultValue={currentUser.name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    defaultValue={currentUser.email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="Avatar Preview"
                    />
                  ) : (
                    <img
                      src={imageLink + currentUser.avatar}
                      alt="Avatar Preview"
                    />
                  )}

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
