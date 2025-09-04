// src/logging/logging-middleware.js
export function Log(stack, level, pkg, message) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    // Replace with the test server URL given in pre-setup
    fetch("http://localhost:5000/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEntry),
    });
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
