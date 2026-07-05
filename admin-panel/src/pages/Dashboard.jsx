import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaBuilding,
  FaEye,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

import CountUp from "react-countup";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");

      if (Array.isArray(res.data)) {
        setProperties(res.data);
      } else {
        setProperties(res.data.properties || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Statistics
  // ==============================

  const totalProperties = properties.length;

  const totalViews = properties.reduce(
    (sum, item) => sum + (item.views || 0),
    0
  );

  const featured = properties.filter(
    (item) => item.featured
  ).length;

  const available = properties.filter(
    (item) => item.status === "Available"
  ).length;

  // ==============================
  // Property Type Chart
  // ==============================

  const propertyTypes = {};

  properties.forEach((item) => {
    propertyTypes[item.propertyType] =
      (propertyTypes[item.propertyType] || 0) + 1;
  });

  const pieData = Object.keys(propertyTypes).map((key) => ({
    name: key,
    value: propertyTypes[key],
  }));

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#ea580c",
  ];

  // ==============================
  // Monthly Chart (Dummy)
  // ==============================

  const chartData = [
    { month: "Jan", properties: 4 },
    { month: "Feb", properties: 8 },
    { month: "Mar", properties: 12 },
    { month: "Apr", properties: 18 },
    { month: "May", properties: 24 },
    { month: "Jun", properties: totalProperties },
  ];

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Real Estate Admin Panel
        </p>

      </div>

      {/* ===================== */}
      {/* Statistics */}
      {/* ===================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Properties"
          value={totalProperties}
          color="bg-blue-500"
          icon={<FaBuilding />}
        />

        <StatCard
          title="Featured"
          value={featured}
          color="bg-orange-500"
          icon={<FaStar />}
        />

        <StatCard
          title="Available"
          value={available}
          color="bg-green-500"
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Total Views"
          value={totalViews}
          color="bg-purple-500"
          icon={<FaEye />}
        />

      </div>

      {/* ===================== */}
      {/* Charts */}
      {/* ===================== */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Monthly Properties
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="properties"
                fill="#2563eb"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Property Types
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ===================== */}
      {/* Recent Properties */}
      {/* ===================== */}

      <div className="bg-white rounded-xl shadow">

        <div className="border-b p-5">

          <h2 className="text-2xl font-bold">
            Recent Properties
          </h2>

        </div>

        {loading ? (

          <div className="p-10 text-center">
            Loading...
          </div>

        ) : properties.length === 0 ? (

          <div className="p-10 text-center">

            No Properties Found

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Area
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Views
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {properties.map((property) => (

                <tr
                  key={property._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">

                    <img
                      src={
                        property.images?.length
                          ? property.images[0]
                          : "https://placehold.co/80x60"
                      }
                      className="w-20 h-16 rounded-lg object-cover"
                      alt=""
                    />

                  </td>

                  <td className="p-4 font-semibold">
                    {property.title}
                  </td>

                  <td className="p-4">
                    {property.area} Sq.ft
                  </td>

                  <td className="p-4">
                    ₹
                    {property.totalPrice?.toLocaleString()}
                  </td>

                  <td className="p-4">
                    {property.views || 0}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        property.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {property.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">

            <CountUp
              end={value}
              duration={2}
            />

          </h2>

        </div>

        <div
          className={`${color} text-white text-3xl p-5 rounded-xl`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;