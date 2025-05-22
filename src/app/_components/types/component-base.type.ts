import { Size } from "./size.type";
import { Varitant } from "./varitant.type";

export type ComponentBase = {
    isDisabled?:boolean;
    className?:string;
    varitant?:Varitant
    size?:Size
}