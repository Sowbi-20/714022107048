import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Log } from "../logging/logging-middleware";

function StatisticsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Simulated stats for now
    const dummy = [
      {
        shortUrl: "short.ly/abc123",
        longUrl: "https://example.com",
        clicks: 10,
        createdAt: "2025-09-04 10:00",
        expiry: "2025-09-04 10:30",
        details: [{ time: "2025-09-04 10:05", source: "Chrome", location: "India" }],
      },
    ];
    setStats(dummy);
    Log("StatisticsPage", "info", "stats", "Fetched statistics");
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5">Shortener Statistics</Typography>
      <List>
        {stats.map((s, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`${s.shortUrl} | Clicks: ${s.clicks}`}
              secondary={`Original: ${s.longUrl} | Expiry: ${s.expiry}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default StatisticsPage;
