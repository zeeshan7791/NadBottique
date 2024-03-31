import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import MetaData from "../components/layout/MetaData";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              {/* <p>{products && products.length}</p> */}
              <p>50</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>10</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>50</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
