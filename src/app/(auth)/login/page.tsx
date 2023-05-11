import Header from "@/components/Header";
import Link from "next/link";
const Login = () => {
  return (
    <>
      <Header></Header>
      <div className="w-72 flex flex-col items-center font-medium mx-auto my-12">
        <p className="text-5xl mb-12">Login</p>
        <form className="container flex flex-col gap-8 text-left" action="post">
          <div className="flex flex-col w-full">
            Email
            {/* <label for="email" type="email">
            </label> */}
            <input
              name="email"
              id="email"
              className="border border-black h-10 px-2"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            Password
            {/* <label for="password" type="password" required>
            </label> */}
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
            className="h-12 mt-4 w-full bg-rose-600 text-white hover:bg-rose-700"
          >
            Login
          </button>
        </form>
        <p className="font-normal mt-2">
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
