import Image from "react-bootstrap/Image";
import { TypeUser } from "../UnauthorisedControls/unauthorizedControl.types";

const Profile = ({ user }: { user: TypeUser | null }) => {
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
