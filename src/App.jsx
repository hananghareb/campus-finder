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
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const myrouter = createBrowserRouter([
  { path: "/", element: <RedirectBasd/> }, 

  { path: "/splash", element: <SplashScreen /> },

  {
    path: "/",
    element:  <Layout />,
    children: [
      { path: "home", element: <ProtectedRoute>
<Home />
      </ProtectedRoute>  }, 
      
      // ✅ ما تستخدمش index
      { path: "DetailsUni/:id", element: <ProtectedRoute>
        <DetailsUni /> 
      </ProtectedRoute>},

      { path: "Editprofile", element: <ProtectedRoute>
<EditPro />
      </ProtectedRoute> },

      { path: "universities", element: <ProtectedRoute>
        <Alluni />
      </ProtectedRoute> },
      
      { path: "events", element:<ProtectedRoute>
         <Events />
      </ProtectedRoute> },
      { path: "chat", element: <ProtectedRoute>
        <Chat /> 
      </ProtectedRoute>},
      { path: "contactus", element: <ProtectedRoute>
        <ContactUs />
      </ProtectedRoute> },
      { path: "aboutus", element: <ProtectedRoute>
        <AboutUs />
      </ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute>
        <Profile />
      </ProtectedRoute> },
      { path: "settings", element: <ProtectedRoute>
        <Settings /> 
      </ProtectedRoute>},
      { path: "login", element: 
        <Login />},
      { path: "changepassword", element: <ProtectedRoute>
        <Changepass />
      </ProtectedRoute> },
      { path: "allevents", element: <ProtectedRoute>
        <Allevents />
      </ProtectedRoute> },
      { path: "EventDetails/:id", element: <ProtectedRoute>
        <Detailsevents />
      </ProtectedRoute> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "update-uni/:id", element: <ProtectedRoute>
        <Updateuni /> 
      </ProtectedRoute>},
      { path: "college/:id", element: <ProtectedRoute>
        <Collages />
      </ProtectedRoute> },
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
