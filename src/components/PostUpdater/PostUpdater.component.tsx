import { useAPI } from "../../hooks/useAPI.hook";
import { Post } from "../../typing/types/Post.type";
import { useState, useEffect, FormEvent } from "react";
import { PostForm } from "../../typing/types/PostForm.type";
import axios from "axios";
import ButtonWrapper from "../../templates/ButtonWrapper.template";
export function PostUpdater(props: {
  postId: number | string;
}) {
  const { postId } = props;
  const { loading, data, errorAPI, reload } = useAPI<Post>(
    `https://bloggy-api.herokuapp.com/posts/${postId}`
  );
  const [formPost, setFormPost] = useState<PostForm>({
    title: "",
    body: "",
  });
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    updatePost(
      `https://bloggy-api.herokuapp.com/posts/${postId}`,
      formPost
    );
    console.log(formPost);
  }
  useEffect(() => {
    if (data) {
      setFormPost(data);
    }
  }, [data]);
  return (
    <form action="#" className="" onSubmit={onSubmit}>
      <div className="max-w-[280px] flex flex-col items-start justify-between min-h-[300px]">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            setFormPost((prevState) => {
              return {
                ...prevState,
                title: e.target.value,
              };
            });
          }}
          value={formPost.title}
          placeholder="Enter, the title"
          className="border-2 border-black w-full"
          required
        />
        <textarea
          name=""
          id=""
          onChange={(e) => {
            setFormPost((prevState) => {
              return { ...prevState, body: e.target.value };
            });
          }}
          cols={30}
          value={formPost.body}
          rows={8}
          className="border-2 border-black w-full p-2"
          required
        ></textarea>
        <ButtonWrapper className="w-full">
          Submit
        </ButtonWrapper>
      </div>
    </form>
  );
}

async function updatePost(url: string, data: PostForm) {
  return await axios.put(url, data);
}
