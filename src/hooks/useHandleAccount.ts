import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  setAuthentication,
  setFavoriteList,
  setFavoriteListIds,
  setUser,
} from "../redux/user.slice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

const useHandleAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const logout = async () => {
    try {
      const url = "/api/logout";
      await axios.post(url);
      const notification = {
        id: Date.now(),
        message: "Logged out",
        type: "logout",
      };
      dispatch(addNotification(notification));

      dispatch(setAuthentication(false));
      dispatch(setUser(null));
      dispatch(setFavoriteList(null));
      dispatch(setFavoriteListIds(null));
      console.log("cookie cleared successfully");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async () => {
    try {
      if (user) {
        const url = "/api/deleteaccount";
        const data = { email: user.email };

        await axios.post(url, data);
        const notification = {
          id: Date.now(),
          message: "Account Deleted",
          type: "deleteAccount",
        };
        dispatch(addNotification(notification));
        dispatch(setAuthentication(false));
        dispatch(setUser(null));
        dispatch(setFavoriteList(null));
        dispatch(setFavoriteListIds(null));
        console.log("Account deleted Successfully");

        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { logout, deleteAccount };
};
export default useHandleAccount;
