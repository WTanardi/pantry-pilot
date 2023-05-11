import Header from "@/components/Header";
import Link from "next/link";
const Register = () => {
  return (
    <>
      <Header></Header>
      <div className="w-72 flex flex-col my-12 text-center mx-auto font-medium">
        <h1 className="text-5xl mb-12">Create Account</h1>
        <form
          id="formRegister"
          className="container flex flex-col gap-8 text-left"
          action="post"
        >
          <div className="flex flex-col w-full">
            {/* <label htmlFor="name" type="name">
            </label> */}
            Name<span className="text-rose-600">*</span>
            <input
              name="name"
              id="name"
              className="border border-black h-10 px-2"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            {/* <label htmlFor="birth" type="birth">
            </label> */}
            Birth<span className="text-rose-600">*</span>
            <input
              name="birth"
              id="birth"
              className="border border-black h-10 px-2"
              type="date"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            {/* <label htmlFor="address" type="address">
            </label> */}
            Address<span className="text-rose-600">*</span>
            <input
              name="adress"
              id="adress"
              className="border border-black h-10 px-2"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            {/* <label htmlFor="phone" type="phone">
            </label> */}
            Phone Number<span className="text-rose-600">*</span>
            <input
              name="phone"
              id="phone"
              className="border border-black h-10 px-2"
              type="tel"
              maxLength={13}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            {/* <label
              htmlFor="email"
              type="email"
              className="text-left font-medium"
            >
            </label> */}
            Email
            <input
              name="email"
              id="email"
              className="border border-black h-10 px-2"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            {/* <label htmlFor="password" type="password" required>
            </label> */}
            Password<span className="text-rose-600">*</span>
            <input
              name="password"
              id="password"
              className="border border-black h-10 px-2"
              type="password"
              minLength={8}
              required
            />
            <div className="err"></div>
          </div>
          <button
            type="submit"
            className="h-12 w-full mt-4 bg-rose-600 text-white hover:bg-rose-700"
          >
            Sign up
          </button>
        </form>
        <p className="font-normal mt-2">
          Already have account?
          <span>
            <Link
              href="/login"
              className="text-blue-700 font-bold hover:text-blue-500"
            >
              &nbsp;Sign in
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
