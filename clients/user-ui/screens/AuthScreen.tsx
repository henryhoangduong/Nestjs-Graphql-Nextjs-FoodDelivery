import React, { useState } from "react";
import { Modal, ModalContent } from "@heroui/react";

import Login from "@/shared/Auth/Login";
import SignUp from "@/shared/Auth/SignUp";

const AuthScreen = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [activateState, setActiveState] = useState("Login");
  const handleChangeState = (state: string) => {
    setActiveState(state);
  };

  return (
    <>
      <Modal className="p-4" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {activateState === "Login" && (
            <Login handleChangeState={handleChangeState} />
          )}
          {activateState === "SignUp" && (
            <SignUp handleChangeState={handleChangeState} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthScreen;
