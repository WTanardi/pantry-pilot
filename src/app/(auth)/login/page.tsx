"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Disable automatic redirect
    });

    if (!result?.error) {
      // You can access the user object from the session
      if (session.data?.user?.isAdmin === true) {
        window.location.href = "/dashboard/admin"; // Redirect to admin dashboard
      }
      if (session.data?.user?.isAdmin === false) {
        window.location.href = "/dashboard/user"; // Redirect to user dashboard
      }
    } else {
      console.log(result.error); // Handle login error
    }
  };

  return (
    <>
      <Header />
      <div className="w-5/6 lg:w-1/2 xl:w-1/3 mx-auto my-12 flex flex-col items-center font-medium">
        <p className="text-5xl mb-12">Login</p>
        <div className="container flex flex-col gap-8">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              className="border border-black h-10 px-2"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <div className="flex justify-between">
              <input
                name="password"
                id="password"
                className="border border-black h-10 px-2 flex-grow"
                // type={showPassword ? "text" : "password"}
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <button
                onClick={togglePasswordVisibility}
                className="text-gray-500 focus:outline-none flex-grow-0 mx-4 w-11"
              >
                {showPassword ? "Hide" : "Show"}
              </button> */}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-4 bg-rose-600 text-white hover:bg-rose-700"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <p className="mt-2 font-normal">
          Not Registered?
          <span>
            <Link
              href="/register"
              passHref
              className="text-blue-700 font-bold hover:text-blue-500"
            >
              &nbsp; Sign up
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
