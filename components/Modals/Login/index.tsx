import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: any;
}

export const Login = ({ isOpen, onOpenChange }: ModalProps) => {
  return (
    <>
      <Modal
        placement="center"
        className="bg-blackRoot pb-4"
        size="sm"
        radius="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-milk font-mono">
                Для администратора <br /> Введите логин и пароль.
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <Input
                  isRequired
                  type="text"
                  label="Логин"
                  fullWidth={true}
                  placeholder="Введите логин..."
                  className="font-mono"
                  radius="sm"
                  startContent={
                    <FaUser className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input
                  isRequired
                  type="text"
                  label="Пароль"
                  fullWidth={true}
                  placeholder="Введите пароль..."
                  className="font-mono"
                  radius="sm"
                  startContent={
                    <FaLock className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Button
                  fullWidth={true}
                  className="font-mono mt-3 text-lg font-medium bg-gray-100 text-black/60"
                >
                  Войти
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
