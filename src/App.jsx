import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import Verifypassword from './Components/Verifypassword/Verifypassword';
import Createnewpass from './Components/Createnewpass/Createnewpass';
import Register from './Components/Register/Register';
import { Authprovider } from './context/authentication';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Events from './Components/Events/Events';
import ContactUs from './Components/ContactUs/ContactUs';
import Chat from './Components/Chat/Chat';
import AboutUs from './Components/AboutUs/AboutUs';
import { QueryClient, QueryClientProvider } from 'react-query';
import Alluni from './Components/Alluni/Alluni';
import DetailsUni from './Components/DetailsUni/DetailsUni';
import EditPro from './Components/EditPro/EditPro';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import Changepass from './Components/Changepass/Changepass';
import Allevents from './Components/Allevents/Allevents';
import Detailsevents from './Components/DetailsEvents/DetailsEvents';
import Dashboard from './Components/Dashboard/Dashboard';
import Updateuni from './Components/Updateuni/Updateuni';
import CreateUni from './Components/Createuni/Createuni';
import Collages from './Components/Colleges/Colleges';
import SplashScreen from './Components/Splash/Splash';
import RedirectBasd from './Components/RedirectBased/RedirectBased';   

const myrouter = createBrowserRouter([
  { path: "/", element: <RedirectBasd/> }, 

  { path: "/splash", element: <SplashScreen /> },

  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> }, // ✅ ما تستخدمش index
      { path: "DetailsUni/:id", element: <DetailsUni /> },
      { path: "Editprofile", element: <EditPro /> },
      { path: "universities", element: <Alluni /> },
      { path: "events", element: <Events /> },
      { path: "chat", element: <Chat /> },
      { path: "contactus", element: <ContactUs /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
      { path: "login", element: <Login /> },
      { path: "changepassword", element: <Changepass /> },
      { path: "allevents", element: <Allevents /> },
      { path: "EventDetails/:id", element: <Detailsevents /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "update-uni/:id", element: <Updateuni /> },
      { path: "college/:id", element: <Collages /> },
      { path: "create-uni", element: <CreateUni /> },
      { path: "forget", element: <Forgetpassword /> },
      { path: "verify", element: <Verifypassword /> },
      { path: "newpass", element: <Createnewpass /> },
      { path: "register", element: <Register /> },
    ]
  }
]);

export default function App() {
  const clientquery = new QueryClient();

  return (
    <QueryClientProvider client={clientquery}>
      <Authprovider>
        <RouterProvider router={myrouter} />
      </Authprovider>
    </QueryClientProvider>
  );
}
