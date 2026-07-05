import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-16 sm:py-20 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Text Section */}
          <div className="text-center lg:text-left">

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
              Find Your{" "}
              <span className="text-yellow-300">
                Dream Property
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-200">
              Buy plots, villas, apartments and commercial properties at the best prices.
            </p>

            {/* Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <Link
                to="/properties"
                className="bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-yellow-500 text-center"
              >
                Explore Properties
              </Link>

              <Link
                to="/contact"
                className="border border-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-black text-center"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">

            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900"
              className="rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-full"
              alt="Hero"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;