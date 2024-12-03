import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/authServices";

const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload) => resetPassword(payload),
  });
};

export default useResetPassword;
