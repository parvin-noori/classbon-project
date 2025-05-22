import React from "react";
import { ButtonProps, ButtonShape } from "./button.type";
import classNames from "classnames";
import { Size } from "../types/size.type";

const sizeClasses:Record<Size,string>={
    tiny:"btn-xs",
    small:"btn-sm",
    normal:"",
    large:"btn-lg"
}


const shapeClasses:Record<ButtonShape,string>={
    default:"",
    wide:"btn-wide",
    full:"btn-block",
    square:"btn-square"
}
export const Button:React.FC<ButtonProps>=({
    variant,
    size="normal",
    isDisabled=false,
    isOutline=false,
    shape="default",
    isLoading=false,
    loadingType="spinner",
    loadingText="در حال درخواست...",
    type="button",
    isLink=false,
    animatedIcon=false,
    className,
    children,
    ...rest
}:ButtonProps)=>{
    const classes=classNames(
        'btn',
        className,
        {'btn-outline':isOutline},
        {'btn-link':isLink},
        {'animated-icon':animatedIcon},
        {'pointer-events-none opaicty-80':isLoading},
        {[`btn-${variant}`]:variant},
        {[`${sizeClasses[size]}`]:size},
        {[`${shapeClasses[shape]}`]:shape},
    );
    return(
        <button type={type} disabled={isDisabled} {...rest} className={classes}>
            {isLoading?loadingText:children}
        </button>
    )
}