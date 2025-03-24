import axios from "axios";

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
