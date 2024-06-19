"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { useLazyLoginQuery } from "@/services/cargo.service";

import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: any;
}

export const Login = ({ isOpen, onOpenChange }: ModalProps) => {
  const { push } = useRouter();

  const [login, { isLoading }] = useLazyLoginQuery();
  const [state, setState] = useState({
    login: "",
    password: "",
  });

  const changeValue = (event: any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handlePost = async () => {
    try {
      const response = await login({ body: state }).unwrap();
      Cookies.set("user_token", response.token);
      push("/admin");
      onOpenChange(false);
    } catch (error) {}
  };

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
                  name="login"
                  value={state.login}
                  onChange={changeValue}
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
                  name="password"
                  value={state.password}
                  onChange={changeValue}
                  startContent={
                    <FaLock className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Button
                  fullWidth={true}
                  onClick={handlePost}
                  isLoading={isLoading}
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
