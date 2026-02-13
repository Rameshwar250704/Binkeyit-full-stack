import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Search from "../components/Search";
import SearchPage from "../pages/SearchPage";
import Register from "../pages/Register";
import Login from "../pages/login";
import UserMenu from "../components/UserMenu";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/profile";
import Address from "../pages/Address";
import MyOrder from "../pages/MyOrder";
import Products from "../pages/Products";
import Sub_Category from "../pages/Sub_Category";
import Category from "../pages/Category";
import UploadProduct from "../pages/UploadProduct";
import AdminPermission from "../layouts/AdminPermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/productDisplayPage";
import CheckoutPage from "../pages/CheckoutPage";


const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"search",
                element:<SearchPage/>
            },
             {
                path:"login",
                element:<Login/>
            },
             {
                path:"register",
                element:<Register/>
            },
            {
                path:"user",
                element:<UserMenuMobile/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                     {
                        path:"address",
                        element:<Address/>
                    },
                     {
                        path:"myorder",
                        element:<MyOrder/>
                    },
                    {
                        path:"Products",
                        element:<Products/>
                    },
                    {
                        path:"Sub_Category",
                        element:<Sub_Category/>
                    },
                    {
                        path:"Category",
                        element:<AdminPermission><Category/></AdminPermission>
                    },
                    {
                        path:"Upload_product",
                        element:<UploadProduct/>
                    }, 
                ]

            },
            
            {
                path:":category",
                children:[
                    {
                        path:":subCategory",
                        element:<ProductListPage/>
                    }
                ]

            },
            {
                path:"product/:product",
                element:<ProductDisplayPage/>
            },
            {
                path:"checkout",
                element:<CheckoutPage/>
            }
        ]
    }
])

export default router;