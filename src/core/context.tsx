import React, { createContext, useState, FC, ReactNode } from "react";
import { ExpireManager } from "./ExpireManager";

export const ExpireManagerContext = createContext<ExpireManager | null>(null);

type ExpireManagerProviderProps = {
  children: ReactNode;
};

export const ExpireManagerProvider: FC<ExpireManagerProviderProps> = ({
  children,
}) => {
  const [expireManager] = useState(() => ExpireManager.getInstance());
  return (
    <ExpireManagerContext.Provider value={expireManager}>
      {children}
    </ExpireManagerContext.Provider>
  );
};
