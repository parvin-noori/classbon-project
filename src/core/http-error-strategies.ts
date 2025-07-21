import { ApiError, BadRequestError, networkError, notFoundError, unauthorizedError, unhandleException, validationError } from "@/types/http-errors.interface";

export type apiErrorHandler=(errorData:ApiError)=> void;

export const badRequestErrorStrategy:apiErrorHandler=errorData=>{
    throw{
        ...errorData,
    } as BadRequestError
}

export const validationErrorStrategy:apiErrorHandler=errorData=>{
    throw{
        ...errorData
    } as validationError
}

export const notFoundErrorStrategy:apiErrorHandler=errorData=>{
    throw{
        ...errorData,
        detail:"سروس مورد نظر یافت نشد"
    } as notFoundError
}

export const unauthorizedErrorStrategy:apiErrorHandler=errorData=>{
    throw{
        ...errorData,
        detail:"دسترسی به سرویس مورد نظر امکان پذیر نمی باشد"
    } as unauthorizedError
}

export const unhandleExceptionStrategy:apiErrorHandler=errorData=>{
    throw{
        ...errorData,
        detail:"خطای سرور"
    } as unhandleException
}

export const networkErrorStrategy=()=>{
    throw{
        detail:"خطای شبکه"
    } as networkError
}



export const errorHandler:Record<number,apiErrorHandler>={
    400:errorData=>(errorData.errors?validationErrorStrategy:badRequestErrorStrategy)(errorData),
    403:unauthorizedErrorStrategy,
    404:notFoundErrorStrategy,
    500:unhandleExceptionStrategy
}