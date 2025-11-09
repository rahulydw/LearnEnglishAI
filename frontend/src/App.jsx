import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ChatLayout from "./Pages/ChatLayout";
import GreetingPage from "./Pages/GreetingPage";
import ChatPage from "./Pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SocketContextProvider from "./context/SocketContextProvider";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/chat",
      element: <ProtectedRoute />, 
      children: [
        {
          element: <SocketContextProvider><ChatLayout /></SocketContextProvider>, 
          children: [
            {
              index: true,
              element: <GreetingPage />,
            },
            {
              path: ":id",
              element: <ChatPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
