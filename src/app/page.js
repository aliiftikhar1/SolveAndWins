'use client'
import React, { useState, useEffect } from 'react';
import Herosection from './components/Herosection';
import FeaturedCompetitions from './components/FeaturedCompetitions';
import RewardPrizes from './components/RewardPrizes';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import LatestNews from './components/LatestNews';
import FAQs from './components/Faqsection';
import HowItWorks from './components/HowItWorks';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import UserLayout from './components/userlayout';
import BlogSlider from './components/BlogSlider';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  async function fetchBlogs() {
    const response = await fetch('/api/blog');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function loadBlogs() {
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    loadBlogs();
  }, []);


  return (
    <>
    <UserLayout>
    <Herosection/>
    <FeaturedCompetitions/>
    <HowItWorks/>
    <RewardPrizes/>
    <Testimonials/>
    <CallToAction/>
    <BlogSlider blogs={blogs} />
    <FAQs/>
    {/* <ContactSection/> */}
    <Footer/>
    </UserLayout>
    </>
  );
}
