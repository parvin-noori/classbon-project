import { CourseLevel } from "@/enums/course-level.enum";

export interface CoursesSummary{
    id: number;
    title: string;
    courseCategoryId: number;
    duration: string;
    level: string;
    levelNumber: CourseLevel;
    averageReviewRating: number | null;
    numOfReviews: number | null;
    coverImageId: number | null;
    recordStatus: string;
    slug: string;
    subTitle: string;
    isFree: boolean;
    basePrice: number;
}