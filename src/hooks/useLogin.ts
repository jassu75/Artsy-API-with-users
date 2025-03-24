import { useState } from "react";
import { TypeUserLogin } from "../UnauthorisedControls/unauthorizedControl.types";
import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState<boolean>(false);

  const loginUser = async (loginData: TypeUserLogin) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const axiosOptions = {
        headers: headers,
      };
      const url = "/api/db/login";
      setError(false);
      await axios.post(url, loginData, axiosOptions);
      window.location.href = "/";
    } catch (err) {
      setError(true);
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError(true);
      } else {
        console.error(err);
      }
    }
  };
  return { error, setError, loginUser };
};

export default useLogin;
