const TestimonialSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Ce que dit notre public
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des spectateurs conquis par nos précédentes productions
          </p>
          <div className="mt-6 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Sophie Martin",
              quote:
                "Une mise en scène audacieuse et des comédiens talentueux. J'ai été transportée du début à la fin !",
            },
            {
              name: "Thomas Leroy",
              quote:
                "DOUBLE JEU réussit toujours à me surprendre. Leur interprétation des classiques est à la fois respectueuse et innovante.",
            },
            {
              name: "Émilie Dubois",
              quote:
                "Un moment magique en famille. Les enfants ont adoré et nous aussi ! Nous reviendrons sans hésiter.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="text-red-600 text-4xl mb-4">"</div>
              <p className="italic text-gray-600 mb-6 text-lg">
                {testimonial.quote}
              </p>
              <p className="font-semibold text-gray-900">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;