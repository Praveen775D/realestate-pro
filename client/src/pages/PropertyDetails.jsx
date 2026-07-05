import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

import { getPropertyById } from "../services/propertyService";

import Loading from "../components/Loading";

function PropertyDetails() {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    fetchProperty();

  }, []);

  const fetchProperty = async () => {

    try {

      const data = await getPropertyById(id);

      setProperty(data.property || data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <Loading />;

  }

  if (!property) {

    return (

      <div className="text-center py-20">

        <h2 className="text-3xl font-bold">

          Property Not Found

        </h2>

      </div>

    );

  }
  const nextImage = () => {

  if (!property?.images?.length) return;

  setSelectedImage((prev) =>
    prev === property.images.length - 1
      ? 0
      : prev + 1
  );

};

const prevImage = () => {

  if (!property?.images?.length) return;

  setSelectedImage((prev) =>
    prev === 0
      ? property.images.length - 1
      : prev - 1
  );

};

  return (

    <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow">

  <img
    src={
      property.images?.length
        ? property.images[selectedImage]
        : "https://placehold.co/1200x700"
    }
    alt={property.title}
    onClick={() => setShowModal(true)}
    className="w-full h-[650px] object-contain bg-white cursor-zoom-in"
  />

  {property.images?.length > 1 && (

    <>
      <button
        onClick={prevImage}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>
    </>

  )}

</div>

      {/* Image Gallery */}

      {property.images?.length > 1 && (

  <div className="flex gap-4 overflow-x-auto mt-6 pb-2">

    {property.images.map((image, index) => (

      <img
        key={index}
        src={image}
        alt={`Property ${index + 1}`}
        onClick={() => setSelectedImage(index)}
        className={`w-28 h-24 rounded-xl object-cover cursor-pointer border-4 transition-all ${
          selectedImage === index
            ? "border-blue-600"
            : "border-gray-200"
        }`}
      />

    ))}

  </div>

)}

      {/* Header */}

      <div className="mt-8 flex flex-col md:flex-row justify-between gap-6">

        <div>

          <h1 className="text-4xl font-bold">

            {property.title}

          </h1>

          <p className="text-gray-500 mt-2">

            {property.location?.address}

          </p>

          <p className="text-gray-500">

            {property.location?.city},

            {" "}

            {property.location?.state}

          </p>

        </div>

        <div>

          <h2 className="text-4xl text-blue-600 font-bold">

            ₹{property.totalPrice?.toLocaleString()}

          </h2>

        </div>

      </div>

      {/* Property Info */}

      <div className="grid md:grid-cols-4 gap-5 mt-10">

        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="font-semibold">

            Area

          </h3>

          <p>

            {property.area}

            {" "}

            {property.areaUnit}

          </p>

        </div>

        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="font-semibold">

            Type

          </h3>

          <p>

            {property.propertyType}

          </p>

        </div>

        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="font-semibold">

            Category

          </h3>

          <p>

            {property.category}

          </p>

        </div>

        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="font-semibold">

            Status

          </h3>

          <p>

            {property.status}

          </p>

        </div>

      </div>

      {/* Description */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-4">

          Description

        </h2>

        <p className="leading-8 text-gray-600">

          {property.description}

        </p>

      </div>

      {/* Amenities */}

      {

        property.amenities?.length > 0 && (

          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-4">

              Amenities

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {

                property.amenities.map((item, index) => (

                  <div

                    key={index}

                    className="bg-blue-50 rounded-lg p-4"

                  >

                    {item}

                  </div>

                ))

              }

            </div>

          </div>

        )

      }

      {/* Nearby */}

      {

        property.nearbyPlaces?.length > 0 && (

          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-4">

              Nearby Places

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {

                property.nearbyPlaces.map((item, index) => (

                  <div

                    key={index}

                    className="bg-green-50 rounded-lg p-4"

                  >

                    {item}

                  </div>

                ))

              }

            </div>

          </div>

        )

      }

      {/* Contact */}

      <div className="mt-12 bg-gray-100 rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-5">

          Contact Office

        </h2>

        <p>

          Phone :

          {" "}

          {property.office?.phone}

        </p>

        <p>

          Email :

          {" "}

          {property.office?.email}

        </p>

      </div>

      {/* Google Map */}

      {

        property.location?.googleMap && (

          <div className="mt-10">

            <a

              href={property.location.googleMap}

              target="_blank"

              rel="noreferrer"

              className="bg-blue-600 text-white px-8 py-3 rounded-lg"

            >

              Open Google Map

            </a>

          </div>

        )

      }

      {showModal && (

  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

    <button
      onClick={() => setShowModal(false)}
      className="absolute top-6 right-6 text-white text-3xl"
    >
      <FaTimes />
    </button>

    <button
      onClick={prevImage}
      className="absolute left-8 text-white text-4xl"
    >
      <FaChevronLeft />
    </button>

    <img
      src={property.images[selectedImage]}
      alt=""
      className="max-w-[95%] max-h-[90vh] object-contain"
    />

    <button
      onClick={nextImage}
      className="absolute right-8 text-white text-4xl"
    >
      <FaChevronRight />
    </button>

  </div>

)}

    </div>

  );

}

export default PropertyDetails;