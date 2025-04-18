import React from "react";
import Link from "next/link";
const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About us",
    url: "/about",
  },
  {
    title: "Restaurants",
    url: "/restaurants",
  },
  {
    title: "Popular Foods",
    url: "/foods",
  },
];

const NavItems = ({ activeItem = 0 }: { activeItem?: number }) => {
  return (
    <div>
      {navItems.map((item, index) => (
        <Link
          key={item.url}
          className={`px-5 text-[18px] font-Poppins font-[500] ${
            activeItem === index ? "text-[#37b668]" : "text-white"
          }`}
          href={item.url}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
