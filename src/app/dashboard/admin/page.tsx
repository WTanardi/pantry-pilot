"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faBowlFood,
  faUtensils,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import RestoAdd from "./RestoAdd";
import RecipeAdd from "./RecipeAdd";
import OrderAdd from "./OrderAdd";

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
        <div className="flex w-1/4 h-screen bg-rose-600 text-rose-300">
          <div className="flex flex-col p-8 text-xl gap-6">
            <div onClick={() => handleTabChange("tab1")}>
              <div className="flex items-baseline hover:text-white">
                <FontAwesomeIcon icon={faBowlFood} />
                <h3>Recipe</h3>
              </div>
            </div>
            <div onClick={() => handleTabChange("tab2")}>
              <li className="flex items-baseline hover:text-white">
                <FontAwesomeIcon icon={faUtensils} />
                <h3>Resto</h3>
              </li>
            </div>
            <div onClick={() => handleTabChange("tab3")}>
              <div className="flex items-baseline hover:text-white">
                <FontAwesomeIcon icon={faReceipt} />
                <h3>Order</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Main Content --> */}
        <div className="py-6 px-8 w-full max-h-screen overflow-y-scroll scrollbar-hide">
          {activeTab === "tab1" && <RecipeAdd></RecipeAdd>}
          {activeTab === "tab2" && <RestoAdd></RestoAdd>}
          {activeTab === "tab3" && <OrderAdd></OrderAdd>}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
