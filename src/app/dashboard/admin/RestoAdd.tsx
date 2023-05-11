import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

interface RestoAddProps {}

const RestoAdd: FC<RestoAddProps> = ({}) => {
  return (
    <>
      <div className="py-6 px-8 w-full">
        <div className="flex gap-4 items-center">
          {/* Back */}
          <a href="./resto.html" className="mt-1 w-5 hover:text-neutral-400">
            <FontAwesomeIcon icon={faAngleLeft} size="xl" />
          </a>
          <h1 className="text-4xl font-semibold lead">Restaurant | Add</h1>
        </div>
        <form
          action=""
          method="post"
          className="grid grid-cols-5 gap-x-4 gap-y-5 mt-8"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5 col-span-3">
            <label htmlFor="rname">Restaurant Name</label>
            <input
              type="text"
              name="rname"
              className="border border-black px-2 py-1"
              required
            />
          </div>
          {/* Resto Image */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label htmlFor="fimg">Restaurant Image</label>
            <input
              name="fimg"
              className="border border-black h-full cursor-pointer file:text-black file:bg-neutral-300 file:border-none file:h-full hover:file:bg-stone-600 hover:file:text-white file:cursor-pointer"
              placeholder=""
              type="file"
            />
          </div>
          {/* Desc */}
          <div className="flex flex-col gap-1.5 col-span-3">
            <label htmlFor="fdesc">Description</label>
            <textarea
              name="fdesc"
              className="border border-black px-2 py-1"
            ></textarea>
          </div>
          {/* Location */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label htmlFor="rname">Location</label>
            <textarea
              name="rname"
              className="border border-black px-2 py-1"
            ></textarea>
          </div>

          {/* Menu Input */}
          <h5 className="text-2xl col-span-full">Menu</h5>
          <div className="col-span-full grid grid-cols-8 gap-4">
            {/* Food name */}
            <div className="flex flex-col gap-1.5 col-span-3">
              <label htmlFor="">Food Name</label>
              <input
                type="text"
                name=""
                className="border border-black px-2 py-1"
                required
              />
            </div>
            {/* Recipe */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label htmlFor="">Recipe</label>
              <select className="border border-black h-full" required>
                <option></option>
                <option value="rawon">Rawon</option>
                <option value="soto">Soto</option>
                <option value="steak">Steak</option>
                <option value="sashimi">Sashimi</option>
              </select>
            </div>
            {/* Food Image */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label htmlFor="">Food Image</label>
              <input
                name=""
                className="border border-black h-full cursor-pointer file:text-black file:bg-neutral-300 file:border-none file:h-full hover:file:bg-stone-600 hover:file:text-white file:cursor-pointer"
                placeholder=""
                type="file"
              />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="">Food Price</label>
              <input
                type="number"
                name=""
                className="border border-black px-2 py-1"
                required
              />
            </div>
            {/* Food desc */}
            <div className="flex flex-col gap-1.5 col-span-full">
              <label htmlFor="">Food Description</label>
              <textarea
                name=""
                className="border border-black px-2 py-1"
              ></textarea>
            </div>
            {/* <!-- Remove --> */}
            <button
              type="button"
              className="col-end-9 justify-self-start text-red-700 hover:text-red-500 flex items-center gap-3"
            >
              <FontAwesomeIcon icon={faSquareMinus} size="2xl" />
              Remove
            </button>
          </div>
          <div className="col-span-full grid grid-cols-8 gap-4">
            <hr className="col-span-full h-px rounded-full bg-slate-300 border-0" />

            {/* <!-- Food Name --> */}
            <div className="flex flex-col gap-1.5 col-span-3">
              <label htmlFor="">Food Name</label>
              <input
                type="text"
                name=""
                className="border border-black px-2 py-1"
                required
              />
            </div>
            {/* <!-- Recipe --> */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label htmlFor="">Recipe</label>
              <select className="border border-black h-full" required>
                <option></option>
                <option value="rawon">Rawon</option>
                <option value="soto">Soto</option>
                <option value="steak">Steak</option>
                <option value="sashimi">Sashimi</option>
              </select>
            </div>
            {/* <!-- Food Image --> */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label htmlFor="">Food Image</label>
              <input
                name=""
                className="border border-black h-full cursor-pointer file:text-black file:bg-neutral-300 file:border-none file:h-full hover:file:bg-stone-600 hover:file:text-white file:cursor-pointer"
                placeholder=""
                type="file"
              />
            </div>
            {/* <!-- Price --> */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="">Food Price</label>
              <input
                type="number"
                name=""
                className="border border-black px-2 py-1"
                required
              />
            </div>
            {/* <!-- Food Desc --> */}
            <div className="flex flex-col gap-1.5 col-span-full">
              <label htmlFor="">Food Description</label>
              <textarea
                name=""
                className="border border-black px-2 py-1"
              ></textarea>
            </div>
            {/* <!-- Add Menu --> */}
            <button
              type="button"
              className="col-end-8 justify-self-center text-indigo-700 hover:text-indigo-500 flex items-center gap-3"
            >
              <FontAwesomeIcon icon={faSquarePlus} size="2xl" />
              Add
            </button>
            {/* Remove */}
            <button
              type="button"
              className="col-end-9 justify-self-start text-red-700 hover:text-red-500 flex items-center gap-3"
            >
              <FontAwesomeIcon icon={faSquareMinus} size="2xl" />
              Remove
            </button>
          </div>

          <button className="h-12 mt-4 w-full bg-sky-500 text-white hover:bg-sky-700 font-semibold">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RestoAdd;
