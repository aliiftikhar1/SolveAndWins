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
  FaComments,
  FaStar,
  FaBell,
  FaTrophyAlt,
} from 'react-icons/fa'; // Use relevant icons for the items
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Corrected import
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
      icon: <FaUsers className="h-5 w-5" />, // Use FaUsers for Users
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Admin Users",
      path: "/admin/AdminUser",
      icon: <FaUserShield className="h-5 w-5" />, // Use FaUserShield for Admin Users
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Blog Category",
      path: "/admin/BlogCategory",
      icon: <FaListAlt className="h-5 w-5" />, // Use FaListAlt for Blog Category
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Blogs",
      path: "/admin/Blogs",
      icon: <FaBlog className="h-5 w-5" />, // Use FaBlog for Blogs
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Reviews",
      path: "/admin/Reviews",
      icon: <FaStar className="h-5 w-5" />, // Use FaStar for Reviews
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Comments",
      path: "/admin/Comments",
      icon: <FaComments className="h-5 w-5" />, // Use FaComments for Comments
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Competitions",
      path: "/admin/Competition",
      icon: <FaTrophyAlt className="h-5 w-5" />, // Use FaTrophyAlt for Competitions
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Results",
      path: "/admin/Results",
      icon: <FaBell className="h-5 w-5" />, // Use FaBell for Results
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Prizes",
      path: "/admin/Prize",
      icon: <FaGift className="h-5 w-5" />, // Use FaGift for Prizes
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Questions",
      path: "/admin/Questions",
      icon: <FaQuestion className="h-5 w-5" />, // Use FaQuestion for Questions
      roles: ["admin"], // Only admin can see this
    },
    {
      title: "Dummy Questions",
      path: "/admin/DummyQuestions",
      icon: <FaQuestion className="h-5 w-5" />, // Use FaQuestion for Dummy Questions
      roles: ["admin"], // Only admin can see this
    },
  ];

  return (
    <div className="bg-gray-700 text-white w-full min-h-screen flex flex-col">
      {/* Profile Section */}
      <div className="p-6 text-center">
        <h1 className='text-3xl font-extrabold'>
          SolveAndWins
        </h1>
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
