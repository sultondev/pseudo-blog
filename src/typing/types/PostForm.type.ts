import { Post } from "./Post.type";
export type PostForm = Omit<Post, "id">;
