import React from "react";
import styles from "../style";
import { logo2 } from "../assets";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { Mako } from "../assets";

const CTA = () => {
  const handleButtonClicked = () => {
    window.open("https://www.linkedin.com/company/92799402/", "_blank");
  };

  return (
    <section
      className={`${styles.flexCenter}  ${styles.padding} sm:flex-col flex-row bg-black-gradient-2 rounded-[20px] box-shadow items-center justify-center`}
    >
      <Card isFooterBlurred className="  h-[700px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-end">
          <p className="text-tiny text-white uppercase font-bold">Online</p>
          <h4 className="text-white font-medium text-xl">
            Knowledge is power.
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={Mako}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src={logo2}
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">DIGITALGEEKS</p>
              <p className="text-tiny text-white/60">
                Online Webinars and Workshops
              </p>
            </div>
          </div>
          <Button
            color="primary"
            variant="solid"
            size="lg"
            onClick={() => {
              window.open(
                "https://www.linkedin.com/posts/digitalgeeksz_join-us-as-we-unveil-the-future-of-human-computer-activity-7122973315329081344-ONAn?utm_source=share&utm_medium=member_ios",
                "_blank"
              );
            }}
          >
            {" "}
            Register
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CTA;
