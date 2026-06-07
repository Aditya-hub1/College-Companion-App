import { useState, useEffect } from "react";

function Assignments() {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("assignments");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "DBMS Assignment",
            subject: "DBMS",
            dueDate: "2026-06-15",
            priority: "High",
            status: "Pending",
          },
          {
            id: 2,
            title: "DSA Sheet 3",
            subject: "DSA",
            dueDate: "2026-06-18",
            priority: "Medium",
            status: "Completed",
          },
        ];
  });

  // ✅ Save to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  /* =========================
     FORM STATES
  ========================= */

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("All");

  /* =========================
     ADD ASSIGNMENT
  ========================= */

  const addAssignment = () => {
    if (
      title.trim() === "" ||
      subject.trim() === "" ||
      dueDate.trim() === ""
    ) {
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      priority,
      status,
    };

    setAssignments([...assignments, newAssignment]);

    setTitle("");
    setSubject("");
    setDueDate("");
    setPriority("Medium");
    setStatus("Pending");
  };

  /* =========================
     DELETE ASSIGNMENT
  ========================= */

  const deleteAssignment = (id) => {
    setAssignments(
      assignments.filter((assignment) => assignment.id !== id)
    );
  };

  /* =========================
     COMPLETE ASSIGNMENT
  ========================= */

  const completeAssignment = (id) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status: "Completed" }
          : assignment
      )
    );
  };
  /* =========================
   OVERDUE HELPER
========================= */

const isOverdue = (assignment) => {
  if (assignment.status === "Completed") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore time, compare dates only
  const due = new Date(assignment.dueDate);
  return due < today;
};

  /* =========================
     STATS
  ========================= */

  const totalAssignments = assignments.length;

  const completedAssignments = assignments.filter(
    (assignment) => assignment.status === "Completed"
  ).length;

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;
  const overdueAssignments = assignments.filter(
  (assignment) => isOverdue(assignment)
).length;

  const productivityScore =
    totalAssignments === 0
      ? 0
      : Math.round((completedAssignments / totalAssignments) * 100);

 const filteredAssignments = assignments
  .filter((assignment) => {
    if (filterBy === "All") return true;
    if (filterBy === "Overdue") return isOverdue(assignment);
    return assignment.status === filterBy;
  })
    .filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAssignments = [...filteredAssignments];

  if (sortBy === "dueDate") {
    sortedAssignments.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
  }

  if (sortBy === "priority") {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    sortedAssignments.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  if (sortBy === "pending") {
    sortedAssignments.sort((a, b) => {
      if (a.status === "Pending" && b.status === "Completed") return -1;
      if (a.status === "Completed" && b.status === "Pending") return 1;
      return 0;
    });
  }

  return (
    <div className="assignments-page">

      {/* HERO SECTION */}
      <div className="assignments-header">
        <h1>📝 Assignment Tracker</h1>
        <p>
          Track assignments, monitor deadlines, complete tasks and improve your
          productivity throughout the semester.
        </p>
      </div>


      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalAssignments}</h2>
          <p>📝 Total</p>
        </div>
        <div className="stat-card">
          <h2>{completedAssignments}</h2>
          <p>✅ Completed</p>
        </div>
        <div className="stat-card">
          <h2>{pendingAssignments}</h2>
          <p>⏳ Pending</p>
        </div>
        <div className="stat-card">
          <h2>{productivityScore}%</h2>
          <p>🏆 Productivity</p>
        </div>
      </div>
      <div className="stat-card overdue-card">
  <h2>{overdueAssignments}</h2>
  <p>🚨 Overdue</p>
</div>

      {/* FORM HEADER */}
      <div className="form-header">
        <h2>➕ Add New Assignment</h2>
        <p>Create and manage your academic tasks.</p>
      </div>

      {/* ASSIGNMENT FORM */}
      <div className="assignment-form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="search-input"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="search-input"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="search-input"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="search-input"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="search-input"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button className="add-btn" onClick={addAssignment}>
          ➕ Add Assignment
        </button>
      </div>

      {/* SEARCH & SORT */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="🔍 Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-dropdown"
        >
          <option value="default">Sort By</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="pending">Pending First</option>
        </select>
      </div>

      {/* FILTER BUTTONS */}
      <div className="filter-buttons">
        {["All", "Pending", "Completed","Overdue"].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${filterBy === filter ? "active-filter" : ""}`}
            onClick={() => setFilterBy(filter)}
          >
            {filter === "All" && "📋 "}
            {filter === "Pending" && "⏳ "}
            {filter === "Completed" && "✅ "}
            {filter === "Overdue" && "🚨 "}
            {filter}
          </button>
        ))}
      </div>

      {/* ASSIGNMENT CARDS */}
      <div className="assignments-grid">
        {sortedAssignments.length > 0 ? (
          sortedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className={`assignment-card ${
  assignment.status === "Completed"
    ? "completed"
    : isOverdue(assignment)
    ? "overdue"
    : "pending"
}`}
            >
              <h3>{assignment.title}</h3>

              <p>📚 Subject: {assignment.subject}</p>

              <p className="due-date">📅 Due: {assignment.dueDate}</p>
              {isOverdue(assignment) && (
                <p className="overdue-label">🚨 Overdue!</p>
)}

              <p>
                🔥 Priority:
                <span
                  className={`priority-badge priority-${assignment.priority.toLowerCase()}`}
                >
                  {" "}
                  {assignment.priority}
                </span>
              </p>

              <p>
                ✅ Status:
                <span
                  className={`status-badge ${
                    assignment.status === "Completed"
                      ? "completed-badge"
                      : "pending-badge"
                  }`}
                >
                  {" "}
                  {assignment.status}
                </span>
              </p>

              <div className="assignment-actions">
                {assignment.status !== "Completed" && (
                  <button
                    className="complete-btn"
                    onClick={() => completeAssignment(assignment.id)}
                  >
                    ✅ Complete
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteAssignment(assignment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-assignments">
            <h3>📭 No Assignments Yet</h3>
            <p>Create your first assignment to get started.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Assignments;