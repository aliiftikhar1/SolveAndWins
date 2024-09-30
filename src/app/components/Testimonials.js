import React from 'react';

const testimonials = [
  {
    name: 'Emily Roberts',
    quote:
      '"Solveandwin has reignited my passion for learning. The competitions are fun, and winning prizes is just the cherry on top!"',
    image: '/images/user1.jpg',
  },
  {
    name: 'Michael Lee',
    quote:
      '"I never thought I could win anything online, but Solveandwin proved me wrong. The community is supportive, and the challenges are well-crafted."',
    image: '/images/user2.jpg',
  },
  {
    name: 'Sophia Martinez',
    quote:
      '"Participating in the Science Whiz Quiz was thrilling. Not only did I learn new things, but I also won an amazing prize!"',
    image: '/images/user3.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          {testimonials.map((testimony, index) => (
            <div key={index} className="text-center">
              <img
                src={testimony.image}
                alt={testimony.name}
                className="mx-auto mb-4 h-24 w-24 object-cover rounded-full border-4 border-blue-500"
              />
              <p className="italic mb-4">{testimony.quote}</p>
              <p className="font-semibold">{testimony.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
