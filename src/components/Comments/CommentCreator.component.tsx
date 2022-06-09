import {
  ChangeEvent,
  FC,
  useState,
  FormEvent,
} from "react";
import ButtonWrapper from "../../templates/ButtonWrapper.template";
import { PostForm } from "../../typing/types/PostForm.type";
import axios from "axios";

type CommentForm = {
  name: string;
  body: string;
  email: string;
};

export const CommentCreator: FC<{
  reload: () => void;
  postId: number | string;
}> = ({ postId, reload }) => {
  const [commentForm, setCommentForm] =
    useState<CommentForm>({
      name: "",
      body: "",
      email: "",
    });
  function handleChange(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) {
    e.preventDefault();
    setCommentForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://bloggy-api.herokuapp.com/comments",
      data: { ...commentForm, postId },
    }).then((res) => {
      if (res.status === 201) {
        reload();
        setCommentForm({
          name: "",
          body: "",
          email: "",
        });
      }
    });
  }
  return (
    <form
      className="comment-creator flex justify-between items-center flex-col max-w-[300px] absolute right-0"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={commentForm.name}
        className="border-2 border-black w-full p-2 my-2"
        placeholder="Enter your name"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={commentForm.email}
        className="border-2 border-black w-full p-2 "
        placeholder="Enter your email"
      />
      <textarea
        name="body"
        cols={30}
        rows={10}
        onChange={handleChange}
        value={commentForm.body}
        className="border-2 border-black p-2 my-2"
        placeholder="Enter your comment"
      ></textarea>
      <ButtonWrapper className="w-full">
        Leave a comment
      </ButtonWrapper>
    </form>
  );
};
