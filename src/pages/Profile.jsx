import { useContext } from "react";
import { CurrentUserContext } from "./AppLayout";

const Profile = () => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div>
      <h2 className="text-3xl font-bold ">
        {currentUser.firstName} {currentUser.lastName} : Profile
      </h2>
    </div>
  );
};

export default Profile;
