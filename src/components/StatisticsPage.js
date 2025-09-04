import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function StatisticsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("shortened") || "[]");
    setStats(saved);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(270deg, #43cea2, #185a9d)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        p: 3,
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <Paper
        sx={{
          width: "90%",
          maxWidth: "900px",
          p: 4,
          borderRadius: "25px",
          boxShadow: 6,
          bgcolor: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          📊 Shortener Statistics
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(45deg,#ff512f,#dd2476)" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Short URL</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Original URL</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Created At</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((s, i) => (
              <TableRow key={i} hover>
                <TableCell>{s.shortUrl}</TableCell>
                <TableCell>{s.longUrl}</TableCell>
                <TableCell>{s.createdAt}</TableCell>
                <TableCell>{s.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default StatisticsPage;
