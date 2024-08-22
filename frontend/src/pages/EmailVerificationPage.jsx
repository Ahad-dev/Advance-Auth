import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef([]);
  const navigate = useNavigate();

  const {verifyEmail,isLoading,error}  = useAuthStore();

    const handleChange = (index,value) => {
        const newCode = [...code];

        if(value.length>1){
            const pastedCode = value.slice(0,6).split("");
            for(let i=0;i<6;i++){
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            //Focus on last non-empty input or first empty input
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        }
        else{
            newCode[index] = value;
            setCode(newCode);

            if(value && index < 5){
                inputRefs.current[index + 1].focus();
            }

        }
    }
    const handleKeyDown = (index,e) => {
        if(e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const verificationToken = code.join("");
        try{
            await verifyEmail(verificationToken);
            navigate("/");
            toast.success("Email verified successfully");

        }catch(error){
            console.log(error);
        }
        console.log("Code submitted",code.join(""));
        // navigate("/login");
    }

    //Automatically focus on first input on page load
    React.useEffect(() => {
        inputRefs.current[0].focus();
    },[]);
    //Auto submit when all inputs are filled
    React.useEffect(() => {
        const isCodeFilled = code.every((digit) => digit);
        if(isCodeFilled){
            console.log("Code submitted",code.join(""));
            handleSubmit(new Event("submit"));
        }
    },[code]);

  return (
    <div 

    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        className=" p-8"
      >
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-t
            from-green-400 to bg-emerald-500 text-transparent bg-clip-text"
        >
          Email Verification
        </h2>
        <p className="text-center text-gray-400 mb-5">
          Enter the 6-digit code sent to your email
        </p>

        <form className="space-y-6">
            <div className="flex justify-center space-x-2">
                {code.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="6"
                    className="font-bold text-xl w-12 h-12 outline-none bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 text-center"
                    value={digit}
                    onChange={(e) => handleChange(index,e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index,e)}
                />
                ))}
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
                disabled={code.some((digit) => !digit)||isLoading}
                type="submit"
                className={`w-full py-2.5 bg-gradient-to-r  ${code.some((digit) => !digit) ? "from-green-700 to bg-emerald-900 text-gray-300 font-semibold rounded-lg shadow-md scale-95":"from-green-400 to bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-emerald-600 transition duration-200 scale-100"} `}
            >
                {isLoading ? "Verifying..." : "Verify Email"}
             
            </button>

        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
