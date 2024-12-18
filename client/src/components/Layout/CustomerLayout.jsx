import React from "react";
import { useState } from "react";
import CustomerRouter from "../../routes/Customer";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Header = () => {
  const [activeTab, setActiveTab] = useState(CustomerRouter[0].name);
  const navigate = useNavigate();

  const handleClicked = (tab) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };
  return (
    <div className="w-auto">
      <div className="max-w-6xl mx-auto transition-all duration-300">
        <div className="flex justify-around py-4 gap-2 ">
          {CustomerRouter.map((tab, index) => (
            <div
              key={index}
              className={`relative px-4 py-2 cursor-pointer text-gray-700 hover:text-black ${
                activeTab === tab.name ? "font-bold" : "font-medium"
              }`}
              onClick={() => handleClicked(tab)}
            >
              {tab.name}
              {activeTab === tab.name && (
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-black rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const CustomerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex items-center justify-between bg-white  px-4 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-700 ">Lines Bank</h1>
        <Header />
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2 text-gray-700">Jack Davidson</span>
        </div>
      </header>

      <main className="bg-white w-[55vw] min-h-[500px] my-4 mx-auto p-2 rounded-lg shadow-md">
        {children}
      </main>
    </div>
  );
};

export default CustomerLayout;
