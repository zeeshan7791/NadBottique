
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Loader from "../layout/loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();



//   const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { currentUser } = useSelector((state) => state.user);
const loading=false
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
 
  const orders = [
    {
        "orderItems": [
            {
                "pak": "ehh"
            },
            {
                "pak": "ehh"
            }
        ],
        "_id": "849894785978375",
        "orderStatus": "delivered",
        "totalPrice": 586
    },
    {
        "orderItems": [
            {
                "pak": "ehh"
            },
            {
                "pak": "ehh"
            }
        ],
        "_id": "849894785978375",
        "orderStatus": "delivered",
        "totalPrice": 586
    },
    {
        "orderItems": [
            {
                "pak": "ehh"
            },
            {
                "pak": "ehh"
            }
        ],
        "_id": "849894785978375",
        "orderStatus": "delivered",
        "totalPrice": 566
    }
];

let rows = orders.map(item => ({
    itemsQty: item.orderItems.length,
    id: item._id,
    status: item.orderStatus,
    amount: item.totalPrice,
}));

console.log(rows,'rows---------'); // Log rows to check if data is correctly populated


  return (
    <>
      <MetaData title={`${currentUser.name} - Orders`} />

      {loading ? (
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

        <Typography id="myOrdersHeading">{currentUser.name}'s Orders</Typography>
    </div>
      )}
    </>
  );
};

export default MyOrders;
