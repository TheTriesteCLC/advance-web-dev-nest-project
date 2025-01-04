import React, { useState } from "react";

const TabMenu = (props) => {
<<<<<<< HEAD
=======
  //   const data = [
  //     {
  //       id: 1,
  //       name: "Appd",
  //       Element: <span>📦 This is the App content.</span>,
  //     },
  //     {
  //       id: 2,
  //       name: "Messages",
  //       Element: <span>📄 These are your Messages.</span>,
  //     },
  //   ];
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
  const { tabs, bg } = props;
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const backgroundClass = bg || "bg-gradient-to-r from-gray-400 to-gray-500";

  return (
    <div>
<<<<<<< HEAD
      <div className={`w-full bg-gray-300 p-1 rounded-md`}>
=======
      <div className={`w-full ${backgroundClass} p-1 rounded-md`}>
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
        <div className="relative flex justify-between">
          {tabs?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.name)}
              className={`relative flex-1 text-center p-2 font-semibold text-black`}
            >
              {tab.name}
            </button>
          ))}
          <div
<<<<<<< HEAD
            className={`absolute bottom-0 h-10 rounded-md shadow-lg transform transition-all duration-300 ease-in-out bg-white opacity-100`}
=======
            className={`absolute bottom-0 h-10 rounded-md shadow-lg transform transition-all duration-300 ease-in-out bg-white`}
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
            style={{
              width: `${100 / tabs.length}%`,
              left: `${
                tabs.findIndex((tab) => tab.name === activeTab) *
                (100 / tabs.length)
              }%`,
            }}
          >
<<<<<<< HEAD
            <div
              className={`flex-1 text-center p-2 font-semibold text-black mx-auto flex transform transition-all duration-300 
              ease-in-out bg-white rounded-md items-center justify-center`}
              style={{ opacity: 0.9 }}
            >
              {activeTab}
            </div>
=======
            <button
              className={`flex-1 text-center p-2 font-semibold text-black mx-auto flex transform transition-all duration-300 ease-in-out`}
            >
              {activeTab}
            </button>
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
          </div>
        </div>
      </div>
      {tabs?.map((tab) => (
        <div
          key={tab.id}
          className={`py-4 w-full h-full   ${
            activeTab === tab.name ? "block" : "hidden"
          }`}
        >
          {tab.Element}
        </div>
      ))}
    </div>
  );
};

export default TabMenu;
