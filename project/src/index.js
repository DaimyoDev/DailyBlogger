import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EachBlog from "./routes/EachBlog";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import About from "./routes/About";
import UserBlogs from "./routes/UserBlogs";
import CreateBlog from "./routes/CreateBlog";
import EditBlog from "./routes/EditBlog";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <App />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<EachBlog />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/myposts" element={<UserBlogs />} />
          <Route exact path="/createposts" element={<CreateBlog />} />
          <Route exact path="/:id/edit" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
