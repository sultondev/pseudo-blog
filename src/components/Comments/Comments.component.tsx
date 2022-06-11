import { useAPI } from "../../hooks/useAPI.hook";
import { CommentsList } from "./CommentsList.component";
import { Comment } from "../../typing/types/Comment.type";
import ButtonWrapper from "../../templates/ButtonWrapper.template";
import { CommentCreator } from "./CommentCreator.component";
import { CreatePostFormClassStateData } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

function Comments(props: { postId: string }) {
  const { postId } = props;

  const { loading, data, errorAPI, reload } = useAPI<Comment[]>(`
    https://bloggy-api.herokuapp.com/comments/?postId=${postId}
  `);

  const [blockStatus, setBlockStatus] = useRecoilState(
    CreatePostFormClassStateData
  );

  if (errorAPI || !postId) {
    return <div className="">Error</div>;
  } else if (loading || !data) {
    return <div className="">Loading...</div>;
  }

  return (
    <section className="comments">
      <div className="flex w-full items-center">
        <h3 className="comments__header mr-10">Comments: {data.length}</h3>
        <ButtonWrapper
          onClick={(e) => {
            e.preventDefault();
            if (blockStatus === "hidden") {
              setBlockStatus("visible");
            } else {
              setBlockStatus("hidden");
            }
          }}
        >
          {blockStatus === "hidden"
            ? "Open Comments Block"
            : "Hide Comments Block"}
        </ButtonWrapper>
      </div>
      <div
        className={`flex flex-col justify-between basis-1/2 relative ${blockStatus}`}
      >
        <CommentsList data={data} />
        <CommentCreator reload={reload} postId={postId} />
      </div>
    </section>
  );
}

export default Comments;
