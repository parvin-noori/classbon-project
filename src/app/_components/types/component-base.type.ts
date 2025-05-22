import { Size } from "./size.type";
import { variant } from "./variant.type";

export type ComponentBase = {
    isDisabled?:boolean;
    className?:string;
    variant?:variant
    size?:Size
}