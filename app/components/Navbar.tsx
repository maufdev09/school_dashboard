import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
      {/* Search */}
      <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-1 ring-gray-300 px-3 py-2">
        <Image src="/search.png" alt="Search" width={18} height={18} />

        <input
          type="text"
          placeholder="Search..."
          className="
            w-full
            md:w-[220px]
            bg-transparent
            outline-none
            text-sm
          "
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center md:justify-end w-full md:w-auto">
        {/* Message */}
        <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ring-1 ring-gray-300">
          <Image src="/message.png" alt="Message" width={18} height={18} />
        </div>

        {/* Notification */}
        <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ring-1 ring-gray-300 relative">
          <Image
            src="/announcement.png"
            alt="Announcement"
            width={18}
            height={18}
          />

          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            1
          </div>
        </div>

        {/* User Info */}
        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-medium">Jhon</span>

          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>

        {/* Avatar */}
        <Image
          src="/avatar.png"
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
