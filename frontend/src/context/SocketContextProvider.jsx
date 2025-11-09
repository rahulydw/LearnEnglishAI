// src/context/SocketContextProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import socket from '@/Sockets/socket';
import { userContext } from '../context/UserContextProvider'

export const SocketContext = createContext()

const SocketContextProvider = ({ children }) => {
  const { user } = useContext(userContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (user.googleId) {
      socket.connect();

      // Authenticate user to backend
      socket.emit("new-user", user.googleId);

      // Server confirm karega connection ko
      socket.on("connected-confirmation", (data) => {
        console.log("Server Response:", data.message);
        setIsConnected(true); 
      });

      // Online users list update
      socket.on("online-users", (users) => {
        setOnlineUsers(users);
      });

      // Disconnect or error listener
      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false); 
      });

      // Optional: error listener
      socket.on("connect_error", () => {
        console.log("Connection error");
        setIsConnected(false);
      });

      return () => {
        socket.disconnect();
        socket.off("online-users");
        socket.off("connected-confirmation");
        socket.off("disconnect");
        socket.off("connect_error");
      };
    }

  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider;
