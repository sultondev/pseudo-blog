import { Comment } from "../../typing/types/Comment.type";
import UserImg from "../../assets/media/images/user-icon.svg";

export function CommentsList(props: { data: Comment[] }) {
  const { data } = props;
  return (
    <ul
      className="comments-list flex
     flex-col-reverse gap-10 py-4"
    >
      {data.map((item) => {
        return (
          <li
            className="comments-list__item max-w-[500px]"
            key={item.postId + item.body}
          >
            <div className="comments-list__wrapper flex items-center">
              <img src={UserImg} alt="user" className="w-10" />
              <h4 className="comments-list__name mr-8">
                {item?.name ? item.name : "anonymous"}
              </h4>
              {item?.email ? (
                <a href={`mail: ${item}`}>{item.email}</a>
              ) : (
                <p className="comments-list__email">Email not given</p>
              )}
            </div>
            <p className="comments-list__body pl-10">{item.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
