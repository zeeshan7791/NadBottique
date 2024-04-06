import  { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/loader/Loader";
import { serverURL } from "../config/config";
import { toast } from "react-toastify";
import { userDetailsActions } from "../redux/user/userDetailsSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const params=useParams()
  const userId = params.id;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
 


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        dispatch(userDetailsActions.ADMIN_USERDETAILS_REQUEST());
        const res = await fetch(`${serverURL}/user/details/${userId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
  
        if (data.success === false) {
          dispatch(userDetailsActions.ADMIN_USERDETAILS_FAIL(data.message));
          return;
        }
       
        setName(data.user.name);
        setEmail(data.user.email);
        setRole(data.user.role);
        dispatch(userDetailsActions.ADMIN_USERDETAILS_SUCCESS(data.user));
      } catch (error) {
        dispatch(userDetailsActions.ADMIN_USERDETAILS_FAIL(error.message));
      }
    };
  
    fetchUserDetails();
  }, [dispatch, userId]);
  const updateUserSubmitHandler = async(e) => {
    e.preventDefault();

   
   try {
      setLoading(true);
  
      const response = await fetch(`${serverURL}/user/update-role/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({name,email,role}),
      });
  
      const data = await response.json();
  
      setLoading(false);
  
      if (!data.success) {
        toast.error(data.message);
        return;
      }
  
      toast.success(data.message);
      navigate("/admin/users");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
        {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;