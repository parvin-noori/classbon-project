import React from "react";
import { RatingProps } from "./rating.types";
import { IconStar } from "../icons";
import { Size } from "../types/size.type";

const sizeClasses:Record<Size,number>={
tiny:14,
small:18,
normal:24,
large:30
}

export const Rating:React.FC<RatingProps>=({rate,className,size="normal",variant="warning"})=>{
    return(
        <div className={`flex gap-1 ${className}`}>
            {[1,2,3,4,5].map((index)=>(
                <IconStar key={`star-${index}`} width={sizeClasses[size]} height={sizeClasses[size]} fill={rate>=index?`--color-${variant}`:``} color={rate>=index?`--color-${variant}`:`currentColor`}/>
            ))}
        </div>
    )
}