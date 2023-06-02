"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.webp";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      if (session.data.user.isAdmin) {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  });

  const registerUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/register", data)
      .then(
        () =>
          toast.success("Account created! Redirecting to login...") &&
          setTimeout(() => {
            router.push("/login");
          })
      )
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 font-medium">
      <div className="z-10 mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image src={logo} priority alt="Logo" width={100} height={100} />
          </Link>
          <h3 className="text-4xl font-bold">Create Account</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <form
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
          onSubmit={registerUser}
        >
          <div>
            <label htmlFor="name" className="block text-xs uppercase">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Budi Tarmiji"
              autoComplete="name"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="panic@thedis.co"
              autoComplete="email"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs uppercase">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <a
                className="cursor-pointer absolute bottom-0 right-0 items-center py-2 px-3"
                onClick={handleTogglePassword}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </a>
            </div>
          </div>
          <button
            disabled={loading}
            className={`${
              loading
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-rose-600 bg-rose-600 text-white hover:bg-white hover:text-rose-600"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none select-none`}
          >
            {loading ? <LoadingDots color="#e11d48" /> : <p>Register</p>}
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-400"
            >
              Login
            </Link>{" "}
            instead.
          </p>
        </form>
      </div>
    </div>
  );
}
