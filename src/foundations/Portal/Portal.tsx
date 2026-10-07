import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement | null;
}

export const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const target = container || document.body;
  return createPortal(children, target);
};
