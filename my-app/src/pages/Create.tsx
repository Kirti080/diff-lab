import { useState } from "react";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
const CreateSchema = yup.object({
  name: yup.string().required("Name is required"),

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

  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password not matched"),
});

function Create() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    const user = {
      name: username,
      email: email,
      password: password,
      confirm: ConfirmPassword,
    };

    try {
      setError({});

      await CreateSchema.validate(user, {
        abortEarly: false,
      });


      navigate("/dashboard");
    } catch (err: any) {
      const errors: Record<string, string> = {};

      err.inner.forEach((item: any) => {
        errors[item.path] = item.message;
      });

      setError(errors);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white-500 via-white-200 to-blue-300">
      <Card className="w-full max-w-[450px] bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Create an account to continue
          </p>
        </div>

        <div className="space-y-5">
          {/* Username */}
          <div className="flex flex-col items-center">
            <label className="w-[380px] text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <Input
              className={`w-[380px] ${error.name
                  ? "border-red-500 ring-2 ring-red-200"
                  : ""
                }`}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <label className="w-[380px] text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <Input
              className={`w-[380px] ${error.email
                  ? "border-red-500 ring-2 ring-red-200"
                  : ""
                }`}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative w-[380px] mx-auto">
              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className={`w-full pr-10 ${error.password
                    ? "border-red-500 ring-2 ring-red-200"
                    : ""
                  }`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setError((prev) => ({
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

          </div>


          {/* Confirm Password */}
          <div className="flex flex-col items-center">
            <label className="w-[380px] text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative w-[380px]">
              <Input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className={`w-full pr-10 ${error.confirm
                    ? "border-red-500 ring-2 ring-red-200"
                    : ""
                  }`}
                placeholder="Confirm password"
                value={ConfirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-3 text-15">
          <Button
            className="w-[380px] h-10 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
            onClick={handleSignup}
          >

            Create Account
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600 mt-3">
          Already have an account?
          <Link
            to="/"
            className="ml-1 text-blue-600 hover:underline font-large"
          >
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Create;