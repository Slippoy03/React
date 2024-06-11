import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { Typography } from "@mui/material";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <PostList posts={posts} />
    </div>
  );
};

export default HomePage;
