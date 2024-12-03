import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthProvider";
import { register } from "../../services/authServices";

const useRegister = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (user) => register(user),
    onSuccess: (data) => {
      login(data.token);
    },
  });
};

export default useRegister;
