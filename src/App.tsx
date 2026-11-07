import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/Homepage.tsx";
import UserPage from "./pages/UserPage.tsx";
import PostPage from "./pages/PostPage.tsx";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<UserPage />}></Route>
        <Route path="/posts" element={<PostPage />}></Route>
      </Routes>
    </main>
  );
}

export default App;
