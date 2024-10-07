"use client";
import { usePathname } from "next/navigation";
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between bg-gray-700 p-3 mb-5  h-16">
      <div className="flex items-center">
        <div className="text-white text-xl font-bold capitalize ml-5">
          {pathname.split("/").pop() === "Submittions" ? (
            <>
            Submissions
            </>
          ):(
            <>
            {pathname.split("/").pop()}
            </>
          )}
         
        </div>
      </div>
      <div className="flex items-center space-x-6">
        {/* <div className="flex items-center bg-white p-1 rounded-lg h-10">
          <MdSearch className="text-black" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-black ml-2"
          />
        </div>
        <div className="relative text-white">
          <MdOutlineChat size={28} />
        </div>
        <div className="relative text-white">
          <MdNotifications size={28} />
        </div>
        <div className="relative text-white mr-4">
          <MdPublic size={28} />
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
