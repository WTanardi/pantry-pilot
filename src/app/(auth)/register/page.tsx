"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <>
      <Header />
      <div className="w-5/6 lg:w-1/2 xl:w-1/3 mx-auto my-12 text-center font-medium">
        <h1 className="text-5xl mb-12">Create Account</h1>
        <form
          className="container flex flex-col gap-8 text-left items-center"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col w-full">
            <label htmlFor="name">
              Name<span className="text-rose-600">*</span>
            </label>
            <input
              name="name"
              id="name"
              className="border border-black h-10 px-2"
              type="text"
              required
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="border border-black h-10 px-2"
              type="email"
              required
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">
              Password<span className="text-rose-600">*</span>
            </label>
            <div className="flex justify-between">
              <input
                name="password"
                id="password"
                className="border border-black h-10 px-2 flex-grow"
                type={showPassword ? "text" : "password"}
                minLength={8}
                required
                value={formValues.password}
                onChange={handleChange}
              />
              <button
                onClick={togglePasswordVisibility}
                className="text-gray-500 focus:outline-none flex-grow-0 mx-4 w-11"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-12 mt-4 bg-rose-600 text-white hover:bg-rose-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="mt-2 font-normal">
          Already have an account?
          <span>
            <Link
              href="/login"
              passHref
              className="text-blue-700 font-bold hover:text-blue-500"
            >
              &nbsp; Sign in
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}
