import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const image =
    property.images?.length > 0
      ? property.images[0]
      : "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">

      {/* Image */}

      <div className="relative bg-gray-100 h-72 flex items-center justify-center overflow-hidden">

        <img
          src={image}
          alt={property.title}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status */}

        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">

          {property.status}

        </span>

        {/* Property Type */}

        <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">

          {property.propertyType}

        </span>

      </div>

      {/* Content */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">

          {property.title}

        </h2>

        <p className="text-gray-500 mb-4">

          📍 {property.location?.city}, {property.location?.state}

        </p>

        <div className="grid grid-cols-2 gap-4 mb-5">

          <div>

            <p className="text-gray-400 text-sm">

              Area

            </p>

            <p className="font-semibold">

              {property.area} {property.areaUnit}

            </p>

          </div>

          <div>

            <p className="text-gray-400 text-sm">

              Category

            </p>

            <p className="font-semibold">

              {property.category}

            </p>

          </div>

        </div>

        <div className="flex justify-between items-center mb-6">

          <div>

            <p className="text-gray-400 text-sm">

              Price

            </p>

            <h3 className="text-2xl font-bold text-blue-600">

              ₹{property.totalPrice?.toLocaleString()}

            </h3>

          </div>

        </div>

        <Link
          to={`/property/${property._id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >

          View Details

        </Link>

      </div>

    </div>
  );
}

export default PropertyCard;