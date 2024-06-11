import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
            <Link
              to={`/posts/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="button" display="block" gutterBottom>
                Edit
              </Typography>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
