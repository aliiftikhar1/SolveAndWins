"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Toolbar,
  InputBase,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  TablePagination,
} from "@mui/material";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddVideo = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    slug: "", // Added slug field
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/review");
      setVideos(response.data);
      setFilteredVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch videos.",
        type: "error",
      });
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(query)
    );
    setFilteredVideos(filtered);
  };

  const handleAddOpen = () => {
    setFormData({
      title: "",
      url: "",
      slug: "", // Reset slug field
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const { title, url, slug } = formData;

    if (!title || !url || !slug) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.post("/api/review", formData);
      setSnackbar({
        open: true,
        message: "Video added successfully.",
        type: "success",
      });
      fetchVideos();
      handleAddClose();
    } catch (error) {
      console.error("Error adding video:", error);
      setSnackbar({
        open: true,
        message: "Failed to add video.",
        type: "error",
      });
    }
  };

  const handleEditOpen = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      url: video.url,
      slug: video.slug, // Set slug field when editing
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingVideo(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { title, url, slug } = formData;

    if (!title || !url || !slug) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.put(`/api/review/${editingVideo.id}`, formData);
      setSnackbar({
        open: true,
        message: "Video updated successfully.",
        type: "success",
      });
      fetchVideos();
      handleEditClose();
    } catch (error) {
      console.error("Error updating video:", error);
      setSnackbar({
        open: true,
        message: "Failed to update video.",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/review/${id}`);
      setSnackbar({
        open: true,
        message: "Video deleted successfully.",
        type: "warning",
      });
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete video.",
        type: "error",
      });
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Toolbar>
          <InputBase
            placeholder="Search videos"
            value={searchQuery}
            onChange={handleSearch}
            style={{
              padding: "6px 10px",
              backgroundColor: "#eaeaea",
              borderRadius: "4px",
            }}
          />
        </Toolbar>
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Add New Video
        </Button>
      </div>

      {/* Table displaying videos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell> {/* Added Slug Column */}
              <TableCell>URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVideos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((video) => (
                <TableRow key={video.id}>
                  <TableCell>{video.id}</TableCell>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{video.slug}</TableCell> {/* Display Slug */}
                  <TableCell>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Video
                    </a>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <FaUserEdit
                        onClick={() => handleEditOpen(video)}
                        style={{
                          fontSize: "20px",
                          color: "#1976d2",
                          cursor: "pointer",
                        }}
                      />
                      <MdDeleteForever
                        onClick={() => handleDelete(video.id)}
                        style={{
                          fontSize: "20px",
                          color: "#d32f2f",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredVideos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Add Video Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleAddClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New Video
          <IconButton
            aria-label="close"
            onClick={handleAddClose}
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
        <DialogContent>
          <form onSubmit={handleAddSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="YouTube Video Link"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleAddClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Video Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Video
          <IconButton
            aria-label="close"
            onClick={handleEditClose}
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
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="YouTube Video Link"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddVideo;
