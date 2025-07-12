import { CoursesSummary } from "@/types/course-summary.interface"
import React from "react"
import { CourseCard } from "./course-card"
import { API_URL } from "@/configs/globals"

export type CourseCardListProps={
    courses:CoursesSummary[]
}

export const CourseCardList:React.FC<CourseCardListProps>=async ({courses}:CourseCardListProps)=>{
    // const newestCoursesData=await getNewestCourses(4)
return(
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
        {courses.map(course=>(
            <CourseCard key={`course-${course.slug}`} {...course}/>
        ))}
    </div>
)
}