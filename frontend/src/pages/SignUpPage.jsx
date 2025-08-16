import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link,useNavigate } from "react-router-dom";
import {
  Code,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Braces,
  FileCode,
  Terminal,
  BugIcon,
  GitBranch,
  FileJson2,
  Binary,
} from "lucide-react";

import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import Navbar from "../components/Navbar.jsx";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";

const SignUpSchema = z.object({
  email: z.string().email("Enter a Valid Email"),
  name: z.string().min(3, "Name must be atleast of 3 characters"),
  password: z.string().min(6, "Password must be atleast of 6 length"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isSignInUp, signup } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });
  const onSubmit = async (data) => {
    try {
      await signup(data);
      reset();
      navigate("/")
    } catch (error) {
      console.error("Signup Failed", error);
    }
  };
  return (
    <div>
      <Navbar/>
      <div className="h-screen grid lg:grid-cols-2 pt-16">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full min-w-md space-y-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Welcome </h1>
                <p>Sign Up to your account</p>
              </div>
            </div>
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ color: "var(--navy)" }}
            >
              <div className="absolute top-[12%] left-[15%] animate-pulse">
                <Braces size={40} />
              </div>
              <div className="absolute top-[30%] left-[90%] animate-pulse delay-300">
                <FileCode size={50} />
              </div>
              <div className="absolute top-[78%] left-[12%] animate-pulse delay-700">
                <Terminal size={45} />
              </div>
              <div className="absolute top-[90%] left-[80%] animate-pulse delay-500">
                <Code size={55} />
              </div>
              <div className="absolute top-[85%] left-[45%] animate-pulse delay-200">
                <Braces size={35} />
              </div>
              <div className="absolute top-[15%] left-[60%] animate-pulse delay-100">
                <Terminal size={30} />
              </div>
              <div className="absolute bottom-[20%] right-[10%] animate-bounce delay-100">
                <BugIcon size={50} />
              </div>
              <div className="absolute bottom-[2%] right-[70%] animate-pulse delay-200">
                <GitBranch size={30} />
              </div>
              <div className="absolute bottom-[80%] right-[5%] animate-pulse delay-350">
                <FileJson2 size={30} />
              </div>
              <div className="absolute bottom-[60%] right-[90%] animate-bounce delay-150">
                <Binary size={40} />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    style={{color: "var(--cream)", opacity: "50"}}
                    {...register("name")}
                    className={`input input-bordered w-full pl-10 ${
                      errors.name ? "input-error" : ""
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    style={{color: "var(--cream)", opacity: "50"}}
                    {...register("email")}
                    className={`input input-bordered w-full pl-10 ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    style={{color: "var(--cream)", opacity: "50"}}
                    {...register("password")}
                    className={`input input-bordered w-full pl-10 ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-base-content/40" />
                    ) : (
                      <Eye className="h-5 w-5 text-base-content/40" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSignInUp}
              >
                {isSignInUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center">
              <p className="text-base-content/60"
              style={{ color: "var(--steel)" }}
              >
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Sign in
                </Link>
              </p>
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <p
                className="text-sm mb-4"
                style={{ color: "var(--steel)" }}
              >
                Or continue with
              </p>
              <div className="flex justify-center space-x-4 cursor-pointer">
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                  <FaGithub size={28} />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                  <FaGoogle size={28} />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                  <FaLinkedin size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <AuthImagePattern
          title={"Welcome to our Platform!"}
          subtitle={
            "Sign Up to access our platform and start using our services."
          }
        />
      </div>
    </div>
  );
};

export default SignUpPage;
