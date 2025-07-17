'use client'

import { readData } from "@/core/http-service"
import { useEffect } from "react"

export const CourseComments=()=>{

    useEffect(()=>{
        readData("/bad-request")
    })
    return(
        <></>
    )
}

export default CourseComments