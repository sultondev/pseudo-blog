import ButtonWrapper from "../../templates/ButtonWrapper.template";
import axios from "axios";
import { FormEvent, useState } from "react";
import { PostForm } from "../../typing/types/PostForm.type";

export function PostCreator(props: { reload: () => void }) {
  const { reload } = props;
  const [formPost, setFormPost] = useState<PostForm>({
    title: "",
    body: "",
  });
  const [error, setError] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    makePost(
      "https://bloggy-api.herokuapp.com/posts/",
      formPost
    )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          reload();
        }
      })
      .catch((error) => {
        setError(error);
      });
    console.log("onSUbmit rendered");
  }
  if (error) {
    return <div className="">Error</div>;
  }
  return (
    <form action="#" className="" onSubmit={onSubmit}>
      <div className="max-w-[280px] flex flex-col items-start justify-between min-h-[300px]">
        <input
          type="text"
          name="title"
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
          name="body"
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

function makePost(url: string, data: PostForm) {
  return axios({
    method: "post",
    url: url,
    data: data,
  });
}
