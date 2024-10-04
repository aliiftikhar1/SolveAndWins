import React from 'react';

const testimonials = [
  {
    name: 'Emily Roberts',
    quote:
      '"Solveandwin has reignited my passion for learning. The competitions are fun, and winning prizes is just the cherry on top!"',
    image: 'https://t3.ftcdn.net/jpg/02/94/62/14/360_F_294621430_9dwIpCeY1LqefWCcU23pP9i11BgzOS0N.jpg',
  },
  {
    name: 'Michael Lee',
    quote:
      '"I never thought I could win anything online, but Solveandwin proved me wrong. The community is supportive, and the challenges are well-crafted."',
    image: 'https://plus.unsplash.com/premium_photo-1661508620175-3ae20da61cda?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Sophia Martinez',
    quote:
      '"Participating in the Science Whiz Quiz was thrilling. Not only did I learn new things, but I also won an amazing prize!"',
    image: 'https://www.shutterstock.com/image-photo/business-woman-office-young-beautiful-260nw-201908410.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid gap-12 md:grid-cols-3 px-4">
          {testimonials.map((testimony, index) => (
            <div key={index} className="text-center">
              <img
                src={testimony.image}
                alt={testimony.name}
                className="mx-auto mb-4 h-40 w-40 object-cover rounded-full border-4 border-blue-500"
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
