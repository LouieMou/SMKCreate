import { createContext, useState } from "react";

const OverlayContext = createContext();

export default function OverlayProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OverlayContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </OverlayContext.Provider>
  );
}
