import { FaBell } from "react-icons/fa";

function Topbar() {

  const admin = JSON.parse(

    localStorage.getItem("admin")

  );

  return (

    <div className="bg-white h-20 shadow flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold">

          Dashboard

        </h2>

      </div>

      <div className="flex items-center gap-6">

        <FaBell
          size={22}
          className="text-gray-600 cursor-pointer"
        />

        <div className="text-right">

          <p className="font-semibold">

            {admin?.username || "Admin"}

          </p>

          <p className="text-sm text-gray-500">

            Administrator

          </p>

        </div>

        <img

          src="https://ui-avatars.com/api/?name=Admin"

          alt="admin"

          className="w-12 h-12 rounded-full"

        />

      </div>

    </div>

  );

}

export default Topbar;