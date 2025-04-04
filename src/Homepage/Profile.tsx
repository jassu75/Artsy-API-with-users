import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  return user ? (
    <>
      <Image
        style={{ marginRight: "8px" }}
        src={user?.profileUrl}
        roundedCircle
        width="20"
        height="20"
      />
      {user?.fullname}
    </>
  ) : null;
};

export default Profile;
