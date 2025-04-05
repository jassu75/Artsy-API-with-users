import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setAuthentication } from "../redux/user.slice";

const useCheckAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

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
        const url = "/api/checkAuth";
        const response = await axios.get(url, axiosOptions);
        dispatch(setAuthentication(true));
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(setAuthentication(false));
        if (!(axios.isAxiosError(error) && error.response?.status === 400)) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  return { loading };
};

export default useCheckAuth;
