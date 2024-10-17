"use client";

import React, { useState, useEffect, useMemo } from "react";
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

import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddQuestion = () => {
  const [competitions, setCompetitions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    competitionId: "",
    qText: "",
    op1: "",
    op2: "",
    op3: "",
    op4: "",
    key: "",
    status: "Show", // Set default value
    incompetition: "Yes", // Set default value
  });

  const optionList = useMemo(
    () =>
      [
        { value: formData.op1, label: formData.op1 },
        { value: formData.op2, label: formData.op2 },
        { value: formData.op3, label: formData.op3 },
        { value: formData.op4, label: formData.op4 },
      ].filter((option) => option.value),
    [formData.op1, formData.op2, formData.op3, formData.op4]
  );

  useEffect(() => {
    fetchCompetitions();
    fetchQuestions();
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

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/api/questions");
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch questions.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    let filtered = questions;
    if (searchQuery) {
      filtered = filtered.filter((question) =>
        question.qText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCompetition) {
      filtered = filtered.filter(
        (question) => question.competitionId === parseInt(selectedCompetition)
      );
    }

    setFilteredQuestions(filtered);
  }, [searchQuery, selectedCompetition, questions]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCompetitionChange = (e) => {
    setSelectedCompetition(e.target.value);
  };

  const handleAddOpen = () => {
    setFormData({
      competitionId: selectedCompetition || "",
      qText: "",
      op1: "",
      op2: "",
      op3: "",
      op4: "",
      key: "",
      status: "Show", // New field
      incompetition: "Yes", // New field
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

  const handleStatusChange = async (question, newStatus) => {
    try {
      await axios.put(`/api/questions/${question.id}`, {
        ...question,
        status: newStatus,
      });
      setSnackbar({
        open: true,
        message: "Status updated successfully.",
        type: "success",
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error updating status:", error);
      setSnackbar({
        open: true,
        message: "Failed to update status.",
        type: "error",
      });
    }
  };

  const handleInCompetitionChange = async (question, newInCompetition) => {
    try {
      await axios.put(`/api/questions/${question.id}`, {
        ...question,
        incompetition: newInCompetition,
      });
      setSnackbar({
        open: true,
        message: "In Competition updated successfully.",
        type: "success",
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error updating in competition:", error);
      setSnackbar({
        open: true,
        message: "Failed to update in competition.",
        type: "error",
      });
    }
  };

  const handleEditOpen = (question) => {
    setEditingQuestion(question);
    setFormData({
      competitionId: question.competitionId,
      qText: question.qText,
      op1: question.op1,
      op2: question.op2,
      op3: question.op3,
      op4: question.op4,
      key: question.key,
      status: question.status,
      incompetition: question.incompetition,
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingQuestion(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { competitionId, qText, op1, op2, op3, op4, key, status, incompetition } = formData;

    if (!competitionId || !qText || !op1 || !op2 || !op3 || !op4 || !key) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.put(`/api/questions/${editingQuestion.id}`, formData);
      setSnackbar({
        open: true,
        message: "Question updated successfully.",
        type: "success",
      });
      fetchQuestions();
      handleEditClose();
    } catch (error) {
      console.error("Error updating question:", error);
      setSnackbar({
        open: true,
        message: "Failed to update question.",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/questions/${id}`);
      setSnackbar({
        open: true,
        message: "Question deleted successfully.",
        type: "warning",
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete question.",
        type: "error",
      });
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { competitionId, qText, op1, op2, op3, op4, key, status, incompetition } = formData;

    if (!competitionId || !qText || !op1 || !op2 || !op3 || !op4 || !key) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.post("/api/questions", formData);
      setSnackbar({
        open: true,
        message: "Question added successfully.",
        type: "success",
      });
      fetchQuestions();
      handleAddClose();
    } catch (error) {
      console.error("Error adding question:", error);
      setSnackbar({
        open: true,
        message: "Failed to add question.",
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
            placeholder="Search questions"
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
          Add New Question
        </Button>
      </div>

      {/* Competition Select Filter */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="competition-filter-label">Filter by Competition</InputLabel>
        <Select
          labelId="competition-filter-label"
          value={selectedCompetition}
          onChange={handleCompetitionChange}
          label="Filter by Competition"
        >
          <MenuItem value="">
            <em>All Competitions</em>
          </MenuItem>
          {competitions.map((competition) => (
            <MenuItem key={competition.id} value={competition.id}>
              {competition.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Table displaying questions */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Question Text</TableCell>
              <TableCell>Competition</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Correct Option (Key)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>In Competition</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.id}</TableCell>
                  <TableCell>{question.qText}</TableCell>
                  <TableCell>{question.competition.title}</TableCell>
                  <TableCell>
                    {question.op1}, {question.op2}, {question.op3}, {question.op4}
                  </TableCell>
                  <TableCell>{question.key}</TableCell>

                  {/* Status Dropdown */}
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={question.status}
                        onChange={(e) =>
                          handleStatusChange(question, e.target.value)
                        }
                      >
                        <MenuItem value="Show">Show</MenuItem>
                        <MenuItem value="Hide">Hide</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  {/* In Competition Dropdown */}
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        value={question.incompetition}
                        onChange={(e) =>
                          handleInCompetitionChange(question, e.target.value)
                        }
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <FaUserEdit
                        onClick={() => handleEditOpen(question)}
                        style={{
                          fontSize: "20px",
                          color: "#1976d2",
                          cursor: "pointer",
                        }}
                      />
                      <MdDeleteForever
                        onClick={() => handleDelete(question.id)}
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
        count={filteredQuestions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Add Question Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleAddClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New Question
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
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="competition-label">Competition</InputLabel>
              <Select
                labelId="competition-label"
                name="competitionId"
                value={formData.competitionId}
                onChange={handleInputChange}
                label="Competition"
              >
                {competitions.map((competition) => (
                  <MenuItem key={competition.id} value={competition.id}>
                    {competition.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Question Text"
              name="qText"
              value={formData.qText}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 1"
              name="op1"
              value={formData.op1}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 2"
              name="op2"
              value={formData.op2}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 3"
              name="op3"
              value={formData.op3}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 4"
              name="op4"
              value={formData.op4}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />

            {/* Correct Option (Key) Dropdown */}
            <FormControl
              fullWidth
              margin="normal"
              required
              disabled={optionList.length === 0}
            >
              <InputLabel id="key-label">Correct Option (Key)</InputLabel>
              <Select
                labelId="key-label"
                name="key"
                value={formData.key}
                onChange={handleInputChange}
                label="Correct Option (Key)"
              >
                {optionList.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Dropdown */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status || ""}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Show">Show</MenuItem>
                <MenuItem value="Hide">Hide</MenuItem>
              </Select>
            </FormControl>

            {/* In Competition Dropdown */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="incompetition-label">In Competition</InputLabel>
              <Select
                labelId="incompetition-label"
                name="incompetition"
                value={formData.incompetition || ""}
                onChange={handleInputChange}
                label="In Competition"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
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

      {/* Edit Question Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Question
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
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="competition-label">Competition</InputLabel>
              <Select
                labelId="competition-label"
                name="competitionId"
                value={formData.competitionId}
                onChange={handleInputChange}
                label="Competition"
              >
                {competitions.map((competition) => (
                  <MenuItem key={competition.id} value={competition.id}>
                    {competition.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Question Text"
              name="qText"
              value={formData.qText}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 1"
              name="op1"
              value={formData.op1}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 2"
              name="op2"
              value={formData.op2}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 3"
              name="op3"
              value={formData.op3}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Option 4"
              name="op4"
              value={formData.op4}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />

            {/* Correct Option (Key) Dropdown */}
            <FormControl
              fullWidth
              margin="normal"
              required
              disabled={optionList.length === 0}
            >
              <InputLabel id="key-label">Correct Option (Key)</InputLabel>
              <Select
                labelId="key-label"
                name="key"
                value={formData.key}
                onChange={handleInputChange}
                label="Correct Option (Key)"
              >
                {optionList.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status || ""}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Show">Show</MenuItem>
                <MenuItem value="Hide">Hide</MenuItem>
              </Select>
            </FormControl>

            {/* In Competition Dropdown */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="incompetition-label">In Competition</InputLabel>
              <Select
                labelId="incompetition-label"
                name="incompetition"
                value={formData.incompetition || ""}
                onChange={handleInputChange}
                label="In Competition"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
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

export default AddQuestion;
