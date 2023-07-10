import React, { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <footer className="bg-rose-600 text-white py-6">
        <div className="container mx-auto flex justify-center items-center">
          <span className="font-semibold">
            © 2023 Pantry Pilot. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
