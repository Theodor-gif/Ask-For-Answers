import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/Homepage.tsx";
import UserPage from "./pages/UserPage.tsx";
import PostPage from "./pages/PostPage.tsx";
import AddPost from "./pages/CreatePostPage.tsx";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<UserPage />}></Route>
        <Route path="/posts" element={<PostPage />}></Route>
        <Route path="/addPost" element={<AddPost />}></Route>
      </Routes>
    </main>
  );
}

export default App;
