import { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Eye, EyeOff } from "lucide-react";

const SignSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net)$/i,
      "Enter a valid email"
    )
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),
});


function Sign() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState<Record<string, string>>({});
  const handleSignIn = async () => {
    const user = {
      email,
      password,
    };

    try {
      await SignSchema.validate(user, {
        abortEarly: false,
      });

      setErrors({});
      navigate("/dashboard");
    }
    catch (err: any) {
      const validationErrors: Record<string, string> = {};

      err.inner?.forEach((item: any) => {
        validationErrors[item.path] = item.message;
      });

      setErrors(validationErrors);
    }
  };

  return (
    <div className ="bg-gradient-to-br from-white-500 via-white-200 to-blue-300">
   <div className="min-h-screen flex items-center justify-center px-4 ">
  <Card className="w-full max-w-6xl overflow-hidden rounded-[40px] shadow-2xl border-0">
    <div className="grid md:grid-cols-2 bg-slate-100">
      

            {/* Left Section */}
            <div className="bg-gradient-to-br from-blue-300 to-indigo-400 text-white flex flex-col items-center justify-center p-10 rounded-r-[120px] ">
              <h1 className="text-5xl font-bold">
                Hello, Welcome!
              </h1>

              <p className="mt-4 text-center text-blue-100 text-2xl">
                Don't have an account?
              </p>

              <Link to="/create">
            
                <h2
                  className="mt-6 border-white text-white  hover:text-blue-600 text-2xl"
                >
                  Create Account
                </h2>
              </Link>
            </div>

            {/* Right Section */}
            <div className="p-10 flex flex-col justify-center bg-slate-100">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-slate-800">
                  Sign In
                </h2>
              </div>

              <div className="space-y-5">

                {/* Email */}
                <div>
                  <label className="block text-10 font-semibold text-slate-700 mb-3">
                    Email
                  </label>

                 <Input
  className={`w-full h-14 rounded-xl text-base px-4 ${
    error.email
      ? "border-red-500 ring-2 ring-red-200"
      : ""
  }`}
  placeholder="Enter email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: "",
    }));
  }}
/>
                  
                </div>

                {/* Password */}
                <div>
                  <label className="block text-10 font-semibold text-slate-700 mb-2">
                    Password
                  </label>

                  <div className="relative">
                   <Input
  type={showPassword ? "text" : "password"}
  className={`w-full h-14 rounded-xl text-base px-4 pr-12 ${
    error.password
      ? "border-red-500 ring-2 ring-red-200"
      : ""
  }`}
  placeholder="Enter password"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      password: "",
    }));
  }}
/>

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {/* 
                {error.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.password}
                  </p>
                )} */}
                </div>

                {/* Button */}
                <Button
className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold"                  onClick={handleSignIn}
                >
                  Sign In
                </Button>

                {/* Footer */}
                <div className="text-center text-sm text-slate-600">
                  New User?
                  <Link
                    to="/create"
                    className="ml-1 font-semibold text-blue-600"
                  >
                    Create Account
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </Card>
      </div>
</div>
  );
}

export default Sign;
