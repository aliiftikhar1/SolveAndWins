"use client";
import { useState, useEffect } from 'react';
import {
  FaSignOutAlt,
  FaChevronDown,
  FaBuilding,
  FaTags,
  FaBlog,
  FaCog,
  FaQuestionCircle,
  FaPercent,
  FaTicketAlt,
  FaInbox,
  FaFolderOpen,
  FaUser,
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Next.js Link component for smooth transitions

const Sidebar = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const router = useRouter();

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/admin'); // Navigate using Next.js router
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      alert('Login to see the dashboard!');
      router.push('/admin');
    } else {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
      setUserEmail(decodedToken.email);
      setUserRole(decodedToken.role);
      console.log("---DECODED----");
      console.log(
        "Name",
        decodedToken.name,
        "email",
        decodedToken.email,
        "Role",
        decodedToken.role
      );
    }
  }, [router]);

  useEffect(() => {
    console.log("userName has been updated:", userName);
  }, [userName]);

  // Define menu items with roles
  const menuItems = [
    {
      title: "Users",
      path: "/admin/Users",
      icon: <FaUser className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },{
      title: "Admin Users",
      path: "/admin/AdminUser",
      icon: <FaUser className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Competitions",
      path: "/admin/Competition",
      icon: <FaUser className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Questions",
      path: "/admin/Questions",
      icon: <FaUser className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    // {
    //   title: "Companies",
    //   path: "/admin/Companies",
    //   icon: <FaBuilding className="h-5 w-5" />,
    //   roles: ["admin", "sub admin"],
    // },
    // {
    //   title: "Categories",
    //   path: "/admin/Categories",
    //   icon: <FaTags className="h-5 w-5" />,
    //   roles: ["admin", "sub admin"],
    // },
    // {
    //   title: "Offers",
    //   path: "/admin/Offers",
    //   icon: <FaPercent className="h-5 w-5" />,
    //   roles: ["admin", "sub admin"],
    // },
    // {
    //   title: "Category Coupon",
    //   path: "/admin/Category_Coupon",
    //   icon: <FaTicketAlt className="h-5 w-5" />,
    //   roles: ["admin", "sub admin"],
    // },
    // {
    //   title: "Submissions",
    //   path: "/admin/Submittions",
    //   icon: <FaInbox className="h-5 w-5" />,
    //   roles: ["admin"],
    // },
    // {
    //   title: "Blog Categories",
    //   path: "/admin/BlogCategories",
    //   icon: <FaFolderOpen className="h-5 w-5" />,
    //   roles: ["admin", "sub admin"],
    // },
    // {
    //   title: "Blogs",
    //   path: "/admin/Blogs",
    //   icon: <FaBlog className="h-5 w-5" />,
    //   roles: ["admin", "sub admin"],
    // },
    // {
    //   title: "FAQ's",
    //   path: "/admin/Faqs",
    //   icon: <FaQuestionCircle className="h-5 w-5" />,
    //   roles: ["admin"],
    // },
  ];

  // Define dropdown menu items with roles
  const dropdownMenuItems = [
    // {
    //   title: "CouponRI",
    //   roles: ["admin"], 
    //   list: [
    //     {
    //       title: "Settings",
    //       path: "/dashboard/settings",
    //       icon: <FaCog />,
    //       roles: ["admin"],
    //     },
    //   ],
    // },
  ];

  return (
    <div className="bg-gray-700 text-white w-full min-h-screen flex flex-col">
      {/* Profile Section */}
      <div className="p-6 text-center">
        <img
          src="/logo/logo.jpg"
          alt="Profile"
          className="rounded-full mx-auto mb-4 w-24 h-24"
        />
        <h2 className="text-xl font-semibold">{userName}</h2>
        <p className="text-green-400 mt-1">● Online</p>
      </div>

      {/* Menu Section */}
      <div className="flex-1 p-4 border-t border-gray-600">
        <ul className="mt-6 space-y-3">
          {/* Dynamic Menu Items */}
          {menuItems.map(
            (item) =>
              item.roles.includes(userRole) && (
                <li key={item.title}>
                  <Link href={item.path} passHref>
                    <button className="flex items-center p-3 hover:bg-blue-700 rounded-md w-full">
                      {item.icon}
                      <span className="ml-3 text-sm font-medium">
                        {item.title}
                      </span>
                    </button>
                  </Link>
                </li>
              )
          )}

          {/* Dropdown Menu */}
          {dropdownMenuItems.map(
            (category, index) =>
              category.roles.includes(userRole) && (
                <li key={category.title}>
                  <button
                    className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
                    onClick={() => toggleDropdown(index)}
                  >
                    <span className="ml-3 text-sm font-medium">
                      {category.title}
                    </span>
                    <FaChevronDown
                      className={`h-4 w-4 ml-auto transform transition-transform duration-200 ${
                        isDropdownOpen[index] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isDropdownOpen[index] && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {category.list.map(
                        (item) =>
                          item.roles.includes(userRole) && (
                            <li key={item.title}>
                              <Link href={item.path} passHref>
                                <button className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full">
                                  {item.icon}
                                  <span className="ml-3 text-sm font-medium">
                                    {item.title}
                                  </span>
                                </button>
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </li>
              )
          )}

          {/* Logout Button */}
          <li className="mt-6">
            <button
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
