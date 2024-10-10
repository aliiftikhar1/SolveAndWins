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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  IconButton,
  TablePagination,
} from "@mui/material";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ReviewCategories = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewTitles, setReviewTitles] = useState([]); // Hold review titles for the select dropdown
  const [users, setUsers] = useState([]); // Hold users for displaying names and in the form
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    reviewid: "",
    userid: 0, // Initialize userid as an integer
    rating: "",
    comment: "",
    status: "pending", // Initialize status as pending
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchReviews();
    fetchReviewTitles(); // Fetch review titles for the select dropdown
    fetchUsers(); // Fetch users for displaying user names and in the select dropdown
  }, []);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/comments");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch reviews.",
        type: "error",
      });
    }
  };

  // Fetch all review titles for the select option in the form
  const fetchReviewTitles = async () => {
    try {
      const response = await axios.get("/api/review");
      setReviewTitles(response.data); // Store the fetched review titles
    } catch (error) {
      console.error("Error fetching review titles:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch review titles.",
        type: "error",
      });
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      setUsers(response.data); // Store the fetched users
    } catch (error) {
      console.error("Error fetching users:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch users.",
        type: "error",
      });
    }
  };

  const handleAddOpen = () => {
    setFormData({
      reviewid: "",
      userid: 0, // Reset userid as integer
      rating: "",
      comment: "",
      status: "pending", // Set status to pending by default
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (review) => {
    setEditingReview(review);
    setFormData({
      reviewid: review.reviewid,
      userid: review.userid,
      rating: review.rating,
      comment: review.comment,
      status: review.status, // Preserve the current status in the edit form
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingReview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "userid" ? parseInt(value) : value, // Ensure userid is always an integer
    }));
  };

  // Handle submit to add a new review comment
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reviewid || !formData.userid || !formData.rating || !formData.comment) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.post("/api/comments", formData);
      setSnackbar({
        open: true,
        message: "Review comment added successfully and is pending approval.",
        type: "success",
      });
      fetchReviews(); // Refresh reviews list after adding
      handleAddClose();
    } catch (error) {
      console.error("Error adding review comment:", error);
      setSnackbar({
        open: true,
        message: "Failed to add review comment.",
        type: "error",
      });
    }
  };

  // Handle submit to update a review comment
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reviewid || !formData.userid || !formData.rating || !formData.comment) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.put(`/api/comments/${editingReview.id}`, formData);
      setSnackbar({
        open: true,
        message: "Review comment updated successfully.",
        type: "success",
      });
      fetchReviews(); // Refresh reviews list after updating
      handleEditClose();
    } catch (error) {
      console.error("Error updating review comment:", error);
      setSnackbar({
        open: true,
        message: "Failed to update review comment.",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      setSnackbar({
        open: true,
        message: "Review comment deleted successfully.",
        type: "warning",
      });
      fetchReviews(); // Refresh reviews list after deletion
    } catch (error) {
      console.error("Error deleting review comment:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete review comment.",
        type: "error",
      });
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Review ID",
        accessor: "reviewid",
      },
      {
        Header: "Review Title", // Show the review title by comparing reviewid
        accessor: "title",
        Cell: ({ row }) => {
          const review = reviewTitles.find((r) => r.id === row.original.reviewid);
          return review ? review.title : "N/A"; // Display the review title or "N/A" if not found
        },
      },
      {
        Header: "User Name", // Show the user name by comparing userid
        accessor: "userid",
        Cell: ({ row }) => {
          const user = users.find((u) => u.id === row.original.userid);
          return user ? user.fullname : "N/A"; // Display the user name or "N/A" if not found
        },
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <FaEdit
              onClick={() => handleEditOpen(row.original)}
              style={{ fontSize: "20px", cursor: "pointer", color: "#1976d2" }}
            />
            <MdDeleteForever
              onClick={() => handleDelete(row.original.id)}
              style={{ fontSize: "20px", cursor: "pointer", color: "#d32f2f" }}
            />
          </div>
        ),
      },
    ],
    [reviewTitles, users]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: reviews,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Toolbar>
          <InputBase
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder="Search"
            style={{
              padding: "6px 10px",
              backgroundColor: "#eaeaea",
              borderRadius: "4px",
            }}
          />
        </Toolbar>
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Add New Review Comment
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {page.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: reviews.length }]}
        component="div"
        count={reviews.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      <Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="xl" fullWidth disableEnforceFocus>
        <DialogTitle>
          Add New Review Comment
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Review</InputLabel>
              <Select
                name="reviewid"
                value={formData.reviewid}
                onChange={handleInputChange}
                required
              >
                {reviewTitles.map((review) => (
                  <MenuItem key={review.id} value={review.id}>
                    {review.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>User</InputLabel>
              <Select
                name="userid"
                value={formData.userid}
                onChange={handleInputChange}
                required
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.fullname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
              </Select>
            </FormControl>

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

      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="xl" fullWidth disableEnforceFocus>
        <DialogTitle>
          Edit Review Comment
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Review</InputLabel>
              <Select
                name="reviewid"
                value={formData.reviewid}
                onChange={handleInputChange}
                required
              >
                {reviewTitles.map((review) => (
                  <MenuItem key={review.id} value={review.id}>
                    {review.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>User</InputLabel>
              <Select
                name="userid"
                value={formData.userid}
                onChange={handleInputChange}
                required
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.fullname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
              </Select>
            </FormControl>

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

export default ReviewCategories;
