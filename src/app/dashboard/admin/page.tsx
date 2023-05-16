"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faBowlFood,
  faUtensils,
  faReceipt,
  faCarrot,
} from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import RestoAdd from "./RestoAdd";
import RecipeAdd from "./RecipeAdd";
import OrderAdd from "./OrderAdd";
import IngredientAdd from "./IngredientAdd";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <Header />
      <div className="flex mx-auto border-black border-t-2">
        {/* <!-- Side Bar --> */}
        <div className="flex w-72 h-screen bg-rose-600 text-rose-300">
          <div className="flex flex-col p-8 text-2xl gap-6 w-full">
            <div
              onClick={() => handleTabChange("tab1")}
              className={`flex gap-4 items-center cursor-pointer hover:text-white ${
                activeTab === "tab1" ? "text-white" : "text-rose-300"
              }`}
            >
              <FontAwesomeIcon icon={faCarrot} className="w-9" />
              <p>Ingredient</p>
            </div>
            <div
              onClick={() => handleTabChange("tab2")}
              className={`flex gap-4 items-center cursor-pointer hover:text-white ${
                activeTab === "tab2" ? "text-white" : ""
              }`}
            >
              <FontAwesomeIcon icon={faBowlFood} className="w-9" />
              <p>Recipe</p>
            </div>
            <div
              onClick={() => handleTabChange("tab3")}
              className={`flex gap-4 items-center cursor-pointer hover:text-white ${
                activeTab === "tab3" ? "text-white" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUtensils} className="w-9" />
              <p>Resto</p>
            </div>
            <div
              onClick={() => handleTabChange("tab4")}
              className={`flex gap-4 items-center cursor-pointer hover:text-white ${
                activeTab === "tab4" ? "text-white" : ""
              }`}
            >
              <FontAwesomeIcon icon={faReceipt} className="w-9" />
              <p>Order</p>
            </div>
          </div>
        </div>
        {/* <!-- Main Content --> */}
        <div className="py-6 px-8 w-full max-h-screen overflow-y-scroll scrollbar-hide">
          {activeTab === "tab1" && <IngredientAdd />}
          {activeTab === "tab2" && <RecipeAdd />}
          {activeTab === "tab3" && <RestoAdd />}
          {activeTab === "tab4" && <OrderAdd />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
