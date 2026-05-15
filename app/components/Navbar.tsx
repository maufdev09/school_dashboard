import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Image src="/search.png" alt="Search" width={20} height={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none focus:ring-2 "
        />
      </div>
      <div className="">
        <div className="bg-white rounded-full">
          <Image src="/message.png" alt="Message" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
