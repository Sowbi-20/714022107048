import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UrlShortenerPage from "./components/UrlShortenerPage";
import StatisticsPage from "./components/StatisticsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/shortener" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="*" element={<Navigate to="/shortener" />} />
      </Routes>
    </Router>
  );
}

export default App;
