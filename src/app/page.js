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

export default function Home() {

  return (
    <>
    <UserLayout>
    <Herosection/>
    <FeaturedCompetitions/>
    <HowItWorks/>
    <RewardPrizes/>
    <Testimonials/>
    <CallToAction/>
    <LatestNews/>
    <FAQs/>
    <ContactSection/>
    <Footer/>
    </UserLayout>
    </>
  );
}
