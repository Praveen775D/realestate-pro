import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRulerCombined,
  FaMoneyBillWave,
  FaEdit,
  FaArrowLeft,
  FaStar,
} from "react-icons/fa";

import { getPropertyById } from "../services/propertyService";
import Loading from "../components/Loading";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(id);

      if (data.property) {
        setProperty(data.property);
      } else {
        setProperty(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!property) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold">
          Property Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <Link
            to="/properties"
            className="text-blue-600 flex items-center gap-2 mb-3"
          >
            <FaArrowLeft />
            Back
          </Link>

          <h1 className="text-4xl font-bold">
            {property.title}
          </h1>

          <p className="text-gray-500 mt-2">
            {property.location?.city},
            {" "}
            {property.location?.state}
          </p>

        </div>

        <Link
          to={`/edit-property/${property._id}`}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaEdit />
          Edit Property
        </Link>

      </div>

      {/* Images */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {property.images?.length > 0 ? (

          property.images.map((image, index) => (

            <img
              key={index}
              src={image}
              alt=""
              className="w-full h-64 object-cover rounded-xl shadow"
            />

          ))

        ) : (

          <img
            src="https://placehold.co/600x400?text=No+Image"
            alt=""
            className="rounded-xl shadow"
          />

        )}

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Property Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <p className="text-gray-500">
                Property Type
              </p>

              <h3 className="font-semibold">
                {property.propertyType}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Category
              </p>

              <h3 className="font-semibold">
                {property.category}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Area
              </p>

              <h3 className="font-semibold flex items-center gap-2">
                <FaRulerCombined />
                {property.area} Sq.ft
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Price
              </p>

              <h3 className="font-semibold text-green-600 flex items-center gap-2">
                <FaMoneyBillWave />
                ₹{property.totalPrice?.toLocaleString()}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Price / Sq.ft
              </p>

              <h3 className="font-semibold">
                ₹{property.pricePerSqft}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Status
              </p>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {property.status}
              </span>

            </div>

          </div>

          <div className="mt-8">

            <h3 className="text-xl font-bold mb-3">
              Description
            </h3>

            <p className="text-gray-600 leading-8">
              {property.description}
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Office Contact
            </h2>

            <p className="flex items-center gap-2 mb-3">
              <FaPhone />
              {property.office?.phone}
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope />
              {property.office?.email}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Location
            </h2>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt />
              {property.location?.address}
            </p>

            <p className="mt-2">
              {property.location?.city},
              {" "}
              {property.location?.state}
            </p>

            <p>
              {property.location?.pincode}
            </p>

          </div>

          {property.featured && (

            <div className="bg-yellow-100 rounded-xl p-5 flex items-center gap-3">

              <FaStar className="text-yellow-500" />

              <span className="font-bold">
                Featured Property
              </span>

            </div>

          )}

        </div>

      </div>

      {/* Amenities */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Amenities
        </h2>

        <div className="flex flex-wrap gap-3">

          {property.amenities?.map((item, index) => (

            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
            >
              {item}
            </span>

          ))}

        </div>

      </div>

    </div>
  );
}

export default PropertyDetails;