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
  });

  useEffect(() => {
    fetchCompetitions();
  }, []);

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

  const handleAddOpen = () => {
    setFormData({
      title: "",
      description: "",
      startedAt: "",
      endedAt: "",
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (competition) => {
    setEditingCompetition(competition);
    setFormData({
      title: competition.title,
      description: competition.description,
      startedAt: competition.startedAt,
      endedAt: competition.endedAt,
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingCompetition(null);
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

    const { title, description, startedAt, endedAt } = formData;

    if (!title || !description || !startedAt || !endedAt) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.post("/api/competition", formData);
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { title, description, startedAt, endedAt } = formData;

    if (!title || !description || !startedAt || !endedAt) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.put(`/api/competition/${editingCompetition.id}`, formData);
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

  const handleDelete = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

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
      data: competitions,
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
          Add New Competition
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
                  No competitions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { label: "All", value: competitions.length },
        ]}
        component="div" count={competitions.length} rowsPerPage={pageSize} page={pageIndex} onPageChange={(event, newPage) => gotoPage(newPage)} onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))} />

{/* Add Competition Dialog */}
  <Dialog
    open={openAddDialog}
    onClose={handleAddClose}
    maxWidth="md"
    fullWidth
  >
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
        {/* Add Fields */}
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
  <Dialog
    open={openEditDialog}
    onClose={handleEditClose}
    maxWidth="md"
    fullWidth
  >
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
        {/* Edit Fields */}
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
); };

export default Competitions;