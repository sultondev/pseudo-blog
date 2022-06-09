import { useAPI } from "../../hooks/useAPI.hook";
import { CommentsList } from "./CommentsList.component";
import { Comment } from "../../typing/types/Comment.type";
import ButtonWrapper from "../../templates/ButtonWrapper.template";

function Comments(props: { postId: string }) {
  const { postId } = props;
  const { loading, data, errorAPI } = useAPI<Comment[]>(`
    https://bloggy-api.herokuapp.com/comments/?postId=${postId}
  `);

  if (errorAPI || !postId) {
    return <div className="">Error</div>;
  } else if (loading || !data) {
    return <div className="">Loading...</div>;
  }

  return (
    <section className="comments">
      <div className="flex w-full justify-between">
        <h3 className="comments__header">
          Comments {data.length}:
        </h3>
      </div>

      <CommentsList data={data} />
    </section>
  );
}

export default Comments;
