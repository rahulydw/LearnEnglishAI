import LeftSidebar from '@/components/chatUI/LeftSidebar';
import RightSidebar from '@/components/chatUI/RightSidebar';
import { userContext } from '@/context/UserContextProvider';
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';

const ChatLayout = () => {
  // User Login data :
  const {user} = useContext(userContext)
  return (
    <div className='w-full h-screen flex justify-between items-center box-border'>
      <LeftSidebar userData={user} />
      <main className='flex-1 bg-[#fff] box-border'>
        <Outlet />
      </main>
      <RightSidebar />
    </div>
  )
}

export default ChatLayout;