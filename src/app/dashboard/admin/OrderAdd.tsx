import React, { FC } from "react";

interface OrderAddProps {}

const OrderAdd: FC<OrderAddProps> = ({}) => {
  return (
    <>
      <div className="flex flex-col gap-8 pt-6 pb-8 px-8 w-full">
        <h1 className="text-4xl font-semibold">Orders</h1>
        {/* <!-- Header Menu --> */}
        <div className="flex gap-6">
          {/* <!-- Search --> */}
          <div className="relative">
            <input
              className="border border-gray-600 h-10 pl-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute right-4 top-2 text-neutral-600"
            >
              <i className="fa-solid fa-magnifying-glass fa-lg"></i>
            </button>
          </div>
        </div>
        {/* <!-- Cards --> */}
        <ul className="grid grid-cols-2 gap-4">
          <div className="h-3 bg-green-300 border"></div>
          <li className="border-2 shadow-md sha">
            <div className="m-4">
              <h2 className="text-lg font-medium">Rizfi Ferdiansyah</h2>
              <p>Beef Steak</p>
              <div className="flex justify-end gap-3 mt-2">
                <button>
                  <i className="fa-solid fa-check fa-xl text-green-400"></i>
                </button>
              </div>
            </div>
          </li>
          <div className="h-3 bg-red-300 border"></div>
          <li className="border-2 shadow-md">
            <div className="m-4">
              <h2 className="text-lg font-medium">Rizfi Ferdiansyah</h2>
              <p>beef, leek, lemongrass, tamarind, lime leaves...</p>
              <div className="flex justify-end gap-3 mt-2">
                <button>
                  <i className="fa-solid fa-xmark fa-xl text-red-400"></i>
                </button>
              </div>
            </div>
          </li>
          <div className="h-3 bg-amber-300 border"></div>
          <li className="border-2 shadow-md">
            <div className="m-4">
              <h2 className="text-lg font-medium">Rizfi Ferdiansyah</h2>
              <p>beef, leek, lemongrass, tamarind, lime leaves...</p>
              <div className="flex justify-end gap-3 mt-2">
                <button>
                  <i className="fa-solid fa-clock fa-lg text-amber-400"></i>
                </button>
              </div>
            </div>
          </li>
          <div className="h-3 bg-green-300 border"></div>
          <li className="border-2 shadow-md sha">
            <div className="m-4">
              <h2 className="text-lg font-medium">Rizfi Ferdiansyah</h2>
              <p>Beef Steak</p>
              <div className="flex justify-end gap-3 mt-2">
                <button>
                  <i className="fa-solid fa-check fa-xl text-green-400"></i>
                </button>
              </div>
            </div>
          </li>
          <div className="h-3 bg-red-300 border"></div>
          <li className="border-2 shadow-md">
            <div className="m-4">
              <h2 className="text-lg font-medium">Rizfi Ferdiansyah</h2>
              <p>beef, leek, lemongrass, tamarind, lime leaves...</p>
              <div className="flex justify-end gap-3 mt-2">
                <button>
                  <i className="fa-solid fa-xmark fa-xl text-red-400"></i>
                </button>
              </div>
            </div>
          </li>
          <div className="h-3 bg-amber-300 border"></div>
          <li className="border-2 shadow-md">
            <div className="m-4">
              <h2 className="text-lg font-medium">Rizfi Ferdiansyah</h2>
              <p>beef, leek, lemongrass, tamarind, lime leaves...</p>
              <div className="flex justify-end gap-3 mt-2">
                <button>
                  <i className="fa-solid fa-clock fa-lg text-amber-400"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
        {/* <!-- Pagination --> */}
        <nav className="flex justify-center gap-1 text-xs font-medium">
          <ul className="flex gap-2">
            <li>
              <p className="text-base block h-9 w-9 rounded-full border border-gray-100 text-center leading-8 hover:bg-blue-400 hover:text-white">
                &lt;
              </p>
            </li>
            <li>
              <p className="text-base block h-9 w-9 rounded-full border border-gray-100 text-center leading-8 hover:bg-blue-400 hover:text-white text-white bg-blue-400">
                1
              </p>
            </li>
            <li>
              <p className="text-base block h-9 w-9 rounded-full border border-gray-100 text-center leading-8 hover:bg-blue-400 hover:text-white">
                2
              </p>
            </li>
            <li>
              <p className="text-base block h-9 w-9 rounded-full border border-gray-100 text-center leading-8 hover:bg-blue-400 hover:text-white">
                3
              </p>
            </li>
            <li>
              <p className="text-base block h-9 w-9 rounded-full border border-gray-100 text-center leading-8 hover:bg-blue-400 hover:text-white">
                &gt;
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default OrderAdd;
