import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthPagePattern from "../components/AuthPagePattern";
import {useAuthStore} from "../store/useAuthStore.js"
import { FaGithub,FaLinkedin,FaGoogle } from "react-icons/fa";
import { SpinnerIcon } from "@phosphor-icons/react";

export const LoginSchema = z.object({
  email: z.string().email("Enter Valid Email"),
  password: z.string().min(6, "Password must be atleast of length 6"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {isLoggingIn, login, authUser} = useAuthStore();
  
  // Redirect to main page if already logged in
  useEffect(() => {
    if (authUser) {
      navigate('/main');
    }
  }, [authUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      // Login will automatically redirect due to useEffect above
    } catch (error) {
      console.error("Signin Failed", error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Column - Login Form */}
        <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex items-center justify-center space-x-2 mb-15"></div>
              <div className="w-12 h-11 bg-white rounded-xl flex items-center justify-center border-2 border-[#8f6437] mx-auto mb-4">
                <span className="text-[#543310] font-bold text-xl">
                  &lt;/&gt;
                </span>
              </div>
              <p
                className="text-base sm:text-lg py-1.5"
                style={{ color: "var(--color-text-light)" }}
              >
                Welcome back to CodeVerse
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h2
                className="text-xl sm:text-2xl font-bold text-center mb-6"
                style={{ color: "var(--color-header)" }}
              >
                Sign in to your account
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[70%] -translate-y-1/2 
               sm:right-4 sm:top-[70%] 
               md:right-5 
               lg:right-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
            
                  <a
                    href="#"
                    className="text-sm font-medium"
                    style={{ color: "var(--color-button)" }}
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200"
                  disabled={isLoggingIn}
                  style={{
                    backgroundColor: "var(--color-button)",
                    boxShadow: "0 4px 14px rgba(116, 81, 45, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor =
                      "var(--color-button-hover)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "var(--color-button)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  { isLoggingIn ? (
                    <>
                      <SpinnerIcon className="h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Sign In"
                  )

                }
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-light)" }}
                >
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-semibold"
                    style={{ color: "var(--color-button)" }}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 sm:mt-8 text-center">
              <p
                className="text-sm mb-4"
                style={{ color: "var(--color-text-light)" }}
              >
                Or continue with
              </p>
              <div className="flex justify-center space-x-4">
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                 <FaGithub size={28} color="#543310" />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                  <FaGoogle size={28} color="#DB4437" />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                  <FaLinkedin size={28} color="#0077B5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Code */}
        <AuthPagePattern />
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
