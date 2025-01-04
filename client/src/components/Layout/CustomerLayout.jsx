import React, { useState, useEffect } from "react";
import CustomerRouter from "../../routes/Customer";
import { useNavigate, useLocation } from "react-router-dom";
import Account from "../../components/other/Account";
const Header = () => {
  const location = useLocation(); // Lấy thông tin URL hiện tại
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const currentTab = CustomerRouter.find(
      (tab) => tab.path === location.pathname
    );
    if (currentTab) {
      setActiveTab(currentTab.name);
    }
  }, [location.pathname]); // Đồng bộ activeTab với URL hiện tại

  const handleClicked = (tab) => {
    setActiveTab(tab.name); // Cập nhật tab hiện tại
    navigate(tab.path); // Điều hướng tới đường dẫn tương ứng
  };

  return (
    <div className="w-auto">
      <div className="max-w-6xl mx-auto transition-all duration-300">
        <div className="flex justify-around py-4 gap-2 ">
          {CustomerRouter.filter((tab) => tab.name !== null).map(
            (tab, index) => (
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
            )
          )}
        </div>
      </div>
    </div>
  );
};
const CustomerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex items-center justify-between bg-white  px-4 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-700 ">SANK COM BA</h1>
        <Header />
        <div className="flex items-center ">
          <Account />
        </div>
      </header>

      <main className="bg-white min-w-[55vw] min-h-[80vh] my-4 mx-auto p-2 rounded-lg shadow-md">
        {children}
      </main>
    </div>
  );
};

export default CustomerLayout;
