
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import MetaData from "../components/layout/MetaData";
import { useEffect } from "react";
import { adminProductsActions } from "../redux/adminProducts/adminProductsSlice";
import { serverURL } from "../config/config";
import Loader from "../components/layout/loader/Loader";
import {toast} from "react-toastify"

const ProductList = () => {
  const dispatch=useDispatch()

 

  const {  products ,isLoading} = useSelector((state) => state.adminAllProducts);
  const showAdminProducts = async () => {
    try {
      dispatch(adminProductsActions.ADMIN_PRODUCT_REQUEST());

      const res = await fetch(`${serverURL}/product/admin-products`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(adminProductsActions.ADMIN_PRODUCT_FAIL(data.message));
        return;
      }
      dispatch(adminProductsActions.ADMIN_PRODUCT_SUCCESS(data.products));
      return;
    } catch (error) {
      dispatch(adminProductsActions.ADMIN_PRODUCT_FAIL(error.message));
    }
  };

  useEffect(() => {
    showAdminProducts();
  }, [dispatch]);

  const deleteProductHandler =async (id) => {
    
    
    try {
      
   
      const res = await fetch(`${serverURL}/product/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message)
        
        return;
      }
      
     dispatch(adminProductsActions.DELETE_PRODUCT_SUCCESS(id));
      toast.success(data.message)

      return;
    } catch (error) {
      toast.error(error)
     
    }
    
  };



  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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

         
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
    <MetaData title={`ALL PRODUCTS - Admin`}/>
 
      <div className="dashboard">
        <SideBar />
       {
        isLoading?<Loader/>: <div className="productListContainer">
        <h1 id="productListHeading">ALL PRODUCTS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
       }
      </div>
    </>
  );
};

export default ProductList;