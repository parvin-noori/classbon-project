'use client'

import { Button } from "@/app/_components/button"
import { TextBox } from "@/app/_components/textbox"
import { useForm } from "react-hook-form"
import { Signin } from "../types/signin.types"

export const SigninForm = () => {

  const {handleSubmit,register,formState:{errors}}=useForm<Signin>()

  const onSubmit=(data:any)=>{
    console.log(data)
  }
    return(
        <>
        <h5 className="text-2xl">ورود | ثبت نام</h5>
        <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
        <form className="flex flex-col gap-6 mt-16" onSubmit={handleSubmit(onSubmit)}>
          <TextBox {...register('mobile',{required:"شماره موبایل الزامی است"})} placeholder="شماره موبایل"/>
          <Button type="submit" variant="primary">
            تایید و دریافت کد
          </Button>
        </form>
      </>
    )
}