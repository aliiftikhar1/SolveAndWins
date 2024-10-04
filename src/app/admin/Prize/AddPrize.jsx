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
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table"; 
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Prize = () => {
  const [prizes, setPrizes] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);
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
    image: null, 
  });

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      const response = await axios.get("/api/prize");
      setPrizes(response.data);
    } catch (error) {
      console.error("Error fetching prizes:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch prizes.",
        type: "error",
      });
    }
  };

  const handleAddOpen = () => {
    setFormData({
      title: "",
      description: "",
      image: null, // Reset image field
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (prize) => {
    setEditingPrize(prize);
    setFormData({
      title: prize.title,
      description: prize.description,
      image: null, // Reset the image field
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingPrize(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to upload image and get URL
  const uploadImage = async (base64Image) => {
    try {
      const response = await axios.post(
        "https://solveandwins.advanceaitool.com/uploadImage.php",
        { image: base64Image }
      );
      return response.data.image_url; // Extract the image URL from the response
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image } = formData;

    if (!title || !description) {
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

      const prizeData = {
        title,
        description,
        image: imageUrl, // Save image URL to the database
      };

      await axios.post("/api/prize", prizeData);
      setSnackbar({
        open: true,
        message: "Prize added successfully.",
        type: "success",
      });
      fetchPrizes();
      handleAddClose();
    } catch (error) {
      console.error("Error adding prize:", error);
      setSnackbar({
        open: true,
        message: "Failed to add prize.",
        type: "error",
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image } = formData;

    if (!title || !description) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      let imageUrl = editingPrize.image; // Use the existing image URL by default
      if (image) {
        const base64Image = await convertToBase64(image);
        imageUrl = await uploadImage(base64Image);
      }

      const updatedPrizeData = {
        title,
        description,
        image: imageUrl, // Update with the new or existing image URL
      };

      await axios.put(`/api/prize/${editingPrize.id}`, updatedPrizeData);
      setSnackbar({
        open: true,
        message: "Prize updated successfully.",
        type: "success",
      });
      fetchPrizes();
      handleEditClose();
    } catch (error) {
      console.error("Error updating prize:", error);
      setSnackbar({
        open: true,
        message: "Failed to update prize.",
        type: "error",
      });
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/prize/${deleteConfirmation.id}`);
      setSnackbar({
        open: true,
        message: "Prize deleted successfully.",
        type: "warning",
      });
      fetchPrizes();
    } catch (error) {
      console.error("Error deleting prize:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete prize.",
        type: "error",
      });
    } finally {
      setDeleteConfirmation({ open: false, id: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, id: null });
  };

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
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <img
            src={`https://solveandwins.advanceaitool.com/uploads/${value}`}
            alt="Prize"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <FaUserEdit
              onClick={() => handleEditOpen(row.original)}
              style={{ fontSize: "20px", color: "#1976d2", cursor: "pointer" }}
            />
            <MdDeleteForever
              onClick={() => handleDelete(row.original.id)}
              style={{ fontSize: "20px", color: "#d32f2f", cursor: "pointer" }}
            />
          </div>
        ),
      },
    ],
    []
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
      data: prizes,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

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
          Add New Prize
        </Button>
      </div>

      {/* Table */}
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
                  No prizes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: prizes.length }]}
        component="div"
        count={prizes.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add Prize Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Add New Prize
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
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
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

      {/* Edit Prize Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Prize
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
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
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
        <DialogTitle id="delete-confirmation-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          {deleteConfirmation.id && (
            <p>
              Are you sure you want to delete the prize with ID{" "}
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

export default Prize;
