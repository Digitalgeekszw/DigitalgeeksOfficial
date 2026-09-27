"use client";

import { NextUIProvider } from "@nextui-org/react";
import RevealObserver from "../components/site/RevealObserver";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      {children}
      <RevealObserver />
    </NextUIProvider>
  );
}
