"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"; // Import play icon
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

// Helper function to extract video ID from a YouTube URL
const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // For popup video
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/review");
      setReviews(response.data); // Assuming API returns an array of reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleVideoClick = (url) => {
    const videoId = extractVideoId(url);
    if (videoId) {
      setSelectedVideo(videoId);
      setOpenDialog(true);
    } else {
      console.error("Invalid YouTube URL");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVideo(null);
  };

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {reviews.map((review, index) => {
        const videoId = extractVideoId(review.url); // Extract video ID
        return videoId ? (
          <Card key={index} style={{ width: "300px", cursor: "pointer", position: "relative" }} onClick={() => handleVideoClick(review.url)}>
            {/* Thumbnail */}
            <div style={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="200"
                image={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="YouTube Video"
              />
              {/* Play icon overlay */}
              <PlayCircleOutlineIcon
                sx={{
                  fontSize: 64,
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.8,
                }}
              />
            </div>
            <CardContent>
              <Typography variant="h6">{review.title}</Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography key={index} variant="body1" color="error">
            Invalid video URL
          </Typography>
        );
      })}

      {/* Dialog to play video */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Video Review
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedVideo && (
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                title="YouTube Video"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
