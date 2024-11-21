import { useSelector } from "react-redux";
const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  return { isLoggedIn: !!user, user };
};
export default useAuth;