import {
  FaHome,
  FaUsers,
  FaMapMarkerAlt,
  FaAward,
} from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaHome className="text-4xl text-blue-600" />,
      number: "500+",
      title: "Properties Listed",
    },
    {
      icon: <FaUsers className="text-4xl text-green-600" />,
      number: "1200+",
      title: "Happy Clients",
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-red-600" />,
      number: "25+",
      title: "Cities Covered",
    },
    {
      icon: <FaAward className="text-4xl text-yellow-500" />,
      number: "10+",
      title: "Years Experience",
    },
  ];

  return (
    <section className="bg-slate-100 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold">
            Our Achievements
          </h2>

          <p className="text-gray-500 mt-3">
            Trusted by thousands of customers across India.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl duration-300"
            >

              <div className="flex justify-center mb-5">

                {item.icon}

              </div>

              <h3 className="text-4xl font-bold mb-3">

                {item.number}

              </h3>

              <p className="text-gray-600">

                {item.title}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;