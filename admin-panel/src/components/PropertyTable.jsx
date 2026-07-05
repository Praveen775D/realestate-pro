import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaStar,
} from "react-icons/fa";

function PropertyTable({
  properties = [],
  onDelete,
}) {

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          No Properties Found
        </h2>

        <p className="text-gray-400 mt-2">
          Add your first property.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Image
            </th>

            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Type
            </th>

            <th className="p-4 text-left">
              City
            </th>

            <th className="p-4 text-left">
              Area
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-center">
              Featured
            </th>

            <th className="p-4 text-center">
              Status
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {properties.map((property) => (

            <tr
              key={property._id}
              className="border-b hover:bg-slate-50 transition"
            >

              <td className="p-4">

                <img
                  src={
                    property.images?.length
                      ? property.images[0]
                      : "https://placehold.co/120x80?text=No+Image"
                  }
                  alt={property.title}
                  className="w-24 h-16 rounded-lg object-cover border"
                />

              </td>

              <td className="p-4">

                <h3 className="font-semibold">
                  {property.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {property.category}
                </p>

              </td>

              <td className="p-4">
                {property.propertyType}
              </td>

              <td className="p-4">
                {property.location?.city || "-"}
              </td>

              <td className="p-4">
                {property.area} Sq.ft
              </td>

              <td className="p-4 font-semibold text-green-600">
                ₹
                {property.totalPrice?.toLocaleString()}
              </td>

              <td className="p-4 text-center">

                {property.featured ? (

                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                    <FaStar />

                    Featured

                  </span>

                ) : (

                  <span className="text-gray-400">
                    —
                  </span>

                )}

              </td>

              <td className="p-4 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {property.status}
                </span>

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-4">

                  <Link
                    to={`/property/${property._id}`}
                    title="View"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEye size={18} />
                  </Link>

                  <Link
                    to={`/edit-property/${property._id}`}
                    title="Edit"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={18} />
                  </Link>

                  <button
                    onClick={() => onDelete(property._id)}
                    title="Delete"
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PropertyTable;