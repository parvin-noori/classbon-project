"use client";

import { Button } from "@/app/_components/button";
import { TextBox } from "@/app/_components/textbox";
import { useForm } from "react-hook-form";
import { Signin } from "../_types/signin.types";
import { TextInput } from "@/app/_components/text-form";
import { usesignin } from "../_api/signin";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/notification.store";
import { useEffect } from "react";

export const SigninForm = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<Signin>();

  const router = useRouter();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const signIn = usesignin({
    onSuccess: () => {
      router.push(`/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: "کد تایید به شماره شمار ارسال شد",
        type: "info",
      });
    },
  });

  const onSubmit = (data: Signin) => {
    signIn.submit(data);
  };
  return (
    <>
      <h5 className="text-2xl">ورود | ثبت نام</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        className="flex flex-col gap-6 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput<Signin>
          register={register}
          name={"mobile"}
          rules={{
            required: "شماره موبایل الزامی است",
            maxLength: {
              value: 11,
              message: "شماره موبایل باید 11 رقم باشد",
            },
            minLength: {
              value: 11,
              message: "شماره موبایل باید 11 رقم باشد",
            },
          }}
          errors={errors}
        />
        {/* <TextBox {...register('mobile',{required:"شماره موبایل الزامی است"})} placeholder="شماره موبایل"/> */}
        <Button type="submit" variant="primary" isLoading={signIn.isPending}>
          تایید و دریافت کد
        </Button>
      </form>
    </>
  );
};
