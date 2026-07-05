import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import { loginAdmin } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await loginAdmin(username, password);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "admin",
        JSON.stringify({
          username: data.username,
        })
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Invalid Username or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl w-[430px] p-10">

        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 h-20 w-20 rounded-full flex items-center justify-center text-white text-4xl">
            <FaBuilding />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Real Estate Management System
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="font-semibold">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter Username"
              className="mt-2 border rounded-xl p-3 w-full"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          <div>

            <label className="font-semibold">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                className="border rounded-xl p-3 w-full pr-12"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl w-full py-3 mt-4"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;