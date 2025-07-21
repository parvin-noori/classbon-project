interface Problem{
    title:string;
    status:number;
    detail?:string;
    errors?:Record<string,string[]>
}

interface BadRequestError extends Problem{}
interface unauthorizedError extends Problem{}
interface validationError extends Problem{}
interface notFoundError extends Problem{}
interface unhandleException extends Problem{}
interface networkError extends Problem{}


type ApiError=BadRequestError |unauthorizedError|validationError|notFoundError|unhandleException|networkError


export type {
    Problem,
    ApiError,
    BadRequestError,
    unauthorizedError,
    validationError,
    notFoundError,
    unhandleException,
    networkError
}