"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform registration logic here
    // You can store the user's information in a database or perform any necessary validation

    // After successful registration, you can redirect the user to the login page
    router.push("/login");
  };
  return (
    <>
      <Header />
      <div className="w-5/6 lg:w-1/2 xl:w-1/3 mx-auto my-12 text-center font-medium">
        <h1 className="text-5xl mb-12">Create Account</h1>
        <form
          id="formRegister"
          className="container flex flex-col gap-8 text-left items-center"
          onSubmit={handleRegister}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="birth">
              Birth<span className="text-rose-600">*</span>
            </label>
            <input
              name="birth"
              id="birth"
              className="border border-black h-10 px-2"
              type="date"
              required
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="address">
              Address<span className="text-rose-600">*</span>
            </label>
            <input
              name="address"
              id="address"
              className="border border-black h-10 px-2"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="phone">
              Phone Number<span className="text-rose-600">*</span>
            </label>
            <input
              name="phone"
              id="phone"
              className="border border-black h-10 px-2"
              type="tel"
              maxLength={13}
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className="flex flex-col w-full
"
          >
            <label htmlFor="password">
              Password<span className="text-rose-600">*</span>
            </label>
            <input
              name="password"
              id="password"
              className="border border-black h-10 px-2"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="err"></div>
          </div>
          <button
            type="submit"
            className="w-full h-12 mt-4 bg-rose-600 text-white hover:bg-rose-700"
          >
            Sign up
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
              Sign in
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
