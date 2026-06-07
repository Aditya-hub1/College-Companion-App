function Dashboard() {
  return (
    <div className="dashboard">
      <h1>🎓 Student Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>📚 Notes</h2>
          <p>12 Notes Available</p>
        </div>

        <div className="dashboard-card">
          <h2>📅 Events</h2>
          <p>3 Upcoming Events</p>
        </div>

        <div className="dashboard-card">
          <h2>💼 Placements</h2>
          <p>5 Active Opportunities</p>
        </div>

        <div className="dashboard-card">
          <h2>📝 Assignments</h2>
          <p>2 Pending Tasks</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;