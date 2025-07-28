import React from "react";
import { Size } from "../types/size.type";
import { TextboxProps } from "./textbox.types";
import classNames from "classnames";

const sizeClasses:Record<Size,string>={
    tiny:"textbox-xs",
    small:"textbox-sm",
    normal:"textbox-md",
    large:"textbox-lg",
}

export const TextBox:React.FC<TextboxProps>=({variant="ghost",className,size="normal",type="text",...rest})=>{
    const classes=classNames("textbox","w-full",className,{[`textbox-${variant}`]:variant},{[`${sizeClasses[size]}`]:size})
    return(
<input type={type} className={classes} {...rest}/>
    )
}