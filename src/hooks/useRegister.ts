import { useState } from "react";
import { TypeUserRegister } from "../UnauthorisedControls/unauthorizedControl.types";
import axios from "axios";

const useRegister = () => {
  const [error, setError] = useState<boolean>(false);

  const registerUser = async (registerData: TypeUserRegister) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const axiosOptions = {
        headers: headers,
      };
      const url = "/api/db/register";
      setError(false);
      await axios.post(url, registerData, axiosOptions);
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
  return { error, setError, registerUser };
};

export default useRegister;
