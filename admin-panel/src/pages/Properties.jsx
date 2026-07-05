import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSyncAlt } from "react-icons/fa";

import {
  getProperties,
  deleteProperty,
} from "../services/propertyService";

import PropertyTable from "../components/PropertyTable";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    const result = properties.filter((property) => {
      return (
        property.title?.toLowerCase().includes(keyword) ||
        property.propertyType?.toLowerCase().includes(keyword) ||
        property.category?.toLowerCase().includes(keyword) ||
        property.location?.city?.toLowerCase().includes(keyword) ||
        property.location?.state?.toLowerCase().includes(keyword)
      );
    });

    setFilteredProperties(result);
  }, [search, properties]);

  const loadProperties = async () => {
    try {
      setLoading(true);

      const data = await getProperties();

      const list = Array.isArray(data)
        ? data
        : data.properties || [];

      setProperties(list);
      setFilteredProperties(list);

    } catch (error) {
      console.log(error);
      alert("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProperty(id);

      setProperties((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Property deleted successfully.");

    } catch (error) {
      console.log(error);
      alert("Unable to delete property.");
    }
  };

  return (
    <div>

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

        <div>

          <h1 className="text-4xl font-bold">
            Properties
          </h1>

          <p className="text-gray-500">
            Manage all your property listings
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={loadProperties}
            className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FaSyncAlt />
            Refresh
          </button>

          <Link
            to="/add-property"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FaPlus />
            Add Property
          </Link>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Total Properties
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {properties.length}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Featured
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {
              properties.filter(
                (item) => item.featured
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Available
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {
              properties.filter(
                (item) => item.status === "Available"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Sold
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {
              properties.filter(
                (item) => item.status === "Sold"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Property Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (
          <Loading />
        ) : filteredProperties.length === 0 ? (
          <EmptyState />
        ) : (
          <PropertyTable
            properties={filteredProperties}
            onDelete={handleDelete}
          />
        )}

      </div>

    </div>
  );
}

export default Properties;