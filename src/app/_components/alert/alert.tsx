import React from "react";
import { AlertProps } from "./alert.types";
import classNames from "classnames";
import { IconInfo } from "../icons";

export const Alert:React.FC<AlertProps>=({
    showIcon=true,
    children,
    className,
    variant
})=>{
    const classes=classNames("alert",{[`alert-${variant}`]:variant},className)
    return(
       <div className={classes}>
        {showIcon && <IconInfo width={18}/>}
        {children}
       </div> 
    )
}