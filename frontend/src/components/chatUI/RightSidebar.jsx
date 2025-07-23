import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { MdBookmarkBorder, MdMicNone } from "react-icons/md";
import { Button } from '../ui/button';

const RightSidebar = () => {
    const [rightPaneltab, setRightPaneltab] = useState("friend");
    return (
        <div className='hidden h-full w-[350px] border-l-1 border-gray-300/80 lg:flex flex-col rounded-tl-md rounded-bl-md select-none bg-[#fff]'>
            {/* Title */}
            <div className='w-[90%] h-[60px] flex flex-col'>
                <span className='text-2xl text-gray-900/80 font-tinos font-semibold ml-5'>Quick Access</span>
                <p className="text-base md:text-md text-gray-900/70 ml-5 font-playfair font-semibold">Navigate your most-used features quickly.</p>
            </div>

            <hr className='w-full h-[1px] bg-gray-300/70' />

            {/* Search Box */}
            <div className='w-[90%] mx-auto my-4 flex justify-center items-center gap-2 px-3 py-2 bg-gray-200/70 rounded-2xl'>
                <FiSearch className='w-[25px] h-[25px] text-gray-500 hover:text-blue-400 font-semibold font-tinos cursor-pointer' />
                <input type="search" placeholder='Search friends...' className='w-full bg-transparent text-gray-500 tracking-wide outline-none border-none' />
            </div>

            {/* Tabs */}
            <div className='w-[90%] h-[50px] mx-auto bg-gray-300/50 py-3 px-2 flex justify-center items-center rounded-3xl text-gray-800/80 font-semibold font-tinos'>
                <span className={`w-1/2 text-center py-2 cursor-pointer ${rightPaneltab === "friend" ? 'bg-white rounded-3xl text-blue-600' : ''}`} onClick={() => setRightPaneltab("friend")}>Friends</span>
                <span className={`w-1/2 text-center py-2 cursor-pointer ${rightPaneltab === "groups" ? 'bg-white rounded-3xl text-blue-600' : ''}`} onClick={() => setRightPaneltab("groups")}>Groups</span>
            </div>

            {/* This will now take full remaining height */}
            <div className='flex-1 w-[90%] mx-auto my-4 overflow-auto'>
                {(rightPaneltab === "friend") ? (<p>Friends List</p>) : (<p>Groups List</p>)}
            </div>

            {/* Footer Section */}
            <div className='w-[90%] mx-auto h-[120px] flex flex-col justify-center items-center gap-4'>

                {/* Roleplay Button */}
                <Button className="w-full py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 cursor-pointer">
                    <MdMicNone className="mr-2 w-20 h-15" />
                    <span className="text-lg font-semibold tracking-wide font-playfair">Start Roleplay</span>
                </Button>

                {/* Saved Chats Button */}
                <Button className="w-full py-4 bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 cursor-pointer">
                    <MdBookmarkBorder className="mr-2 w-30 h-15" />
                    <span className="text-lg font-semibold tracking-wide font-playfair">Saved Chats</span>
                </Button>
            </div>
        </div>
    )
}

export default RightSidebar