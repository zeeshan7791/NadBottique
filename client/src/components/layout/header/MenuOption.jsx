import { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import profile from "../../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imageLink, serverURL } from "../../../config/config";
import { toast } from "react-toastify";
import { userActions } from "../../../redux/user/registerUserSlice";

const MenuOption = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":'unset'}} />, name: `Cart(${cartItems.length})`, func:addToCart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (currentUser.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  async function logoutUser() {
    try {
      dispatch(userActions.signoutUserStart());

      const res = await fetch(`${serverURL}/user/logout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(userActions.signoutUserFailure(data.message));
        return;
      }

      dispatch(userActions.signoutUserSuccess());
      toast.success(data.message);
      navigate("/login");
      return;
    } catch (error) {
      dispatch(userActions.signoutUserFailure(error.message));

      toast.error(error.message);
    }
  }
  function dashboard() {
    navigate("/dashboard");
  }
  function addToCart(){
    navigate("/cart")
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={currentUser.avatar ? imageLink + currentUser.avatar : profile}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default MenuOption;
