import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const connection = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type user = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  password: number;
  created_at: string;
};

type postData = {
  id: number;
  user_id: number;
  title: string;
  text: string;
  created_at: string;
};

type commentsData = {
  id: number;
  user_id: number;
  post_id: number;
  text: string;
  created_at: string;
};

type DataProps = {
  data: user[];
  post: postData[];
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setAge: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setPost: Dispatch<SetStateAction<postData[]>>;
  setData: Dispatch<SetStateAction<user[]>>;
  getUsers: () => Promise<void>;
  getPosts: () => Promise<void>;
  createUser: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
  emailLog: string;
  passwordLog: string;
  setEmailLog: Dispatch<SetStateAction<string>>;
  setPasswordLog: Dispatch<SetStateAction<string>>;
  logInUser: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  titleUser: string;
  textUser: string;
  setTitleUser: Dispatch<SetStateAction<string>>;
  setTextUser: Dispatch<SetStateAction<string>>;
  AddPost: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  setIdUser: Dispatch<SetStateAction<string>>;
  idUser: string;
  deletePost: () => Promise<boolean>;
  deleteAlert: boolean;
  setDeleteAlert: Dispatch<SetStateAction<boolean>>;
  idPost: string;
  setIdPost: Dispatch<SetStateAction<string>>;
  getComments: () => Promise<void>;
  comments: commentsData[];
  setComments: Dispatch<SetStateAction<commentsData[]>>;
};

type DataProvider = {
  children: ReactNode;
};

const defaultData: DataProps = {
  data: [],
  post: [],
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
  setFirstName: () => {},
  setLastName: () => {},
  setAge: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setPost: () => {},
  setData: () => {},
  getUsers: async () => {},
  getPosts: async () => {},
  createUser: async () => false,
  setView: () => {},
  view: false,
  emailLog: "",
  passwordLog: "",
  setEmailLog: () => {},
  setPasswordLog: () => {},
  logInUser: async () => false,
  titleUser: "",
  textUser: "",
  setTitleUser: () => {},
  setTextUser: () => {},
  AddPost: async () => false,
  idUser: "",
  setIdUser: () => {},
  deletePost: async () => false,
  deleteAlert: false,
  setDeleteAlert: () => {},
  idPost: "",
  setIdPost: () => {},
  getComments: async () => {},
  comments: [],
  setComments: () => {},
};

export const dataContext = createContext<DataProps>(defaultData);

export const DataContextProvider = ({ children }: DataProvider) => {
  const [data, setData] = useState<user[]>([]);
  const [post, setPost] = useState<postData[]>([]);
  const [comments, setComments] = useState<commentsData[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [titleUser, setTitleUser] = useState("");
  const [textUser, setTextUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [idPost, setIdPost] = useState<string>("");

  async function getUsers() {
    try {
      const users = await connection.get("/users");
      setData(users.data.users);
      console.log(users.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPosts() {
    try {
      const posts = await connection.get("/posts");
      setPost(posts.data.posts);
      console.log(posts.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  async function getComments() {
    try {
      const comments = await connection.get("/allComments");
      setComments(comments.data.comments);
      console.log(comments.data.comments);
    } catch (error) {
      console.error(error);
    }
  }

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      await connection.post("/register", {
        first_name: firstName,
        last_name: lastName,
        age: Number(age),
        email: email,
        password: password,
      });
      await getUsers();
      setFirstName("");
      setLastName("");
      setAge("");
      setEmail("");
      setPassword("");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function logInUser(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data = await connection.post("/login", {
        email: emailLog,
        password: passwordLog,
      });
      console.log(data.data.user.id);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("idUser", String(data.data.user.id));
      setIdUser(data.data.user.id);
      setEmailLog("");
      setPasswordLog("");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function AddPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const currentUser = localStorage.getItem("token");
      if (!currentUser) return;
      const post = await connection.post(
        "/upload",
        {
          title: titleUser,
          text: textUser,
        },
        { headers: { Authorization: `Bearer ${currentUser}` } },
      );
      console.log(post.data);
      await getPosts();
      setTitleUser("");
      setTextUser("");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function deletePost() {
    try {
      const currentUser = localStorage.getItem("token");
      if (!currentUser || !idPost) return false;

      await connection.delete(`/deletePost/${idPost}`, {
        headers: { Authorization: `Bearer ${currentUser}` },
      });

      await getPosts();
      setIdPost("");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    getPosts();
    getUsers();
    getComments();
  }, []);

  return (
    <dataContext.Provider
      value={{
        data,
        getUsers,
        setData,
        getPosts,
        post,
        setPost,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        age,
        setAge,
        email,
        setEmail,
        password,
        setPassword,
        createUser,
        view,
        setView,
        emailLog,
        passwordLog,
        setEmailLog,
        setPasswordLog,
        logInUser,
        titleUser,
        textUser,
        setTitleUser,
        setTextUser,
        AddPost,
        idUser,
        setIdUser,
        deletePost,
        deleteAlert,
        setDeleteAlert,
        idPost,
        setIdPost,
        comments,
        setComments,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
