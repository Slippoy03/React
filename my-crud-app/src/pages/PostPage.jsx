import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id !== "new") {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  return (
    <div>
      <PostForm post={post} />
    </div>
  );
};

export default PostPage;
