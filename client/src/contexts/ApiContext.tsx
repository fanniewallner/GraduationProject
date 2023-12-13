import axios from "axios";
import { ReactElement, createContext, useEffect, useState } from "react";

export type AppConfigContextState = {
  clientUrl: string;
  apiBaseUrl: string;
};

const contextDefaultValues: AppConfigContextState = {
  apiBaseUrl: "",
  clientUrl: "",
};

type Props = {
  children: ReactElement;
};

export const AppConfigContext =
  createContext<AppConfigContextState>(contextDefaultValues);

const AppConfigProvider = ({ children }: Props) => {
  const [appConfigContextState, setAppConfigContextState] =
    useState<AppConfigContextState>();
  useEffect(() => {
    axios
      .get<AppConfigContextState>("/config.json")
      .then((res) => setAppConfigContextState(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return appConfigContextState !== undefined ? (
    <AppConfigContext.Provider value={appConfigContextState}>
      {children}
    </AppConfigContext.Provider>
  ) : (
    <></>
  );
};

export default AppConfigProvider;
