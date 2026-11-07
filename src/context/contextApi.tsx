import {
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
};

export const dataContext = createContext<DataProps>(defaultData);

export const DataContextProvider = ({ children }: DataProvider) => {
  const [data, setData] = useState<user[]>([]);
  const [post, setPost] = useState<postData[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    getPosts();
    getUsers();
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
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
