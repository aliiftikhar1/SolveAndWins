'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FaFacebookF, FaInstagram, FaTwitter, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Correct import
import axios from 'axios'; // Make sure axios is installed

export default function Header() {
  const [user, setUserData] = useState(null); // Updated initial state
  const token = Cookies.get('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userid = decodedToken.id;
        
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`/api/user/${userid}`);
            setUserData(response.data);
            setuserid(user.id);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        
        fetchUsers();
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [token]); // Ensure token is the dependency

  
  const [userid, setuserid] = useState('');
  const finalid = parseInt(userid);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchText(''); // Clear search text when closing search input
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() !== '') {
      router.push(`/pages/search?query=${searchText}`);
      setIsSearchOpen(true); // Hide the search input after submission
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/'); // Navigate using Next.js router
  };

  return (
    <header className="bg-white border-b-2 text-black px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <span className="text-xl font-bold">SolveAndWins</span>
          </a>
        </div>

        {/* Navigation for Desktop */}
        <nav className="hidden lg:flex text-md space-x-8 font-semibold">
          <a href="/" className="hover:text-blue-700">Home</a>
          <a href="/pages/competitions" className="hover:text-blue-700">Competitions</a>
          <a href="/pages/aboutus" className="hover:text-blue-700">About Us</a>
          <a href="/pages/blog" className="hover:text-blue-700">Blogs</a>
          <a href="/pages/reviews" className="hover:text-blue-700">Review</a>
          <a href="/pages/contactus" className="hover:text-blue-700">Contact Us</a>
        </nav>

        {/* User Section */}
        <div className="hidden lg:flex items-center">
          {token ? (
            <div className="flex gap-8 items-center">
              <div>
                <a href={`/pages/profile/${finalid}`}>
                <img
                  src={`https://solveandwins.advanceaitool.com/uploads/${user?.image}`}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                </a>
              </div>
              <div>
                <button
                  className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="h-5 w-5" />
                  <span className="ml-3 text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <a href="/UserLogin">
              <button className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none">
                <FaUserAlt className="h-5 w-5" />
                <span className="ml-3 text-sm font-medium">Login</span>
              </button>
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden text-black focus:outline-none">
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 z-50 right-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            &times; {/* Close icon */}
          </button>
        </div>
        <nav className="p-4 space-y-4 flex flex-col">
          <a href="/" className="hover:text-blue-700">Home</a>
          <a href="/pages/competitions" className="hover:text-blue-700">Competitions</a>
          <a href="/pages/aboutus" className="hover:text-blue-700">About Us</a>
          <a href="/pages/contactus" className="hover:text-blue-700">Contact Us</a>

          {/* Search Option for Mobile */}
          <div className="flex items-center pt-4 border-t mt-4">
            {token ? (
              <button
                className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="h-5 w-5" />
                <span className="ml-3 text-sm font-medium">Logout</span>
              </button>
            ) : (
              <a href="/UserLogin">
                <button className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none">
                  <FaUserAlt className="h-5 w-5" />
                  <span className="ml-3 text-sm font-medium">Login</span>
                </button>
              </a>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
      )}
    </header>
  );
}
