import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../services/user";

const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (user) => deleteAccount(user),
  });
};

export default useDeleteAccount;
