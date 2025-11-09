import LeftSidebar from '@/components/chatUI/LeftSidebar';
import RightSidebar from '@/components/chatUI/RightSidebar';
import { userContext } from '@/context/UserContextProvider';
import { SocketContext } from '@/context/SocketContextProvider';
import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '@/components/chatUI/Header';

const ChatLayout = () => {
  // User Login data :
  const { user } = useContext(userContext)
  const {isConnected} = useContext(SocketContext);

  return (
      <div className='w-full h-screen flex justify-between items-center box-border'>
        <LeftSidebar userData={user} />
        <main className='flex-1 bg-[#fff] box-border'>
          <Header status={isConnected}/>
          <Outlet />
        </main>
        <RightSidebar />
      </div>
  )
}

export default ChatLayout;