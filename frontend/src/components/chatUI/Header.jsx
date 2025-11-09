import React from 'react'

const Header = ({ status }) => {
  return (
    <div className='w-full h-[65px] border-b-2 border-gray-200/60 flex items-center px-4'>
      {/* Online Offline Status Track Feedback */}
      {status ? (
        <div className="flex items-center gap-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
          </span>
          <span className="text-green-600 text-sm font-medium">Online</span>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-600"></span>
          </span>
          <span className="text-gray-500 text-sm font-medium">Offline</span>
        </div>
      )}
    </div>
  );
};

export default Header;