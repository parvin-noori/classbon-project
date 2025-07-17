import { API_URL } from "@/configs/globals";
import { BadRequestError, networkError, notFoundError, unauthorizedError, unhandleException, validationError } from "@/types/http-errors.interface";
import axios from "axios";

type ApiError=BadRequestError |unauthorizedError|validationError|notFoundError|unhandleException|networkError

const httpService=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

httpService.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
         if(error?.response){
            const statusCode=error?.response.status

            if(statusCode>=400){
                const errorData:ApiError=error?.response?.data

                if(statusCode===400 && !errorData.errors){
                    throw{
                        ...errorData,
                    } as BadRequestError
                }

                if(statusCode===400 && errorData.errors){
                    throw{
                        ...errorData
                    } as validationError
                }

                if(statusCode===404){
                    throw{
                        ...errorData,
                        detail:"سروس مورد نظر یافت نشد"
                    } as notFoundError
                }

                if(statusCode===403){
                    throw{
                        ...errorData,
                        detail:"دسترسی به سرویس مورد نظر امکان پذیر نمی باشد"
                    } as unauthorizedError
                }

                if (statusCode>=500){
                    throw{
                        ...statusCode,
                        detail:"خطای سرور"
                    } as unhandleException
                }
            }else{
                throw{
                    detail:"خطای شبکه"
                } as networkError
            }

        }
    }
)