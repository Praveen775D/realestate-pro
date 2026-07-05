import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaEnvelope,
  FaChartBar,
  FaCog,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  const menus = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },

    {
      name: "Properties",
      path: "/properties",
      icon: <FaBuilding />
    },

    {
      name: "Add Property",
      path: "/add-property",
      icon: <FaPlusCircle />
    },

    {
      name: "Enquiries",
      path: "/enquiries",
      icon: <FaEnvelope />
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />
    }

  ];

  return (

    <div className="w-72 bg-slate-900 text-white min-h-screen shadow-xl">

      <div className="text-center py-8">

        <h1 className="text-3xl font-bold">

          🏡

        </h1>

        <p className="mt-2 font-semibold">

          Real Estate

        </p>

      </div>

      <div className="px-4">

        {

          menus.map((menu) => (

            <NavLink

              key={menu.name}

              to={menu.path}

              className={({ isActive }) =>

                `flex items-center gap-3 p-4 rounded-xl mb-2 transition
                ${isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"}`
              }

            >

              {menu.icon}

              {menu.name}

            </NavLink>

          ))

        }

      </div>

      <div className="absolute bottom-10 left-4">

        <button

          onClick={logout}

          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"

        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

}

export default Sidebar;