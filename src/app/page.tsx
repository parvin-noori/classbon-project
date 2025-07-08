import Image from "next/image";
import Colors from "./_components/colors/colors";
import { Button } from "./_components/button";
import { HomeHeroSection } from "./_components/home-hero-section/home-hero-section";
import { CoursesSummary } from "./types/course-summary.interface";
import { CourseCardList } from "./(courses)/_components/course-card-list";

 async function getNewestCourses(count:number):Promise<CoursesSummary[]>{
 const res=await fetch (`https://api.classbon.com/api/courses/newest/${count}`)
 return res.json()
}

export default async function Home() {
  const newestCourses=await getNewestCourses(4)
  return (
    <>
   <HomeHeroSection/>
   <section className="container pt-20">
    <div className="text-center xl:text-start">
      <h2 className="text-2xl font-extrabold">
        تازه ترین دوره های آموزشی
      </h2>
      <p>برای به روز ماندن، یاد گرفتن نکته های تازه ضروریه!</p>
    </div>
    <CourseCardList courses={newestCourses}/>
   </section>
    </>
  );
}
