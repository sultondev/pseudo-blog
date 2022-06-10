import { atom } from "recoil";
import { Comment } from "../typing/types/Comment.type";
import { Post } from "../typing/types/Post.type";

export const PostItemStateData = atom<Post | any>({
  key: "PostItemStateData",
  default: null,
});

export const PostsListStateData = atom<Post[]>({
  key: "PostsListStateData",
  default: [],
});

export const CommentsListStateData = atom<Comment[]>({
  key: "CommentsListStateData",
  default: [],
});

export const FormPostStateData = atom<Post | any>({
  key: "FormPostStateData",
  default: {
    title: "",
    body: "",
  },
});

export const EditPostClassStateData = atom<string>({
  key: "EditPostClassStateData",
  default: "hidden",
});

export const CreatePostFormClassStateData = atom<string>({
  key: "CreatePostFormClassStateData",
  default: "hidden",
});
