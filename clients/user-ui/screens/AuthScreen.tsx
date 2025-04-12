import React from "react";
import { Modal, ModalContent } from "@heroui/react";

import Login from "@/shared/Auth/Login";

const AuthScreen = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <>
      <Modal className="p-4" isOpen={true} onOpenChange={onOpenChange}>
        <ModalContent>
          <Login />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthScreen;
