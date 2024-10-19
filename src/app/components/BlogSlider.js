'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogSlider({ blogs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [blogsPerView, setBlogsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setBlogsPerView(4); // Large screens
      } else if (window.innerWidth >= 768) {
        setBlogsPerView(2); // Medium screens
      } else {
        setBlogsPerView(1); // Small screens
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize); // Listen for resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(blogs.length / blogsPerView) - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(blogs.length / blogsPerView) - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBlogClick = (blog) => {
    router.push(`/pages/blog/${blog.id}`);
  };

  return (
    <div className="relative flex justify-between items-center w-full px-4">
      <button
        onClick={handlePrevious}
        className="text-white p-2 absolute z-40 bg-yellow-400 left-5 rounded-full hover:scale-110 transition duration-300"
      >
        <span className="text-white font-bold hover:scale-110">&#10094;</span>
      </button>
      <button
        onClick={handleNext}
        className="text-white p-2 absolute z-40 bg-yellow-400 right-5 rounded-full hover:scale-110 transition duration-300"
      >
        <span className="text-white font-bold hover:scale-110">&#10095;</span>
      </button>
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700 space-x-4 ease-in-out py-10"
          style={{ transform: `translateX(-${currentIndex * (100 / blogsPerView)}%)` }}
        >
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="cursor-pointer m-4"
              style={{ width: blogsPerView === 1 ? '100%' : blogsPerView === 2 ? '48%' : '300px', height: blogsPerView === 1 ? '350px' : '400px' }} // Adjust width and height based on screen size
              onClick={() => handleBlogClick(blog)}
            >
              <div className="bg-white rounded-lg hover:shadow-lg hover:shadow-white border-2 hover:border-gray-600 border-gray-500 transition duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="relative pb-56 flex-shrink-0">
                  <img
                    src={`https://solveandwins.advanceaitool.com/uploads/${blog.image}`}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="md:text-lg text-sm font-semibold mb-2 text-gray-900">
                    {blog.title}
                  </h3>
                  <div
                    className="text-gray-700 text-xs md:text-sm overflow-hidden text-ellipsis"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3, // Limit to 3 lines
                      WebkitBoxOrient: 'vertical',
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
