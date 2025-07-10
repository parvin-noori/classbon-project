import React from "react";
import { PriceProps } from "./price.types";
import { Size } from "../types/size.type";
import { IconToman } from "../icons";
import { Badge } from "../badge";

const sizeClasses:Record<Size,{textSize:string,svgSize:number}>={
    tiny:{textSize:"text-md",svgSize:16},
    small:{textSize:"text-xl",svgSize:18},
    normal:{textSize:"text-2xl",svgSize:20},
    large:{textSize:"text-3xl",svgSize:22},
}

export const Price:React.FC<PriceProps>=({
    size="normal",
    price,
    className,
    text="رایگان"
})=>{
    const svgSize=sizeClasses[size].svgSize
    return(
<>
{price !=null && price>0 ?(
<span className={`flex items-center font-bold gap-1 dark:text-white/90 ${sizeClasses[size].textSize}`}>
{price.toLocaleString()}
<IconToman width={svgSize} height={svgSize} viewBox="0 0 16 16" strokeWidth={1}/>
</span>
):(
<Badge variant="success" size="small">{text}</Badge>
)}
</>
    )
}