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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [topResults, setTopResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to format time from seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultsResponse, competitionsResponse] = await Promise.all([
          axios.get("/api/result"), // Fetch results data
          axios.get("/api/competition"), // Fetch competitions data
        ]);

        setResults(resultsResponse.data);
        setCompetitions(competitionsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle competition selection
  const handleCompetitionChange = (event) => {
    const competitionId = event.target.value;
    setSelectedCompetition(competitionId);

    // Filter results for the selected competition
    const filteredResults = results.filter(
      (result) => result.competition.id === competitionId
    );

    // Sort the results by score descending and timeTaken ascending
    const sortedResults = filteredResults.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Higher score first
      } else {
        return a.timeTaken - b.timeTaken; // Lower timeTaken first
      }
    });

    // Get top 3 results
    const topThreeResults = sortedResults.slice(0, 3);
    setTopResults(topThreeResults);
  };

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

      {/* Competition Selection */}
      <Box sx={{ marginBottom: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="competition-select-label">Select Competition</InputLabel>
          <Select
            labelId="competition-select-label"
            value={selectedCompetition}
            label="Select Competition"
            onChange={handleCompetitionChange}
          >
            {competitions.map((competition) => (
              <MenuItem key={competition.id} value={competition.id}>
                {competition.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Top 3 Results */}
      {selectedCompetition && topResults.length > 0 && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" gutterBottom>
            Top 3 Results for {competitions.find(c => c.id === selectedCompetition)?.title}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Position</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Time Taken</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topResults.map((result, index) => (
                  <TableRow key={result.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{result.user.fullname}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>{formatTime(result.timeTaken)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* All Results Table */}
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
              <TableCell>Time Taken</TableCell>
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
                <TableCell>{formatTime(result.timeTaken)}</TableCell>
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
