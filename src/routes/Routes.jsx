import { createBrowserRouter } from "react-router";
import Roots from "../lauout/Roots";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgetPassword from "../pages/ForgetPassword";
import UserProfile from "../pages/UserProfile";
import PrivateRoutes from "./PrivateRoutes";
import SendCourier from "../pages/SendCourier";
import ViewAllCouriers from "../pages/ViewAllCouriers";
import ChangePassword from "../pages/ChangePassword";
import AdminProtected from "./AdminProtected";
import RiderProtected from "./RiderProtected";
import AdminLayout from "../lauout/AdminLayout";
import AllCouriers from "../pages/admin/AllCouriers";
import All_Request from "../pages/admin/All_Request";
import AllRider from "../pages/admin/AllRider";
import SearchRider from "../pages/admin/SearchRider";
import AssignRider from "../pages/admin/AssignRider";
import FIndCoustomer from "../pages/admin/FIndCoustomer";
import RiderLayout from "../lauout/RiderLayout";
import AllOrder from "../pages/rider/AllOrder";
import CompleteOrder from "../pages/rider/CompleteOrder";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots/>,
    children:[
        {
            path:"/",
            element: <Home/>
        },
        {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/forget-password",
        element: <ForgetPassword/>
      },
      {
        path: '/user/profile',
        element:<PrivateRoutes> <UserProfile /> </PrivateRoutes>
      },
      {
        path: '/create-courier',
        element: <PrivateRoutes> <SendCourier/> </PrivateRoutes>
      },
      {
        path: '/view-all-couriers',
        element: <PrivateRoutes> <ViewAllCouriers/> </PrivateRoutes>
      },
      {
        path: '/change-password',
        element: <PrivateRoutes> <ChangePassword/> </PrivateRoutes>
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminProtected><AdminLayout/></AdminProtected>,
    children: [
      {
        path: 'all-courier',
        element: <AllCouriers/>
      },
      {
        path: 'all-request',
        element: <All_Request/>
      },
      {
        path: 'all-rider',
        element: <AllRider/>
      },
      {
        path: 'search-rider',
        element: <SearchRider/>
      },
      {
        path: 'assign-rider',
        element: <AssignRider/>
      },
      {
        path: 'find-coustomer',
        element: <FIndCoustomer/>
      }
    ]
  },
  {
    path: '/rider',
    element: <RiderProtected><RiderLayout/> </RiderProtected>,
    children:[
      {
        path: 'all-order',
        element: <AllOrder/>
      },
      {
        path: 'complete-order',
        element: <CompleteOrder/>
      }
    ]
  }
]);

export default router;