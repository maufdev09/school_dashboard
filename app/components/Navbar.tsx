import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="Search" width={20} height={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none focus:ring-2 "
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6 justify-end">
        <div className="bg-white  rounded-full w-7 h-7 flex items-center justify-center cursor-pointer ring-[1.5px] ring-gray-300 p-2">
          <Image src="/message.png" alt="Message" width={20} height={20} />
        </div>
        <div className="bg-white  rounded-full w-7 h-7 flex items-center justify-center cursor-pointer ring-[1.5px] ring-gray-300 p-2 relative">
          <Image
            src="/announcement.png"
            alt="Announcement"
            width={20}
            height={20}
          />
          <div className="absolute top-[-10] right-[-10] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </div>
        </div>
        <div className="flex flex-col ">
          <span className=" text-xs leading-3 font-medium">Jhon</span>
          <span className="text-[10px] text-gray-600 text-right">Admin</span>
        </div>
        <Image
          src="/avatar.png"
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
