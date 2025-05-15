// AnyComponent.js
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return <div className="text-blue-700">Welcome, {user?.email}</div>;
};
export default Profile; 