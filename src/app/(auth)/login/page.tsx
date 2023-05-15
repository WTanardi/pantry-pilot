import Header from "@/components/Header";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <Header />
      <div className="w-5/6 lg:w-1/2 xl:w-1/3 mx-auto my-12 flex flex-col items-center font-medium">
        <p className="text-5xl mb-12">Login</p>
        <form className="container flex flex-col gap-8" action="post">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              className="border border-black h-10 px-2"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              className="border border-black h-10 px-2"
              type="password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-4 bg-rose-600 text-white hover:bg-rose-700"
          >
            Login
          </button>
        </form>
        <p className="mt-2 font-normal">
          Not Registered?
          <span>
            <Link
              href="/register"
              className="text-blue-700 font-bold hover:text-blue-500"
            >
              &nbsp;Sign up
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
