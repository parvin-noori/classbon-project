import { createData } from "@/core/http-service/http-service";
import { Signin } from "../_types/signin.types";
import { useMutation } from "@tanstack/react-query";

const signIn = (model: Signin): Promise<void> =>
  createData<Signin, void>("/signin", model);

type UseSigninOptions = {
  onSuccess?: () => void;
};

export const usesignin = ({ onSuccess }: UseSigninOptions) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: onSuccess,
  });

  return { submit, isPending };
};
