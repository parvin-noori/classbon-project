'use client'

import { useParams } from "next/navigation"
import { useCourseComments } from "../../_api/get-comments"
import { Comment } from "@/app/_components/comment"
import { TextPlaceholder } from "@/app/_components/placeholders"
import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"


const CourseComments=()=>{
    
const {ref,inView}=useInView({})
const {slug}=useParams()

const {data:comments,error,hasNextPage,fetchNextPage,isFetchingNextPage,refetch}=useCourseComments({
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
    return(
        <>
        {comments?.pages.map((currentPage)=>(
            <Fragment key={`course-comment-${currentPage}`}>
                {currentPage.data.map((comment)=>(

           <Comment key={`comment-${comment.id}`} variant="info" {...comment}/>
                ))}
            </Fragment>
        ))}

       

        {hasNextPage || isFetchingNextPage && (
 <div ref={ref}>
 <TextPlaceholder/>
</div>
        )}
    
        </>
    )
}

export default CourseComments;