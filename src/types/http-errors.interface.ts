interface Problem{
    title:string;
    statusCode:number;
    detail?:string;
    errors?:Record<string,string[]>
}

interface BadRequestError extends Problem{}
interface unauthorizedError extends Problem{}
interface validationError extends Problem{}
interface notFoundError extends Problem{}
interface unhandleException extends Problem{}
interface networkError extends Problem{}


export type {
    Problem,
    BadRequestError,
    unauthorizedError,
    validationError,
    notFoundError,
    unhandleException,
    networkError
}