"use client";

import { useState, useEffect } from 'react';
import {
  FaSignOutAlt,
  FaChevronDown,
  FaUsers,
  FaUserShield,
  FaListAlt,
  FaBlog,
  FaTrophy,
  FaGift,
  FaQuestion,
  FaBuilding,
  FaTags,
  FaPercent,
  FaTicketAlt,
  FaInbox,
  FaFolderOpen,
  FaCog,
  FaQuestionCircle,
  FaSpeakerDeck,
  FaBell,
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      try {
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
      } catch (error) {
        console.error("Invalid token:", error);
        alert('Invalid token. Please log in again.');
        router.push('/admin');
      }
    }
  }, [router]);

  useEffect(() => {
    console.log("userName has been updated:", userName);
  }, [userName]);

  // Define menu items with roles and appropriate icons
  const menuItems = [
    {
      title: "Users",
      path: "/admin/Users",
      icon: <FaUsers className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Admin Users",
      path: "/admin/AdminUser",
      icon: <FaUserShield className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Blog Category",
      path: "/admin/BlogCategory",
      icon: <FaListAlt className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Blogs",
      path: "/admin/Blogs",
      icon: <FaBlog className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Competitions",
      path: "/admin/Competition",
      icon: <FaTrophy className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Results",
      path: "/admin/Results",
      icon: <FaBell className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Prizes",
      path: "/admin/Prize",
      icon: <FaGift className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Questions",
      path: "/admin/Questions",
      icon: <FaQuestion className="h-5 w-5" />,
      roles: ["admin"], // Only admin can see this
    },
    // Uncomment and update icons as needed
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
    //   title: "FAQ's",
    //   path: "/admin/Faqs",
    //   icon: <FaQuestionCircle className="h-5 w-5" />,
    //   roles: ["admin"],
    // },
  ];

  // Define dropdown menu items with roles and appropriate icons
  const dropdownMenuItems = [
    // Example Dropdown
    // {
    //   title: "Settings",
    //   roles: ["admin"],
    //   list: [
    //     {
    //       title: "Profile Settings",
    //       path: "/admin/settings/profile",
    //       icon: <FaCog className="h-4 w-4" />,
    //       roles: ["admin"],
    //     },
    //     // Add more dropdown items as needed
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
          className="rounded-full mx-auto mb-4 w-24 h-24 object-cover"
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
                    <button
                      className="flex items-center p-3 hover:bg-blue-700 rounded-md w-full text-left"
                      aria-label={item.title}
                    >
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
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen[index] ? 'true' : 'false'}
                  >
                    {category.icon && (
                      <span className="mr-3">
                        {category.icon}
                      </span>
                    )}
                    <span className="text-sm font-medium">
                      {category.title}
                    </span>
                    <FaChevronDown
                      className={`h-4 w-4 ml-auto transform transition-transform duration-200 ${
                        isDropdownOpen[index] ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isDropdownOpen[index] && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {category.list.map(
                        (item) =>
                          item.roles.includes(userRole) && (
                            <li key={item.title}>
                              <Link href={item.path} passHref>
                                <button
                                  className="flex items-center p-2 hover:bg-blue-700 rounded-md w-full text-left"
                                  aria-label={item.title}
                                >
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
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none text-left"
              onClick={handleLogout}
              aria-label="Logout"
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
