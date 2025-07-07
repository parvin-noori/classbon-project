import Image from "next/image";
import Colors from "./_components/colors/colors";
import { Button } from "./_components/button";
import { HomeHeroSection } from "./_components/home-hero-section/home-hero-section";
import { CoursesSummary } from "./types/course-summary.interface";

 async function getNewestCourses(count:number):Promise<CoursesSummary[]>{
 const res=await fetch (`https://api.classbon.com/api/courses/newest/${count}`)
 return res.json()
}

export default async function Home() {
  const newestCourses=await getNewestCourses(4)
  return (
    <>
   <HomeHeroSection/>
   {newestCourses.map(course=>(
    <p key={course.id}>{course.title}</p>
   ))}
    </>
  );
}
