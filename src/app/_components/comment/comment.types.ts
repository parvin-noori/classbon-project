import { Comment } from "@/types/comment.interface";
import { ComponentBase } from "../types/component-base.type";

export type CommnetProps=Omit<ComponentBase, "isDisabled" | "size"> & Comment