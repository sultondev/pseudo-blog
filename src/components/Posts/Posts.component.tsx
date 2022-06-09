import { Post } from "../../typing/types/Post.type";
import { useAPI } from "../../hooks/useAPI.hook";
import "./Posts.style.sass";
import { PostCreator } from "./PostCreator.component";
import { useRecoilState } from "recoil";
import { PostsListStateData } from "../../recoil/atoms";
import { useEffect } from "react";
import PostItem from "../../templates/PostItem.template";
import ButtonWrapper from "../../templates/ButtonWrapper.template";
import { Link } from "react-router-dom";
function Posts() {
  const { loading, data, errorAPI, reload } = useAPI<
    Post[]
  >("https://bloggy-api.herokuapp.com/posts/");

  if (errorAPI) {
    return <div className="">Error</div>;
  } else if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="posts w-full">
      <div className="container mx-auto">
        <div className="container relative my-10">
          <h1 className="text-[30px] mb-10">Posts</h1>
          <ul className="posts-list flex flex-row-reverse gap-5 w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
            {data.map((post) => {
              return (
                <PostItem
                  key={post.id}
                  className="posts-list__item"
                >
                  <article className="posts-list__article">
                    <h4 className="posts-list__title text-[22px] font-semibold mb-7">
                      {post.title}
                    </h4>
                    <p className="posts-list__body">
                      {post.body}
                    </p>
                  </article>

                  <ButtonWrapper height="auto">
                    <Link to={`/posts/${post.id}`}>
                      Open Full Post
                    </Link>
                  </ButtonWrapper>
                </PostItem>
              );
            })}
          </ul>
        </div>
        <div className="posts-creator">
          <h4>Create your own post</h4>
          <PostCreator reload={reload} />
        </div>
      </div>
    </section>
  );
}

export default Posts;
