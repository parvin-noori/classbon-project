import { API_URL } from "@/configs/globals";
import { BadRequestError, networkError, notFoundError, unauthorizedError, unhandleException, validationError } from "@/types/http-errors.interface";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

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

async function apiBase<T>(url:string,options?:AxiosRequestConfig):Promise<T>{
    const response:AxiosResponse=await httpService(url,options)

    return response.data as T
}


async function readData<T>(url:string,headers?:AxiosRequestHeaders):Promise<T>{
    const options:AxiosRequestConfig={
        headers:headers,
        method:"GET"
    }

    return await apiBase(url,options)
}

async function createData<Tmodel,Tresult>(url:string,data:Tmodel,headers?:AxiosRequestHeaders):Promise<Tresult>{
    const options:AxiosRequestConfig={
        headers:headers,
        method:"POST",
        data:JSON.stringify(data),
    }

    return await apiBase<Tresult>(url,options)
}

async function updateData<Tmodel,Tresult>(url:string,data:Tmodel,headers?:AxiosRequestHeaders):Promise<Tresult> {
 const options:AxiosRequestConfig={
    headers:headers,
    method:"PUT",
    data:JSON.stringify(data),
 }   

 return await apiBase<Tresult>(url,options)
}


async function deleteData(url:string,headers?:AxiosRequestHeaders):Promise<void>{
    const options:AxiosRequestConfig={
        headers:headers,
        method:"DELETE"
    }

    return await apiBase(url,options)
}


export {createData, readData, updateData, deleteData};