import { JSX } from "react";

export type unAuthorizedControlComponent = {
  register: JSX.Element;
  login: JSX.Element;
  search: JSX.Element;
};

export type unAuthorizedControlKey = "register" | "search" | "login";
