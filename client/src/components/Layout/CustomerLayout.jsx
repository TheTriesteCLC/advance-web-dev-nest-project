import React, { useState, useEffect } from "react";

// // 

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 ">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center  ">
        <h1 className="text-4xl font-semibold text-[#0156d1] ">coursera</h1>
 
      </div>

      <div className=" shadow-md border-t ">
        <div className="container mx-auto px-6 py-2 flex space-x-6">
          {/* {StudentRouter.map((item, index) => (
            <Buttons key={index} name={item.name} path={item.path} />
          ))} */}
        </div>
      </div>
    </nav>
  );
};

const CustomerLayout = ({ children }) => {


  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-200 fixed w-full h-[100px] z-50">
        <Navbar />
      </header>
      <main className="flex-1 mt-32 pb-[10px]">
        {children}
        {/* <ChatApp /> */}
      </main>
    </div>
  );
};

export default CustomerLayout;
