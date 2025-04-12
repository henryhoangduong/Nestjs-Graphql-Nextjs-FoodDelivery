import React from "react";

import NavItems from "../NavItem";
import ProfileDropDown from "../ProfileDropDown";

const Header = () => {
  return (
    <header className="w-full h-[80px] bg-[#0F1524] flex items-center justify-between">
      <div className="w-[90%] m-auto flex items-center justify-between">
        <h1 className={"text-[25px] font-Poppins font-[500]"}>Henry</h1>
        <NavItems />
        <ProfileDropDown />
      </div>
    </header>
  );
};

export default Header;
