import React from "react";
import BlogDetailPage from "./mainpage"; // Ensure you are importing the correct component
import UserLayout from "../../../components/userlayout";

export async function generateMetadata({ params }) {
  const baseUrl = 'https://solveandwins.vercel.app';
  // const baseUrl = 'http://localhost:3000';
  console.log("params are: ",params.id);
  try {
    const res = await fetch(`${baseUrl}/api/blog/${params.id}`);
    // console.log("response is : ",res);
    if (!res) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      throw new Error('Failed to fetch blog data');
    }

    const blog = await res.json();

    // Return metadata with the fetched blog title and description
    return {
      title: blog.title || 'SolveAndWins',
      description: blog.description || 'Best website',
      keywords: blog.meta_focusKeyword || "SolveAndWins blogs keyword"
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);

    // Provide fallback metadata in case of an error
    return {
      title: 'SolveAndWins',
      description: 'Best website',
      keywords: 'SolveAndWins blogs keyword'
    };
  }
}

export default function Home({ params }) {
  return (
    <>
    <UserLayout>
      <BlogDetailPage id={params.id} />
      </UserLayout>
    </>
  );
}
