"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  Rating,
  Snackbar,
  Alert,
  Box,
  Avatar,
  Paper,
  Container,
} from "@mui/material";
import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { formatDistanceToNow } from "date-fns";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import UserLayout from "../../../components/userlayout";

// Extract YouTube video ID from URL
const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function ReviewDetail() {
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchReview();
      fetchComments();
      checkAuthentication();
    }
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await axios.get(`/api/review/${id}`);
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/videocomments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const checkAuthentication = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      setErrorMessage("You must be logged in to submit a comment.");
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      setErrorMessage("Comment cannot be empty.");
      return;
    }
    if (!userId) {
      setErrorMessage("You must be logged in to submit a comment.");
      return;
    }
    if (newRating === 0) {
      setErrorMessage("Please select a rating.");
      return;
    }

    const payload = {
      reviewid: id,
      userid: userId,
      comment: newComment,
      rating: newRating,
      status: "pending",
    };

    try {
      await axios.post(`/api/comments`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNewComment("");
      setNewRating(0);
      setSnackbarMessage("Your comment has been submitted!");
      setOpenSnackbar(true);
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (!review) return <Typography>Loading...</Typography>;

  const videoId = extractVideoId(review.url);
  const heading = review.title;

  return (
    <UserLayout>
      <Container maxWidth="lg" style={{ marginTop: "20px", padding: "20px" }}>
        {/* Video Section */}
        {heading &&(<>
            <div className="text-4xl font-bold text-gray-600 px-8 pb-4">
            Title: <span className="text-gray-600">{heading}</span>
            </div>
            </>)}
        <Paper elevation={4} style={{ padding: "20px", borderRadius: "12px" }}>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {videoId ? (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  width: "100%",
                  height: 0,
                }}
              >
                <iframe
                  title="YouTube Video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                  }}
                ></iframe>
              </div>
            ) : (
              <Typography variant="body1" color="error">
                Invalid video URL
              </Typography>
            )}
          </div>
        </Paper>

        {/* Comments Section */}
        <Box display="flex" gap="20px" marginTop="30px">
          {/* Left Side: Comments List */}
          <Box flex={3}>
            <Typography variant="h5" gutterBottom>
              Comments
            </Typography>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Card
                  key={index}
                  style={{
                    marginBottom: "20px",
                    borderRadius: "15px",
                    boxShadow:
                      "0px 4px 12px rgba(0, 0, 0, 0.1), 0px 8px 24px rgba(0, 0, 0, 0.15)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={comment.fullname || "Anonymous"}
                        src={`/profile_pics/${comment.userid}.jpg`}
                      />
                    }
                    title={comment.fullname || "Anonymous"}
                    subheader={formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {comment.comment}
                    </Typography>
                    <Box marginTop="10px">
                      <Rating value={comment.rating} readOnly />
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1">
                No comments yet. Be the first to comment!
              </Typography>
            )}
          </Box>

          {/* Right Side: Comment Form */}
          <Box flex={1} padding="20px" borderRadius="12px" >
            <Typography variant="h6">Submit a Comment</Typography>
            {errorMessage && (
              <Typography variant="body2" color="error" style={{ marginBottom: "10px" }}>
                {errorMessage}
              </Typography>
            )}
            {!userId ? (
              <Typography variant="body1" color="primary">
                Login to submit a comment.
              </Typography>
            ) : (
              <>
                <TextField
                  label="Comment"
                  multiline
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: "15px" }}
                />
                <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
                  Select Rating
                </Typography>
                <Rating
                  name="rating"
                  value={newRating}
                  onChange={(event, newValue) => setNewRating(newValue)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px", width: "100%" }}
                  onClick={handleCommentSubmit}
                >
                  Submit
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* Snackbar for feedback */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </UserLayout>
  );
}
