import React from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import {User,Mail,Lock, Loader} from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import PasswordInput from "../components/PasswordInput";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const [userData,setUserData] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    // const [isLoading,setIsLoading] = React.useState(false);
    const {signup,error,isLoading} = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await signup(userData);
            navigate('/verify-email');
        }
        catch(error){
            console.log(error);
        }
    }


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1}}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden"
    >
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-t
            from-green-400 to bg-emerald-500 text-transparent bg-clip-text">Create Account</h2>

            <form onSubmit={handleSubmit}>
                <Input 
                    icon={User}
                    name = "name"
                    onChange={handleChange}
                    value={userData.name}
                    type="text"
                    placeholder="Full Name"
                ></Input>
                <Input 
                    name = "email"
                    onChange={handleChange}
                    value={userData.email}
                    icon={Mail}
                    type="text"
                    placeholder="Email"
                ></Input>
                <PasswordInput
                    value={userData.password}
                    name = "password"
                    onChange={handleChange}
                    icon={Lock}
                    placeholder="Password"
                ></PasswordInput>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/*Todo: Password Strenght meter */}
                <PasswordStrengthMeter password={userData.password}/>

                <motion.button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                >{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}</motion.button>
            </form>

        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-green-400 hover:underline'>
						Login
					</Link>
				</p>
		</div>
    </motion.div>
  );
};

export default SignUpPage;
