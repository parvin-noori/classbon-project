import { CoursesSummary } from "@/types/course-summary.interface"
import React from "react"
import { CourseCard } from "./course-card"
import { API_URL } from "@/configs/globals"

export type CourseCardListProps={
    courses:CoursesSummary[]
}
 async function getNewestCourses(count:number):Promise<CoursesSummary[]>{
  await new Promise((resolve)=>setTimeout(resolve,5000))
 const res=await fetch (`${API_URL}/courses/newest/${count}`,{
  cache:'no-store'
 })
 return res.json()
}

export const CourseCardList:React.FC<CourseCardListProps>=async ({courses}:CourseCardListProps)=>{
    const newestCoursesData=await getNewestCourses(4)
return(
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
        {newestCoursesData.map(course=>(
            <CourseCard key={`course-${course.slug}`} {...course}/>
        ))}
    </div>
)
}