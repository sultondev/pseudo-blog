import ButtonWrapper from "../../templates/ButtonWrapper.template";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Post } from "../../typing/types/Post.type";
import { PostItemStateData } from "../../recoil/atoms";
import { useAPI } from "../../hooks/useAPI.hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PostDeleter(props: {
  postId: number | string;
}) {
  const { postId } = props;
  const navigate = useNavigate();
  const [postData, setPostData] = useRecoilState<Post>(
    PostItemStateData
  );
  const { loading, data, errorAPI } = useAPI<Post>(
    `https://bloggy-api.herokuapp.com/posts/${postId}`
  );

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, []);

  if (errorAPI) {
    return <div className="">Error</div>;
  } else if (loading || !postData || !postId) {
    return <div className="">Loading...</div>;
  }
  console.log(postId);

  async function onClick() {
    await deletePost(
      `https://bloggy-api.herokuapp.com/posts/${postId}`
    );
    navigate({ pathname: "/posts" });
  }
  return (
    <ButtonWrapper className="delete-btn" onClick={onClick}>
      Delete
    </ButtonWrapper>
  );
}

function deletePost(url: string) {
  return axios.delete(url);
}
