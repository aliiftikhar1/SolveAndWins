// pages/results.js

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/api/result"); // Fetch data from API
        setResults(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Result ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Competition</TableCell>
              <TableCell>No. of Questions</TableCell>
              <TableCell>Correct Answers</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Time Attempted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.id}</TableCell>
                <TableCell>{result.user.fullname}</TableCell>
                <TableCell>{result.competition.title}</TableCell>
                <TableCell>{result.noOfQuestions}</TableCell>
                <TableCell>{result.correctAnswers}</TableCell>
                <TableCell>{result.score}</TableCell>
                <TableCell>{new Date(result.timeAttempted).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsPage;
