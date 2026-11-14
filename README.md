# Ask For Answers

Ask For Answers is a full-stack **PERN** application (PostgreSQL, Express, React, Node.js) built with TypeScript. Users can register, log in, publish posts, and discuss them in the comments.

I built this as my first full-stack project to learn, in practice, how a PERN application works and to deepen my knowledge of TypeScript and PostgreSQL.

## Features

- Register and log in as a user
- Create a post as a logged-in user
- Add comments to any post
- Delete a post
- Browse all posts and view post details

## Tech Stack

- React with TypeScript
- Vite
- React Router
- Axios
- Context API (`useContext`) for state management

## Project Structure

```
Client-project/
|
|-- src/
|   |
|   |-- assets/
|   |   |
|   |   |-- alert-icon.png/
|   |   |-- ask-icon.png/
|   |   |-- correct-icon.png/
|   |   |-- facebook-icon.png/
|   |   |-- home-icon.png/
|   |   |-- instagram-icon.png/
|   |   |-- notSee-icon.png/
|   |   |-- postPlus-icon.png/
|   |   |-- Search-icon.png/
|   |   |-- see-icon.png/
|   |   |-- twitter-icon.png/
|   |   |-- User-White-icon.png/
|   |   |-- wrong-icon.png/
|   |   |__ youtube-icon.png/
|   |
|   |-- components/
|   |   |
|   |   |-- Footer.tsx/
|   |   |-- Login.tsx/
|   |   |-- Navbar.tsx/
|   |   |__ Register.tsx/
|   |
|   |-- context/
|   |   |
|   |   |__ contextApi.tsx/
|   |
|   |__ pages/
|       |
|       |-- CreatePostPage.tsx/
|       |-- DetailPostPage.tsx/
|       |-- FormPage.tsx/
|       |-- Homepage.tsx/
|       |-- PostPage.tsx/
|       |__ UserPage.tsx/
|
|-- .env.example/
|
|__ index.html/

## What I Learned

- Building a REST API with Express and PostgreSQL
- Typing React state, props and API data with TypeScript
- Sharing state across components with the Context API
- Authenticating requests with JWT
- Deploying a full-stack app across Vercel and Render

## Author

Theodoros Mitropoulos

## Live Demo

- **Client:** https://ask-for-answers.vercel.app
- **Server repository:** [Ask-For-Answers-Server](https://github.com/Theodor-gif/Ask-For-Answers-Server)

> The server runs on a free Render instance, so the first request after a period of inactivity can take up to a minute.
```
