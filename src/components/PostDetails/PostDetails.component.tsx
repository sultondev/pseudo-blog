import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAPI } from "../../hooks/useAPI.hook";
import { Post } from "../../typing/types/Post.type";
import { useRecoilState } from "recoil";
import { PostItemStateData } from "../../recoil/atoms";
import Comments from "../Comments/Comments.component";
import { PostDeleter } from "../PostDeleter/PostDeleter.component";
import { PostUpdater } from "../PostUpdater/PostUpdater.component";

export function PostDetails() {
  const { postID } = useParams();
  const [postData, setPostData] = useRecoilState<Post>(
    PostItemStateData
  );
  const { loading, data, errorAPI, reload } = useAPI<Post>(
    `https://bloggy-api.herokuapp.com/posts/${postID}`
  );

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  });

  if (errorAPI) {
    return <div className="container mx-auto">Error</div>;
  } else if (loading || !postData || !postID) {
    return (
      <div className="container mx-auto">Loading...</div>
    );
  }

  return (
    <section className="details">
      <div className="container mx-auto w-full">
        <h2 className="details__header">Post Details</h2>
        <div className="my-20 flex basis-2/4 flex-wrap w-full">
          <article className="flex flex-col basis-1/2">
            <h3 className="text-[40px] mb-5">
              {postData.title}
            </h3>
            <p className="text-lg">{postData.body}</p>
          </article>

          <div className="flex basis-1/2 place-items-start justify-end">
            <PostUpdater data={postData} reload={reload} />
          </div>
          <div className="flex justify-between my-10">
            <PostDeleter postId={postID} />
          </div>
        </div>
        <Comments postId={postID} />
      </div>
    </section>
  );
}
