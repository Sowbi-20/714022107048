// src/logging/logging-middleware.js
export function Log(stack, level, pkg, message) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    pkg,
    message,
  };

  // Instead of fetch (backend), just save in localStorage for frontend-only
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(logEntry);
  localStorage.setItem("logs", JSON.stringify(logs));

  // Optional: show in console (grouped nicely)
  if (process.env.NODE_ENV === "development") {
    console.group(`[${level.toUpperCase()}] ${pkg}`);
    console.log("Stack:", stack);
    console.log("Message:", message);
    console.log("Time:", logEntry.timestamp);
    console.groupEnd();
  }
}
