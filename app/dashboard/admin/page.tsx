import SignOut from "@/components/sign-out";
import React, { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-5xl">
          <p> This is Admin Dashboard</p>
          <SignOut />
        </div>
      </div>
    </>
  );
};

export default page;
