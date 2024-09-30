import React from 'react';

const newsItems = [
  {
    title: 'Congratulations to Our Latest Winners!',
    snippet:
      'We are thrilled to announce the winners of the Ultimate Trivia Challenge. Check out who made it to the top!',
    link: '#',
  },
  // Add more news items here
];

const LatestNews = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
        <div className="space-y-8">
          {newsItems.map((news, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{news.title}</h3>
              <p className="text-gray-700 mb-4">{news.snippet}</p>
              <a
                href={news.link}
                className="text-blue-600 hover:underline font-semibold"
              >
                Read More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
