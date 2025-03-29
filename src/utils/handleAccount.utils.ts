import axios from "axios";
import { TypeUser } from "../UnauthorisedControls/unauthorizedControl.types";

export const logout = async () => {
  try {
    const url = "/api/logout";
    await axios.post(url);
    console.log("cookie cleared successfully");
    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
};

export const deleteAccount = async (user: TypeUser | null) => {
  try {
    if (user) {
      const url = "/api/deleteaccount";
      const data = { email: user.email };

      await axios.post(url, data);
      console.log("Account deleted Successfully");
      window.location.href = "/";
    }
  } catch (err) {
    console.error(err);
  }
};
