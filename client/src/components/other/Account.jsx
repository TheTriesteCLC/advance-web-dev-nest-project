import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import Notify from "./Notify";
import { Menu, MenuItem } from "@mui/material";
import { clearAccount } from "../../redux/features/accountSlice";
import { clearProfile } from "../../redux/features/profileSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
=======
import { useDispatch } from "react-redux";
// import Notify from "./Notify";
import { Menu, MenuItem } from "@mui/material";

>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
const ButtonItem = ({ name, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <MenuItem
      onClick={handleClick}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left min-w-[120px]"
    >
      {name}
    </MenuItem>
  );
};

const ButtonLogout = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    // Clear Redux state
    dispatch(clearAccount());
    dispatch(clearProfile());

    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    message.success("Đăng xuất thành công");
    navigate("/");
  };

=======
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
  return (
    <MenuItem
      onClick={handleClick}
      className="block px-4 py-2 text-red-700 hover:bg-gray-100 w-full text-left"
    >
      <h1 className="text-ret">Logout</h1>
    </MenuItem>
  );
};

const AccountDropdown = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

<<<<<<< HEAD
  const profile = useSelector((state) => state.profile);

=======
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
  const toggleDropdown = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
<<<<<<< HEAD
        <a className="text-gray-600 select-none"> {profile.full_name}</a>
=======
        <a className="text-gray-600 select-none">English</a>
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
        <a className="text-gray-600">
          <AccountCircleIcon />
          {anchorEl ? (
            <ArrowDropUpIcon className="ml-1" />
          ) : (
            <ArrowDropDownIcon className="ml-1" />
          )}
        </a>
      </div>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "options-menu",
        }}
        className="py-1 text-gray-700 dark:text-gray-400 text-sm"
      >
        {children}
      </Menu>
    </div>
  );
};

<<<<<<< HEAD
const Account = () => {
  const studentItems = [{ name: "Profile", path: "/profile" }];

  return (
    <div className=" p-2 flex items-center space-x-4 gap-4">
      <Notify />
      <AccountDropdown>
        {studentItems.map((item, index) => (
=======
const AdminAccount = () => {
  const studentItems = [{ name: "Profile", path: "/profile" }];

  return (
    <AccountDropdown>
      {studentItems.map((item, index) => (
        <ButtonItem key={index} name={item.name} path={item.path} />
      ))}
      <ButtonLogout />
    </AccountDropdown>
  );
};

const StaffAccount = () => {
  const staffItems = [
    { name: "Profile", path: "/profile" },
    { name: "Revenue", path: "/revenue" },
  ];

  return (
    <div className="flex items-center space-x-4 cursor-pointer z-50">
      {/* <Notify /> */}
      <AccountDropdown>
        {staffItems.map((item, index) => (
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
          <ButtonItem key={index} name={item.name} path={item.path} />
        ))}
        <ButtonLogout />
      </AccountDropdown>
    </div>
  );
};

<<<<<<< HEAD
export default Account;
=======
// const StudentAccount = () => {
//   const studentItems = [
//     { name: "Profile", path: "/profile" },
//     { name: "Cart", path: "/cart" },
//   ];

//   return (
//     <div className="relative">
//       <div className="flex items-center space-x-4 cursor-pointer">
//         <ChatIcon />
//         <Notify />
//         <AccountDropdown>
//           {studentItems.map((item, index) => (
//             <ButtonItem key={index} name={item.name} path={item.path} />
//           ))}
//           <ButtonLogout />
//         </AccountDropdown>
//       </div>
//     </div>
//   );
// };

export { AdminAccount, StaffAccount };
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
