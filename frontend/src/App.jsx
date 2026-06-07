import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import NotesHub from "./pages/NotesHub";
import EventHub from "./pages/EventHub";
import PlacementDashboard from "./pages/PlacementDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<NotesHub />} />
        <Route path="/events" element={<EventHub />} />
        <Route path="/placements" element={<PlacementDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;