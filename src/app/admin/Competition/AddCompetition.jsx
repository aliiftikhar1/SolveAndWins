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

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

const Competitions = () => {
  // State Variables
  const [competitions, setCompetitions] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    id: null,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startedAt: "",
    endedAt: "",
    image: null, // Image file
    status: "visible", // Default status
  });

  // Fetch Competitions on Mount
  useEffect(() => {
    fetchCompetitions();
  }, []);

  // Fetch Competitions Function
  const fetchCompetitions = async () => {
    try {
      const response = await axios.get("/api/competition");
      setCompetitions(response.data);
    } catch (error) {
      console.error("Error fetching competitions:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch competitions.",
        type: "error",
      });
    }
  };

  // Handle Opening Add Dialog
  const handleAddOpen = () => {
    setFormData({
      title: "",
      description: "",
      startedAt: "",
      endedAt: "",
      image: null, // Reset image
      status: "visible", // Default status
    });
    setOpenAddDialog(true);
  };

  // Handle Closing Add Dialog
  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  // Handle Opening Edit Dialog
  const handleEditOpen = (competition) => {
    // Format dates to YYYY-MM-DD
    const formattedStartDate = new Date(competition.startedAt)
      .toISOString()
      .split("T")[0];
    const formattedEndDate = new Date(competition.endedAt)
      .toISOString()
      .split("T")[0];

    setEditingCompetition(competition);
    setFormData({
      title: competition.title,
      description: competition.description,
      startedAt: formattedStartDate,
      endedAt: formattedEndDate,
      image: null, // Reset image
      status: competition.status || "visible", // Existing status
    });
    setOpenEditDialog(true);
  };

  // Handle Closing Edit Dialog
  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingCompetition(null);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Convert Image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Upload Image and Get URL
  const uploadImage = async (base64Image) => {
    try {
      const response = await axios.post(
        "https://solveandwins.advanceaitool.com/uploadImage.php",
        { image: base64Image }
      );
      return response.data.image_url; // Extract image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed");
    }
  };

  // Handle Add Competition Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const { title, description, startedAt, endedAt, image, status } = formData;

    // Validation
    if (!title || !description || !startedAt || !endedAt || !status) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        const base64Image = await convertToBase64(image);
        imageUrl = await uploadImage(base64Image);
      }

      const competitionData = {
        title,
        description,
        startedAt,
        endedAt,
        image: imageUrl, // Image URL
        status, // Status
      };

      await axios.post("/api/competition", competitionData);
      setSnackbar({
        open: true,
        message: "Competition added successfully.",
        type: "success",
      });
      fetchCompetitions();
      handleAddClose();
    } catch (error) {
      console.error("Error adding competition:", error);
      setSnackbar({
        open: true,
        message: "Failed to add competition.",
        type: "error",
      });
    }
  };

  // Handle Edit Competition Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { title, description, startedAt, endedAt, image, status } = formData;

    // Validation
    if (!title || !description || !startedAt || !endedAt || !status) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      let imageUrl = editingCompetition.image; // Existing image URL
      if (image) {
        // If new image is uploaded
        const base64Image = await convertToBase64(image);
        imageUrl = await uploadImage(base64Image);
      }

      const updatedCompetitionData = {
        title,
        description,
        startedAt,
        endedAt,
        image: imageUrl, // Updated image URL
        status, // Updated status
      };

      await axios.put(
        `/api/competition/${editingCompetition.id}`,
        updatedCompetitionData
      );
      setSnackbar({
        open: true,
        message: "Competition updated successfully.",
        type: "success",
      });
      fetchCompetitions();
      handleEditClose();
    } catch (error) {
      console.error("Error updating competition:", error);
      setSnackbar({
        open: true,
        message: "Failed to update competition.",
        type: "error",
      });
    }
  };

  // Handle Delete Button Click
  const handleDelete = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

  // Confirm Deletion
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/competition/${deleteConfirmation.id}`);
      setSnackbar({
        open: true,
        message: "Competition deleted successfully.",
        type: "warning",
      });
      fetchCompetitions();
    } catch (error) {
      console.error("Error deleting competition:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete competition.",
        type: "error",
      });
    } finally {
      setDeleteConfirmation({ open: false, id: null });
    }
  };

  // Cancel Deletion
  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

  // Define Table Columns
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Started At",
        accessor: "startedAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Ended At",
        accessor: "endedAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) =>
          value ? (
            <img
              src={`https://solveandwins.advanceaitool.com/uploads/${value}`}
              alt="Competition"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          ) : (
            "No Image"
          ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <FaUserEdit
              onClick={() => handleEditOpen(row.original)}
              style={{ fontSize: "20px", color: "#1976d2", cursor: "pointer" }}
              title="Edit Competition"
            />
            <MdDeleteForever
              onClick={() => handleDelete(row.original.id)}
              style={{ fontSize: "20px", color: "#d32f2f", cursor: "pointer" }}
              title="Delete Competition"
            />
          </div>
        ),
      },
    ],
    []
  );

  // Initialize React Table
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
      data: competitions,
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial pagination settings
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <div style={{ padding: "20px" }}>
      {/* Toolbar with Search and Add Button */}
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
              width: "300px",
            }}
          />
        </Toolbar>
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Add New Competition
        </Button>
      </div>

      {/* Competitions Table */}
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell
                    key={column.id}
                    {...column.getHeaderProps(
                      column.getSortByToggleProps()
                    )}
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
            {page.length > 0 ? (
              page.map((row) => {
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
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No competitions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { label: "All", value: competitions.length },
        ]}
        component="div"
        count={competitions.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) =>
          setPageSize(Number(event.target.value))
        }
      />

      {/* Add Competition Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Add New Competition
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
            {/* Title Field */}
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            {/* Description Field */}
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
            />
            {/* Start Date Field */}
            <TextField
              label="Start Date"
              name="startedAt"
              type="date"
              value={formData.startedAt}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            {/* End Date Field */}
            <TextField
              label="End Date"
              name="endedAt"
              type="date"
              value={formData.endedAt}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            {/* Status Selector */}
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="visible">Visible</option>
              <option value="hide">Hide</option>
              <option value="featured">Featured</option>
            </TextField>
            {/* Image Upload */}
            <div style={{ marginTop: "16px" }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    image: e.target.files[0],
                  }))
                }
              />
            </div>
            {/* Form Actions */}
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

      {/* Edit Competition Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Competition
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
            {/* Title Field */}
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            {/* Description Field */}
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
            />
            {/* Start Date Field */}
            <TextField
              label="Start Date"
              name="startedAt"
              type="date"
              value={formData.startedAt}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            {/* End Date Field */}
            <TextField
              label="End Date"
              name="endedAt"
              type="date"
              value={formData.endedAt}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            {/* Status Selector */}
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="visible">Visible</option>
              <option value="hide">Hide</option>
            </TextField>
            {/* Image Upload */}
            <div style={{ marginTop: "16px" }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    image: e.target.files[0],
                  }))
                }
              />
              {editingCompetition && editingCompetition.image && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={`https://solveandwins.advanceaitool.com/uploads/${editingCompetition.image}`}
                    alt="Current Competition"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <p>Current Image</p>
                </div>
              )}
            </div>
            {/* Form Actions */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle id="delete-confirmation-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          {deleteConfirmation.id && (
            <p>
              Are you sure you want to delete the competition with ID{" "}
              {deleteConfirmation.id}?
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
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

export default Competitions;
