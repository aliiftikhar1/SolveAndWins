"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"; // Import play icon
import axios from "axios";
import { useRouter } from "next/navigation";

// Helper function to extract video ID from a YouTube URL
const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const router = useRouter(); // Use Next.js router for navigation

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

  // Handle video click to redirect to the review page with the review ID
  const handleVideoClick = (id) => {
    router.push(`/pages/reviews/${id}`); // Navigate to the review page
  };

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {reviews.map((review, index) => {
        const videoId = extractVideoId(review.url); // Extract video ID
        return videoId ? (
          <Card
            key={index}
            style={{ width: "300px", cursor: "pointer", position: "relative" }}
            onClick={() => handleVideoClick(review.id)} // Pass review id for redirection
          >
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
    </div>
  );
}
