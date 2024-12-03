import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthProvider";
import { login as request } from "../../services/authServices";

const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (user) => request(user),
    onSuccess: (data) => {
      login(data.token);
    },
  });
};

export default useLogin;
