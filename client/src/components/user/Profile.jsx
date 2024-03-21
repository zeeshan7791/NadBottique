import { Link } from "react-router-dom";
import "./Profile.css";
import MetaData from "../layout/MetaData";
import { imageLink } from "../../config/config";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${currentUser.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={imageLink + currentUser.avatar}
                alt={currentUser.name}
              />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{currentUser.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{currentUser.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(currentUser.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
