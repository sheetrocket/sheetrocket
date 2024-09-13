import React from "react";
import { Provider } from "react-redux";
import store from "./app/redux/store";

export const ProviderWrapper = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};
