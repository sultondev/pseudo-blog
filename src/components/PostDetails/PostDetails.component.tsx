import { useParams } from "react-router-dom";
import { FC, useEffect, useState, Children } from "react";
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
import { MemoAlertDialog } from "../AlertDialog/AlertDialog.component";
type AlertProps = {
  title: string;
  body: string;
  status: boolean;
  children: React.ReactElement;
};

const CreateAlertDialog: FC<AlertProps> = ({
  title,
  body,
  status,
  children,
}) => {
  if (status) {
    return (
      <MemoAlertDialog title={title ? title : ""} body={body ? body : ""}>
        {children}
      </MemoAlertDialog>
    );
  }
  return <div className=""></div>;
};
export function PostDetails() {
  const { postID } = useParams();
  const [postData, setPostData] = useRecoilState<Post>(PostItemStateData);
  const { loading, data, errorAPI, reload } = useAPI<Post>(
    `https://bloggy-api.herokuapp.com/posts/${postID}`
  );
  const [isOpen, setIsOpen] = useState(false);
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
        <CreateAlertDialog
          title="Do you really want to delete this post?"
          body="in this case this post will be deleted can never be repaired"
          status={isOpen}
        >
          <>
            <ButtonWrapper onClick={(e) => setIsOpen(false)}>
              Cancel
            </ButtonWrapper>
            <MemoPostDeleter postId={postID} />
          </>
        </CreateAlertDialog>
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
            <ButtonWrapper
              onClick={(e) => {
                console.log(e);
                setIsOpen(true);
              }}
            >
              Delete Post
            </ButtonWrapper>
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
