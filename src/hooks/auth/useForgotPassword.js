import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/authServices";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
  });
};

export default useForgotPassword;
