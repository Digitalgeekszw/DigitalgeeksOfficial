import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { UserIcon } from "./LockIcon.jsx";

export default function Modals() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" size="lg">
        Register
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Full Name"
                  placeholder="Enter your FullName"
                  type="Name"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Send Email Notifications on upcoming events
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={
                    "https://www.linkedin.com/posts/digitalgeeksz_join-us-as-we-unveil-the-future-of-human-computer-activity-7122973315329081344-ONAn?utm_source=share&utm_medium=member_ios"
                  }
                >
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
