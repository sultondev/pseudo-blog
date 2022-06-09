import "./App.style.sass";
import PostsList from "../Posts/Posts.component";
import { Route, Routes } from "react-router-dom";
import { PostDetails } from "../PostDetails/PostDetails.component";
import NavBar from "../NavBar/NavBar.component";
function App() {
  return (
    <section className="app relative">
      <NavBar />
      <Routes>
        <Route path="posts" element={<PostsList />} />
        <Route
          path="posts/:postID"
          element={<PostDetails />}
        />
      </Routes>
    </section>
  );
}

export default App;
