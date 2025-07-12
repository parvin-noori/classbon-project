import { API_URL } from "@/configs/globals"
import { CourseDetails } from "@/types/course-details.interface"


export async function generateStaticParams(){
    const slug=await fetch(`${API_URL}/courses/slugs`).then(res=>res.json())

    return(slug as string[]).map((slug)=>({slug:slug}))
}

async function getCourse(slug:string):Promise<CourseDetails>{

    const res=await fetch(`${API_URL}/courses/${slug}`)
    return res.json()

}

export default async function CourseDetails({params}:{params:{slug:string}}){
    const {slug}=params
    const courseData = await getCourse(slug);
    return(
        <div className="text-5xl flex justify-center items-center w-full">
        <h1>{courseData.title}</h1>
        </div>
    )
}