import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import ChatLayout from './Pages/ChatLayout';
import GreetingPage from './Pages/GreetingPage';
import ChatPage from './Pages/ChatPage';

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/chat",
      element: <ChatLayout />,
      children: [
        {
          index: true,
          element: <GreetingPage />
        },
        {
          path: "/chat/:id",
          element: <ChatPage />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={routes} />
  )
}

export default App