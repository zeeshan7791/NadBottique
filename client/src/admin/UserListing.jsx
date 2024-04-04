import  { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import MetaData from "../components/layout/MetaData";
import { allUsersActions } from "../redux/user/adminAllUserSlice";
import { serverURL } from "../config/config";


const UsersList = () => {
  const dispatch = useDispatch();
  const {  allUsers} = useSelector((state) => state.allUsers);
  const showAdminProducts = async () => {
    try {
      dispatch(allUsersActions.ADMIN_ALLUSERS_REQUEST());

      const res = await fetch(`${serverURL}/user/all-users`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(allUsersActions.ADMIN_ALLUSERS_FAIL(data.message));
        return;
      }
      dispatch(allUsersActions.ADMIN_ALLUSERS_SUCCESS(data.users));
      return;
    } catch (error) {
      dispatch(allUsersActions.ADMIN_ALLUSERS_FAIL(error.message));
    }
  };

  useEffect(() => {
    showAdminProducts();
  }, [dispatch]);



  const deleteUserHandler = () => {
    // dispatch(deleteUser(id));
  };

console.log("allUsers---",allUsers)

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
              <div className="buttonWrapper">
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  allUsers &&
  allUsers.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UsersList;