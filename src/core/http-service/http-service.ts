import { API_URL } from "@/configs/globals";
import { ApiError} from "@/types/http-errors.interface";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { errorHandler, networkErrorStrategy } from "../http-error-strategies";


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

                errorHandler[statusCode](errorData)

            }

        }else{
          networkErrorStrategy()
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