"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/img/logo.svg";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../fontawesome";

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const [isNavHidden, setIsNavHidden] = useState(true);

  const toggleNav = () => {
    setIsNavHidden((prevState) => !prevState);
  };

  const hideNav = () => {
    setIsNavHidden(true);
  };

  return (
    <header className="text-slate-800 scroll-smooth bg-[#fffdfa]">
      <div className="container 2xl:max-w-7xl flex items-center justify-between py-8 px-4 md:px-8 mx-auto">
        {/* Logo */}
        <div className="flex">
          <Link href="/">
            <Image
              src={logo}
              alt="Pantry pilot logo"
              width={50}
              height={50}
              className="w-28"
            ></Image>
          </Link>
        </div>
        {/* Nav */}
        <div className="relative">
          {/* Hamburger Menu */}
          <button
            type="button"
            className="block md:hidden z-50 text-gray-800 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
            onClick={toggleNav}
          >
            <FontAwesomeIcon icon={faBurger} size="2x" />
          </button>
          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-white z-40 transition overflow-y-auto"
            id="mobNav ${isNavHidden ? "hidden" : ""}`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <ul className="flex flex-col text-4xl items-center gap-12 text-gray-800 font-bold px-8 py-4">
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <Link href="/dashboard/admin">Contact</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <a href="./user/dashboard.html">
                    <button className="px-4 py-2 text-white border-2 rounded-lg border-rose-600 bg-rose-600">
                      Start Cooking
                    </button>
                  </a>
                </li>
                <button onClick={hideNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#333"
                      d="M9.414 8l5.293-5.293c.39-.39.39-1.024 0-1.414s-1.024-.39-1.414 0L8 6.586 2.707 1.293c-.39-.39-1.024-.39-1.414 0s-.39 1.024 0 1.414L6.586 8l-5.293 5.293c-.39.39-.39 1.024 0 1.414.195.195.451.293.707.293s.512-.098.707-.293L8 9.414l5.293 5.293c.195.195.451.293.707.293s.512-.098.707-.293c.39-.39.39-1.024 0-1.414L9.414 8z"
                    />
                  </svg>
                </button>
              </ul>
            </div>
          </div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-semibold">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <Link href="/dashboard/admin">Contact</Link>
            </li>
            <li>
              <button style={{ marginRight: 10 }} onClick={() => signIn()}>
                Sign in
              </button>
            </li>
            <li>
              <Link href="/dashboard/user">
                <button className="px-4 py-2 text-white border-2 rounded-lg border-rose-600 bg-rose-600">
                  Start Cooking
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
