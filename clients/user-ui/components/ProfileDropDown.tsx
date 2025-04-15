"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Avatar } from "@heroui/avatar";
import { CgProfile } from "react-icons/cg";

import AuthScreen from "@/screens/AuthScreen";
const ProfileDropDown = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as={"button"}
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key={"profile"} className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">support@henry.com</p>
            </DropdownItem>
            <DropdownItem key={"settings"}>My Profile</DropdownItem>
            <DropdownItem key={"all_orders"}>All Orders</DropdownItem>
            <DropdownItem key={"team_settings"}>
              Apply for seller orders
            </DropdownItem>
            <DropdownItem key={"logout"}>Log out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile
          className="text-2xl cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
      {!open ? (
        <div
          className="text-white cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          Login
        </div>
      ) : (
        <AuthScreen
          isOpen={open}
          onOpenChange={() => {
            setOpen(!open);
          }}
        />
      )}
    </div>
  );
};

export default ProfileDropDown;
