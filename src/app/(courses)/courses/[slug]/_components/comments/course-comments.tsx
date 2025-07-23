'use client'

import { useParams } from "next/navigation"
import { useCourseComments } from "../../_api/get-comments"
import { Comment } from "@/app/_components/comment"
import { TextPlaceholder } from "@/app/_components/placeholders"
import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/app/_components/button"
import { IconRefresh } from "@/app/_components/icons"
import { Alert } from "@/app/_components/alert"


const CourseComments=()=>{
    
const {ref,inView}=useInView({})
const {slug}=useParams()

const {data:comments,error,hasNextPage,fetchNextPage,isFetching,isFetchingNextPage,refetch}=useCourseComments({
    params:{
        slug:slug as string,
        page:1
    }
})


useEffect(()=>{
    if(inView && hasNextPage){
        fetchNextPage()
    }
},[inView,hasNextPage,fetchNextPage])


if(error){
    return(
        <>
        <Alert variant="error">خطا در برقراری ارتباط با سرور</Alert>
        <div className="text-cent mt-3">
            <Button variant="neutral" 
            className="font-semibold"
             isOutline={true}
              shape="wide"
               onClick={()=>refetch()}><IconRefresh/>تلاش مجدد</Button>
        </div>
        </>
    )
}
    return(
        <>
        {comments?.pages.map((currentPage)=>(
            <Fragment key={`course-comment-${currentPage}`}>
                {currentPage.data.map((comment)=>(

           <Comment key={`comment-${comment.id}`} variant="info" {...comment}/>
                ))}
            </Fragment>
        ))}

       

        {hasNextPage || isFetching && (
 <div ref={ref}>
 <TextPlaceholder/>
</div>
        )}
    
        </>
    )
}

export default CourseComments;