import { InputHTMLAttributes } from "react"
import { ComponentBase } from "../types/component-base.type"

type TextboxType="text"|"email"|"number"|"password"

export type TextboxProps=ComponentBase & Omit<InputHTMLAttributes<HTMLInputElement>,"size"> &{
    type?:TextboxType
}