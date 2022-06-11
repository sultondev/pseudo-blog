import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAPI } from "../../hooks/useAPI.hook";
import { Post } from "../../typing/types/Post.type";
import { useRecoilState } from "recoil";
import {
  PostItemStateData,
  EditPostFormClassStateData,
} from "../../recoil/atoms";
import Comments from "../Comments/Comments.component";
import { MemoPostDeleter } from "../PostDeleter/PostDeleter.component";
import { PostUpdater } from "../PostUpdater/PostUpdater.component";
import ButtonWrapper from "../../templates/ButtonWrapper.template";

export function PostDetails() {
  const { postID } = useParams();
  const [postData, setPostData] = useRecoilState<Post>(PostItemStateData);
  const { loading, data, errorAPI, reload } = useAPI<Post>(
    `https://bloggy-api.herokuapp.com/posts/${postID}`
  );

  const [formStatus, setForumStatus] = useRecoilState<string>(
    EditPostFormClassStateData
  );

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  });

  if (errorAPI) {
    return <div className="container mx-auto">Error</div>;
  } else if (loading || !postData || !postID) {
    return <div className="container mx-auto">Loading...</div>;
  }

  return (
    <section className="details">
      <div className="container mx-auto w-full">
        <h2 className="details__header">Post Details</h2>
        <div className="my-20 flex flex-col flex-wrap w-full relative">
          <article className="flex flex-col basis-1/2">
            <h3 className="text-[40px] mb-5">{postData.title}</h3>
            <p className="text-lg max-w-[60%]">{postData.body}</p>
          </article>

          <div
            className={`flex right-0 place-items-start justify-end absolute ${formStatus}`}
          >
            <PostUpdater data={postData} reload={reload} />
          </div>
          <div className="flex gap-8 my-10">
            <MemoPostDeleter postId={postID} />
            <ButtonWrapper
              onClick={(e) => {
                e.preventDefault();
                if (formStatus === "hidden") {
                  setForumStatus("visible");
                } else {
                  setForumStatus("hidden");
                }
              }}
            >
              {formStatus === "hidden" ? "Show editor" : "Hide editor"}
            </ButtonWrapper>
          </div>
        </div>
        <Comments postId={postID} />
      </div>
    </section>
  );
}
