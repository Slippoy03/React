import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

const PostForm = ({ post }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !body) {
      setSnackbarMessage("Title and Body are required");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const method = post ? "PUT" : "POST";
    const url = post
      ? `https://jsonplaceholder.typicode.com/posts/${post.id}`
      : "https://jsonplaceholder.typicode.com/posts";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      if (response.ok) {
        setSnackbarMessage("Operation successful");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setSnackbarMessage("Operation failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setSnackbarMessage("Delete successful");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setSnackbarMessage("Delete failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {post ? "Update" : "Create"}
      </Button>
      {post && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostForm;
