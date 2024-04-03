import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import MetaData from "../components/layout/MetaData";
import { adminOrdersActions } from "../redux/adminProducts/adminOrderSlice";
import { serverURL } from "../config/config";
import { toast } from "react-toastify";



const OrderList = () => {
  const dispatch = useDispatch();



  const {  orders } = useSelector((state) => state.allOrders);
  const showAdminOrders = async () => {
    try {
      dispatch(adminOrdersActions.ADMIN_ORDER_REQUEST());

      const res = await fetch(`${serverURL}/order/all-orders`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(adminOrdersActions.ADMIN_ORDER_FAIL(data.message));
        return;
      }
      dispatch(adminOrdersActions.ADMIN_ORDER_SUCCESS(data));
      return;
    } catch (error) {
      dispatch(adminOrdersActions.ADMIN_ORDER_FAIL(error.message));
    }
  };
 
  useEffect(() => {
    showAdminOrders();
  }, [dispatch]);
  const deleteOrderHandler =async (id) => {
    
    try {
      
   
        const res = await fetch(`${serverURL}/order/delete-order/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
  
        const data = await res.json();

        if (data.success === false) {
          toast.error(data.message)
          
          return;
        }
        
       dispatch(adminOrdersActions.DELETE_ORDER_SUCCESS(id));
        toast.success(data.message)
  
        return;
      } catch (error) {
        toast.error(error)
       
      }
  };



    //   history.push("/admin/orders");
   
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
      flex: 0.4,
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
          <>
          <div className="buttonWrapper">
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList;