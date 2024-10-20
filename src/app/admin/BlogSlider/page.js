'use client';
import { useEffect, useState } from 'react';

export default function BlogSlider() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [message, setMessage] = useState('');

    // Fetch blog categories and the currently selected category when the component loads
    useEffect(() => {
        const fetchCategoriesAndSelectedCategory = async () => {
            try {
                // Fetch all available categories
                const categoriesResponse = await fetch('/api/blogcategory');
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);

                // Fetch the currently selected category
                const selectedCategoryResponse = await fetch('/api/blogslider');
                const selectedCategoryData = await selectedCategoryResponse.json();
                if (selectedCategoryData && selectedCategoryData.title) {
                    setSelectedCategory(selectedCategoryData.title); // Set the selected category
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCategoriesAndSelectedCategory();
    }, []);

    // Save selected category to the database
    const saveCategoryToDatabase = async (title) => {
        try {
            const response = await fetch('/api/blogslider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }), // Sending selected category title
            });

            if (response.ok) {
                setMessage('Category updated successfully.');
            } else {
                setMessage('Error updating category.');
            }
        } catch (error) {
            console.error('Error saving category:', error);
            setMessage('Error updating category.');
        }
    };

    // Handle category change
    const handleCategoryChange = (event) => {
        const selectedCategoryTitle = event.target.value;
        setSelectedCategory(selectedCategoryTitle);
        saveCategoryToDatabase(selectedCategoryTitle); // Update the selected category in the database
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Select Blog Category
                </h1>
                <div className="mb-6">
                    <label htmlFor="blogCategory" className="block text-gray-700 font-semibold mb-2">
                        Category:
                    </label>
                    <select
                        id="blogCategory"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>

                {message && (
                    <p
                        className={`text-center font-semibold mb-4 ${
                            message.includes('successfully')
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        {message}
                    </p>
                )}

                <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                    onClick={() => saveCategoryToDatabase(selectedCategory)}
                >
                    Save Category
                </button>
            </div>
        </div>
    );
}
