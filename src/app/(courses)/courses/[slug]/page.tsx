import { Rating } from "@/app/_components/rating"
import { API_URL } from "@/configs/globals"
import { CourseDetails as CourseDetail} from "@/types/course-details.interface"
import { CourseAside } from "./_components/course-aside"
import { Tab } from "@/types/tabs.types"
import { Tabs } from "@/app/_components/tabs"


export async function generateStaticParams(){
    const slug=await fetch(`${API_URL}/courses/slugs`).then(res=>res.json())

    return(slug as string[]).map((slug)=>({slug:slug}))
}

async function getCourse(slug:string):Promise<CourseDetail>{

    const res=await fetch(`${API_URL}/courses/${slug}`)
    return res.json()

}

export default async function CourseDetails({params}:{params:{slug:string}}){
    const {slug}=params
    const course = await getCourse(slug);

    const tabs:Tab[]=[
        {
            label:"مشخصات دوره",
            content:course.description
        },
        {
            label:"دیدگاه ها و پرسش ها",
            content:"course comments"
        },
        {
            label:"سوالات متداول",
            content:"accordion component"
        },
    ]
    return(
        <div className="container grid grid-cols-10 grid-rows-[1fr 1fr] gap-10 py-10">
            <div className="bg-primary pointer-events-none absolute right-0 aspect-square w-1/2   rounded-full opacity-10 blur-3xl"></div>
            <div className="col-span-10 xl:col-span-7">
                <h1 className="text-center xl:text-right text-2xl lg:text-3xl xl:text-4xl font-black leading-10">
                    {course.title}
                </h1>
                <h2 className="mt-4 text-center xl:text-right text-lg  leading-9">
                    {course.subTitle}
                </h2>

                <div className=" mt-5">Video Player Component</div>
            </div>
            <div className="col-span-10 xl:col-span-3">
               <CourseAside {...course}/>
            </div>
            <div className="col-span-10 xl:col-span-6">
                <Tabs tabs={tabs}/>
            </div>
            <div className="col-span-10 xl:col-span-4 bg-warning"></div>
        </div>
    )
}