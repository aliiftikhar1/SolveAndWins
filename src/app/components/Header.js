'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FaFacebookF, FaInstagram, FaTwitter, FaSignOutAlt, FaUser, FaUserAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Header() {
  const token = Cookies.get('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
           <span className='text-xl font-bold'>SolveAndWins</span>
          </a>
        </div>

        {/* Navigation for Desktop */}
        <nav className="hidden lg:flex text-md space-x-8   font-semibold">
          <a href="/" className="hover:text-blue-700">
            Home
          </a>
          <a href="/pages/competitions" className="hover:text-blue-700">
            Competitions
          </a>
          <a href="/pages/categories" className="hover:text-blue-700">
            About Us
          </a>
          <a href="/pages/blog" className="hover:text-blue-700">
            Blogs
          </a>
          <a href="/pages/stores" className="hover:text-blue-700">
            Contact Us
          </a>
        </nav>

        {/* Search Icon and Input for Desktop */}
        <div className="hidden lg:flex items-center">
          {/* {isSearchOpen ? (
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border border-gray-300 rounded-lg py-1 px-3"
                placeholder="Search..."
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-0 top-0 h-full px-3 text-black"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <MagnifyingGlassIcon
              className="h-5 w-5 text-black cursor-pointer hover:text-blue-700"
              onClick={handleSearchToggle}
            />
          )} */}
           {/* <div className="flex space-x-3 ml-4">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <FaFacebookF className="text-black hover:text-blue-700" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <FaTwitter className="text-black hover:text-blue-700" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="text-black hover:text-blue-700" />
    </a>
  </div> */}
 {token ?(<>
    <button
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
  </>):(<>
  <a href='/UserLogin'>
    <button
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
              
            >
              <FaUserAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Login</span>
            </button>
            </a>
  </>)}
 
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none"
        >
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 z-50 right-0 h-full w-64  bg-white shadow-lg transform ${
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
        <a href="/" className="hover:text-blue-700">
            Home
          </a>
          <a href="/pages/competitions" className="hover:text-blue-700">
            Competitions
          </a>
          <a href="/pages/categories" className="hover:text-blue-700">
            About Us
          </a>
          <a href="/pages/stores" className="hover:text-blue-700">
            Contact Us
          </a>

          {/* Search Option for Mobile */}
          <div className="flex items-center pt-4 border-t mt-4">
  {/* <MagnifyingGlassIcon
    className="h-5 w-5 text-black cursor-pointer hover:text-blue-700"
    onClick={handleSearchToggle}
  />
  {isSearchOpen && (
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="ml-2 border border-gray-300 rounded-lg py-1 px-3 w-full"
      placeholder="Search..."
      onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
    />
  )}

  <div className="flex space-x-3 ml-4">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <FaFacebookF className="text-black hover:text-blue-700" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <FaTwitter className="text-black hover:text-blue-700" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="text-black hover:text-blue-700" />
    </a>
  </div> */}
  {token ?(<>
    <button
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
  </>):(<>
    <button
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none"
              
            >
              <FaUserAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Profile</span>
            </button>
  </>)}
 
</div>

        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}
