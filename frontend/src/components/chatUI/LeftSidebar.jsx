import React, { useState } from 'react';
import { MdOutlineHome, MdBookmarkBorder } from "react-icons/md";
import { FaComments } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { TbSettings2 } from "react-icons/tb";
import { RiMenuFold2Fill, RiMenuFoldFill } from "react-icons/ri";
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";

const LeftSidebar = ({ userData }) => {
    const [sidebar, setSidebar] = useState(true);
    const sidebarNav = [
        { title: "Home", icon: MdOutlineHome, link: "/chat" },
        { title: "Saved Chats", icon: MdBookmarkBorder, link: "/chats-records" },
        { title: "Vocabulary", icon: IoMdBook, link: "/vocabulary" },
        { title: "Settings", icon: TbSettings2, link: "/settings" },
    ];

    return (
        <div className={`hidden h-full lg:flex flex-col ${sidebar ? 'w-[250px]' : 'w-[60px]'} bg-gray-900 overflow-hidden rounded-tr-md rounded-br-sm transition-all duration-300 ease-linear select-none`}>
            {/* Logo + Branding */}
            <div className={`w-[90%] mx-auto flex ${sidebar ? 'flex-row justify-start items-center gap-5 h-[60px]' : 'flex-col justify-center items-center gap-4 my-2 h-[80px]'}`}>
                <span className={`flex justify-center items-center px-2 w-8 h-8 rounded-md text-white text-xl bg-blue-800 ${sidebar ? 'mx-2' : 'mx-0'}`}>
                    <FaComments />
                </span>
                <div className={`flex ${sidebar ? 'flex-row justify-center items-center gap-5' : 'flex-col justify-center items-center gap-2'}`}>
                    {sidebar && <span className="text-2xl font-lobster tracking-wide text-white/90">Chat-Club</span>}
                    {sidebar ? (
                        <RiMenuFoldFill className="text-2xl text-white/90 cursor-pointer" onClick={() => setSidebar(prev => !prev)} />
                    ) : (
                        <RiMenuFold2Fill className="text-2xl text-white/90 cursor-pointer" onClick={() => setSidebar(prev => !prev)} />
                    )}
                </div>
            </div>

            <hr className="w-full h-[1px] bg-gray-300/60" />

            {/* Menu Items */}
            <div className="flex-1 w-[90%] mx-auto">
                <ul className="w-full flex flex-col items-center my-4">
                    {sidebarNav.map((item, index) => {
                        const Icons = item.icon;
                        return (
                            <li key={index} className={`${sidebar ? 'w-full' : 'w-fit'} my-2 rounded-2xl cursor-pointer`}>
                                {sidebar ? (
                                    <NavLink
                                        to={item.link}
                                        className={({ isActive }) =>
                                            `flex items-center gap-5 px-3 py-2 rounded-2xl ${sidebar ? 'justify-start' : 'justify-center'} ${isActive ? 'bg-blue-700 text-white font-semibold' : 'text-white/90 hover:bg-gradient-to-r hover:from-pink-400 hover:via-red-400 hover:to-yellow-400'}`
                                        }
                                    >
                                        <Icons className="w-[30px] h-[28px]" />
                                        {sidebar && <span className="text-xl font-playfair font-semibold">{item.title}</span>}
                                    </NavLink>
                                ) : (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <NavLink
                                                to={item.link}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-5 px-3 py-2 rounded-2xl ${sidebar ? 'justify-start' : 'justify-center'} ${isActive ? 'bg-blue-700 text-white font-semibold' : 'text-white/90 hover:bg-gradient-to-r hover:from-pink-400 hover:via-red-400 hover:to-yellow-400'}`
                                                }
                                            >
                                                <Icons className="w-[30px] h-[28px]" />
                                                {sidebar && <span className="text-xl font-playfair font-semibold">{item.title}</span>}
                                            </NavLink>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-gray-800 text-white p-2 rounded-md">
                                            {item.title}
                                        </TooltipContent>
                                    </Tooltip>
                                )
                                }
                            </li>
                        );
                    })}
                </ul>
            </div>

            <hr className="h-[1px] bg-gray-300/60" />

            {/* Profile */}
            <div className={`w-[90%] h-[50px] mx-auto flex ${sidebar ? 'justify-start' : 'justify-center'} items-center gap-6 px-2 cursor-pointer`}>
                <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage src={userData?.avatar} />
                    <AvatarFallback>{userData?.name}</AvatarFallback>
                </Avatar>
                {sidebar && <span className="flex justify-center items-center text-xl text-white font-playfair">Rahul Yadav</span>}
            </div>
        </div>
    );
};

export default LeftSidebar;
