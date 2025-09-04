import React, { useState } from "react";
import { TextField, Button, Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Log } from "../logging/logging-middleware";

function UrlShortenerPage() {
  const [urls, setUrls] = useState([""]);
  const [shortened, setShortened] = useState([]);

  const handleChange = (i, value) => {
    const copy = [...urls];
    copy[i] = value;
    setUrls(copy);
  };

  const handleAddField = () => {
    if (urls.length < 5) setUrls([...urls, ""]);
  };

  const handleShorten = () => {
    const results = urls.map((u, idx) => {
      if (!u || !u.startsWith("http")) {
        Log("UrlShortenerPage", "error", "validation", `Invalid URL at index ${idx}`);
        return { longUrl: u, error: "Invalid URL" };
      }
      const short = `short.ly/${Math.random().toString(36).substring(7)}`;
      Log("UrlShortenerPage", "info", "shortener", `Shortened ${u} -> ${short}`);
      return {
        longUrl: u,
        shortUrl: short,
        expiry: new Date(Date.now() + 30 * 60000).toLocaleString(),
      };
    });
    setShortened(results);
  };

  return (
    <Box p={2}>
      <Typography variant="h5">URL Shortener</Typography>
      {urls.map((u, i) => (
        <TextField
          key={i}
          label={`Enter URL #${i + 1}`}
          value={u}
          onChange={(e) => handleChange(i, e.target.value)}
          fullWidth
          margin="normal"
        />
      ))}
      <Button onClick={handleAddField} variant="outlined" disabled={urls.length >= 5}>+ Add More</Button>
      <Button onClick={handleShorten} variant="contained" sx={{ ml: 2 }}>Shorten</Button>

      <List>
        {shortened.map((s, i) => (
          <ListItem key={i}>
            {s.error ? (
              <ListItemText primary={`Error: ${s.error}`} />
            ) : (
              <ListItemText
                primary={`${s.shortUrl}`}
                secondary={`Original: ${s.longUrl} | Expiry: ${s.expiry}`}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default UrlShortenerPage;
