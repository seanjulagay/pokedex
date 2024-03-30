import React, { createContext, useEffect, useState } from "react";
import Shell from "./Shell";

export const ShellOpenedContext = createContext(null);

export default function Dex() {
  const [shellOpened, setShellOpened] = useState(false);

  useEffect(() => {
    console.log("Updated shellOpened", shellOpened);
  }, [shellOpened]);

  return (
    <div className="dex">
      <div className="dex-container">
        <ShellOpenedContext.Provider value={[shellOpened, setShellOpened]}>
          <Shell />
        </ShellOpenedContext.Provider>
      </div>
    </div>
  );
}
