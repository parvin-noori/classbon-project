import Image from "next/image";
import Colors from "./_components/colors/colors";
import { Button } from "./_components/button";
import { HomeHeroSection } from "./_components/home-hero-section/home-hero-section";
import { CoursesSummary } from "../types/course-summary.interface";
import { CourseCardList } from "./(courses)/_components/course-card-list";
import { homeFeatures } from "@/data/home-features";
import { Feature } from "./_components/feature/feature";
import { IconArrowLeftFill } from "./_components/icons";
import { BlogPostSummary } from "../types/blog-post-summary.interface";
import { API_URL } from "@/configs/globals";
import { Suspense } from "react";
import { CardPlaceholder } from "./_components/placeholders";


 async function getNewestPosts(count:number):Promise<BlogPostSummary[]>{
 const res=await fetch (`${API_URL}/blog/newest/${count}`)
 return res.json()
}

export default async function Home() {
  const newestPostsData= getNewestPosts(4)

  const [newestPosts]=await Promise.all([newestPostsData])

  console.log(newestPosts)

  return (
    <>
   <HomeHeroSection/>
   <section className="dark:bg-base-75 mt-10">
    <div className="container py-10 flex flex-col lg:flex-row gap-10 xl:gap-5">

    {homeFeatures.map(feature=>(
      <Feature feature={feature} key={`feature-${feature.title}`}/>
    ))}
    </div>
   </section>
   <section className="container pt-20">
    <div className="text-center xl:text-start">
      <h2 className="text-2xl font-extrabold">
        تازه ترین دوره های آموزشی
      </h2>
      <p>برای به روز ماندن، یاد گرفتن نکته های تازه ضروریه!</p>
    </div>
    <Suspense fallback={<CardPlaceholder count={4} className="mt-4"/>}>

    <CourseCardList courses={[]}/>
    </Suspense>
   </section>
   <section className="px-2 my-40">
                {/* <div className="sticky top-0 pt-0 text-center"> */}
                <div className="relative pt-0 text-center">
                    <div className="bg-primary pointer-events-none absolute left-1/2 aspect-square w-1/2 -translate-x-1/2 -top-96 rounded-full opacity-10 blur-3xl"></div>

                    <h2
                        lang="en"
                        className="gradient-reverse leading-[1.3] relative z-10 mx-auto inline-block text-[clamp(2rem,6vw,5.5rem)] font-black"
                    >
                        ReactJs & Next.js
                    </h2>
                    <p className="text-base-content/70  relative z-[2] py-4 m-auto md:text-3xl max-w-5xl font-light !leading-[1.7]">
                        ری‌اکت و نکست‌جی‌اس برترین کتابخونه‌های فرانت‌اند و
                        یکه‌تاز دنیای وب! پیشرفته‌ترین مباحث رو اینجا می تونی
                        پیدا کنی. پس همین الان یادگیری رو شروع کن ما هم از
                        ابتدای مسیر با آموزش‌های تخصصی و کاملاً کاربردی کنارت
                        هستیم.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button
                            variant="primary"
                            size="large"
                            className="mt-7"
                            animatedIcon={true}
                        >
                            دوره‌های ری اکت و نکست‌ جی‌اس
                            <IconArrowLeftFill fill="currentColor" />
                        </Button>
                        <Button
                            variant="neutral"
                            size="large"
                            className="mt-7"
                            animatedIcon={true}
                        >
                            مقالات ری اکت و نکست‌ جی‌اس
                        </Button>
                    </div>
                </div>
            </section>
    </>
  );
}
