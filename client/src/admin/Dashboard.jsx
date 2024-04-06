import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import MetaData from "../components/layout/MetaData";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { products } = useSelector((state) => state.adminAllProducts);
  const { allUsers } = useSelector((state) => state.allUsers);
  const { orders, totalAmount } = useSelector((state) => state.allOrders);
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{parseInt(totalAmount).toFixed(0)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{allUsers && allUsers.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
