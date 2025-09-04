import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { Log } from "../logging/logging-middleware";
import { motion } from "framer-motion"; // for animations

function UrlShortenerPage() {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", type: "success" });

  const handleShorten = () => {
    if (!url.startsWith("http")) {
      setSnackbar({ open: true, msg: "❌ Invalid URL! Must start with http(s)", type: "error" });
      Log("Shortener", "error", "validation", "Invalid URL entered");
      return;
    }

    const code = Math.random().toString(36).substring(7);
    const shortUrl = `short.ly/${code}`;
    const createdAt = new Date().toLocaleString();

    const newEntry = { longUrl: url, shortUrl, createdAt, clicks: 0 };
    setShortened([...shortened, newEntry]);
    setUrl("");

    setSnackbar({ open: true, msg: "✅ URL shortened successfully!", type: "success" });
    Log("Shortener", "info", "shortener", `Shortened ${url} -> ${shortUrl}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(270deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
        backgroundSize: "800% 800%",
        animation: "gradientShift 20s ease infinite",
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

      <Card
        sx={{
          width: "650px",
          borderRadius: "25px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          p: 4,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          ✨ URL Shortener
        </Typography>

        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs={9}>
            <TextField
              label="Enter a URL"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              InputProps={{
                style: { backgroundColor: "#fff", borderRadius: 12 },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={handleShorten}
              sx={{
                height: "100%",
                borderRadius: "12px",
                fontWeight: "bold",
                bgcolor: "linear-gradient(45deg,#ff6a00,#ee0979)",
                "&:hover": { boxShadow: "0px 4px 15px rgba(255,105,180,0.5)" },
              }}
            >
              Shorten 🚀
            </Button>
          </Grid>
        </Grid>

        {shortened.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
          >
            <Card
              sx={{
                mt: 2,
                p: 2,
                borderRadius: "15px",
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary">
                  🔗 {s.shortUrl}
                </Typography>
                <Typography variant="body2">🌍 Original: {s.longUrl}</Typography>
                <Typography variant="body2">📅 Created: {s.createdAt}</Typography>
                <Typography variant="body2">👆 Clicks: {s.clicks}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.type} sx={{ width: "100%" }}>
            {snackbar.msg}
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  );
}

export default UrlShortenerPage;
