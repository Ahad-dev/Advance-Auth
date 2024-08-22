import React from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log(userData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-t
            from-green-400 to bg-emerald-500 text-transparent bg-clip-text"
        >
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="email"
            onChange={handleChange}
            value={userData.email}
            icon={Mail}
            type="text"
            placeholder="Email"
          ></Input>
          <PasswordInput
            value={userData.password}
            name="password"
            onChange={handleChange}
            icon={Lock}
            placeholder="Password"
          ></PasswordInput>
          <div className="flex justify-start">
            <Link
              to={"/forgot-password"}
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <motion.button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
