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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const Users = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    fathername: "",
    education: "",
    institute: "",
    dob: "",
    city: "",
    province: "",
    fbProfile: "",
    tiktok: "",
    whatsappNo: "",
    country: "",
    status: "", // Added status field
  });

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      console.log(response.data);
      setAdminUsers(response.data);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch users.",
        type: "error",
      });
    }
  };

  const handleAddOpen = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      fathername: "",
      education: "",
      institute: "",
      dob: "",
      city: "",
      province: "",
      fbProfile: "",
      tiktok: "",
      whatsappNo: "",
      country: "",
      status: "", // Reset status field
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (user) => {
    setEditingUser(user);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      password: "",
      confirmPassword: "",
      address: user.address,
      fathername: user.fathername,
      education: user.education,
      institute: user.institute,
      dob: user.dob ? user.dob.split("T")[0] : "",
      city: user.city,
      province: user.province,
      fbProfile: user.fbProfile,
      tiktok: user.tiktok,
      whatsappNo: user.whatsappNo,
      country: user.country,
      status: user.status || "", // Populate status field
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
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

    const { fullname, email, password, confirmPassword, status } = formData;

    if (!fullname || !email || !password || !confirmPassword || !status) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    try {
      await axios.post("/api/user", formData);
      setSnackbar({
        open: true,
        message: "User added successfully.",
        type: "success",
      });
      fetchAdminUsers();
      handleAddClose();
    } catch (error) {
      console.error("Error adding user:", error);
      setSnackbar({
        open: true,
        message: "Failed to add user.",
        type: "error",
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password, confirmPassword, status } = formData;

    if (!fullname || !email || !status) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    if (password && password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    try {
      const updateData = { ...formData };
      if (!password) {
        delete updateData.password; // Remove password field if not being updated
      }
      await axios.put(`/api/user/${editingUser.id}`, updateData);
      setSnackbar({
        open: true,
        message: "User updated successfully.",
        type: "success",
      });
      fetchAdminUsers();
      handleEditClose();
    } catch (error) {
      console.error("Error updating user:", error);
      setSnackbar({
        open: true,
        message: "Failed to update user.",
        type: "error",
      });
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/user/${deleteConfirmation.id}`);
      setSnackbar({
        open: true,
        message: "User deleted successfully.",
        type: "warning",
      });
      fetchAdminUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete user.",
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
        Header: "Full Name",
        accessor: "fullname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status", // Added status column
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Father's Name",
        accessor: "fathername",
      },
      {
        Header: "Education",
        accessor: "education",
      },
      {
        Header: "Institute",
        accessor: "institute",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Province",
        accessor: "province",
      },
      {
        Header: "Country",
        accessor: "country",
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
      data: adminUsers,
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
          Add New User
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
                  No users found.
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
          { label: "All", value: adminUsers.length },
        ]}
        component="div"
        count={adminUsers.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add User Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleAddClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New User
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
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            {/* Status Field */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
              </Select>
            </FormControl>
            {/* Other Fields */}
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Father's Name"
              name="fathername"
              value={formData.fathername}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Institute"
              name="institute"
              value={formData.institute}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Facebook Profile"
              name="fbProfile"
              value={formData.fbProfile}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="TikTok"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="WhatsApp Number"
              name="whatsappNo"
              value={formData.whatsappNo}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              fullWidth
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

      {/* Edit User Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit User
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
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              helperText="Leave blank to keep current password."
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              helperText="Leave blank to keep current password."
            />
            {/* Status Field */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
              </Select>
            </FormControl>
            {/* Other Fields */}
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Father's Name"
              name="fathername"
              value={formData.fathername}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Institute"
              name="institute"
              value={formData.institute}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Facebook Profile"
              name="fbProfile"
              value={formData.fbProfile}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="TikTok"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="WhatsApp Number"
              name="whatsappNo"
              value={formData.whatsappNo}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              fullWidth
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
              Are you sure you want to delete the user with ID{" "}
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

export default Users;
