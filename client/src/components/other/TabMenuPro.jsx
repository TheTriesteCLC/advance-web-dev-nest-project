import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";


const TabMenuProService = () => {
  const dadaTab = {
    Student: [
      {
        id: 1,
        name: "Information",
        com: <h1>Information</h1>,
      },
      {
        id: 2,
        name: "Finance",
        com: <h1>Finance</h1>,
      },
      {
        id: 3,
        name: "Education",
        com: <h1>Education</h1>,
      },
    ],
  };

  const [tabRow, setTabRow] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const userRole = useSelector((state) => state.profile.Role);
  const dispatch = useDispatch();
  const handleReload = () => {
    const roleTabs = dadaTab["Student"];
    setTabRow(roleTabs);
    if (roleTabs.length > 0) {
      setActiveTab(roleTabs[0].name);
    }
  };
  useEffect(() => {
    handleReload();
  }, ["Student"]);

  useEffect(() => {
  
  }, [activeTab]);
  return {
    tabRow,
    setTabRow,
    activeTab,
    setActiveTab,
    handleReload,
  };
};
const TabMenuPro = (props) => {
  const { tabRow, activeTab, setActiveTab } = TabMenuProService();
  return (
    <div>
      <div
        className={`min-w-full ${props.className} p-1 rounded-md my-auto inline-block `}
      >
        <div className="relative flex justify-between">
          {tabRow.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.name)}
              className={`relative flex-1 text-center p-2 font-semibold text-black`}
            >
              <span className="relative z-10">{tab.name}</span>{" "}
            </button>
          ))}
          <div
            className={`absolute bottom-0 h-10 rounded-md shadow-lg transform transition-all duration-300 ease-in-out bg-white opacity-100`}
            style={{
              width: `${100 / tabRow.length}%`,
              left: `${
                tabRow.findIndex((tab) => tab.name === activeTab) *
                (100 / tabRow.length)
              }%`,
            }}
          >
            <div
              className="flex-1 text-center p-2 font-semibold text-black mx-auto flex transform transition-all duration-300 
              ease-in-out bg-white rounded-md items-center justify-center"
              style={{ opacity: 0.9 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Content = (props) => {
  return <>{props.children}</>;
};

const TabMenuProContentProfile = () => {
  const { tabRow } = TabMenuProService();
  const activeTabSlice = useSelector((state) => state.globalState.activeTab);

  return (
    <>
      {tabRow.map((tab, index) => {
        const Page = tab.com === null ? Fragment : tab.com;
        return (
          <Content key={index}>
            {activeTabSlice === tab.name && <Page />}
          </Content>
        );
      })}
    </>
  );
};

export { TabMenuPro, TabMenuProContentProfile };
