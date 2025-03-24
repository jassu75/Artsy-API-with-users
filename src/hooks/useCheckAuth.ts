import { useEffect, useState } from "react";
import { TypeUser } from "../UnauthorisedControls/unauthorizedControl.types";
import axios from "axios";

const useCheckAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<TypeUser | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const headers = {
          "Content-Type": "application/json",
        };
        const axiosOptions = {
          withCredentials: true,
          headers: headers,
        };
        const url = "/api/checkauth";
        const response = await axios.get(url, axiosOptions);
        setAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setAuthenticated(false);
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { authenticated, user, loading };
};

export default useCheckAuth;
