/* eslint-disable react/no-unescaped-entities */
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Loader from "../layout/loader/Loader";
import { myOrderActions } from "../../redux/orderDetails/myOrderSlice";
import { serverURL } from "../../config/config";
import { useEffect } from "react";

const MyOrders = () => {
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const dispatch = useDispatch();

  const { isLoading, myOrders } = useSelector((state) => state.myOrders);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  const showMyOrders = async () => {
    try {
      dispatch(myOrderActions.CREATE_MYORDER_REQUEST());
      const res = await fetch(`${serverURL}/order/my-orders`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(myOrderActions.CREATE_MYORDER_FAIL(data.message));
        return;
      }
      dispatch(myOrderActions.CREATE_MYORDER_SUCCESS(data.orders));
      return;
    } catch (error) {
      dispatch(myOrderActions.CREATE_MYORDER_FAIL(error.message));
    }
  };

  useEffect(() => {
    showMyOrders();
  }, [dispatch, isAuthenticated]);

  let rows = myOrders.map((item) => ({
    itemsQty: item.orderItems.length,
    id: item._id,
    status: item.orderStatus,
    amount: item.totalPrice,
  }));

  return (
    <>
      <MetaData title={`${currentUser.name} - Orders`} />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">
            {currentUser.name}'s Orders
          </Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
