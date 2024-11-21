import { useAuth } from "../context/AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl font-bold ">
        {user.firstName} {user.lastName} : Profile
      </h2>
    </div>
  );
};

export default Profile;
