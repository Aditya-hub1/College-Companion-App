import { useState } from "react";
import { notes } from "../data/notes";
import NoteCard from "../components/NoteCard";

function NotesHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesSubject =
      subjectFilter === "All" ||
      note.subject === subjectFilter;

    const matchesSemester =
      semesterFilter === "All" ||
      note.semester.toString() === semesterFilter;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesSemester
    );
  });

  const totalNotes = notes.length;

  const totalDownloads = notes.reduce(
    (sum, note) => sum + note.downloads,
    0
  );

  const averageRating = (
    notes.reduce(
      (sum, note) => sum + note.rating,
      0
    ) / notes.length
  ).toFixed(1);

  const totalSubjects = new Set(
    notes.map((note) => note.subject)
  ).size;

  const subjects = [
    "All",
    ...new Set(
      notes.map((note) => note.subject)
    ),
  ];
  const semesters = [
  "All",
  ...new Set(
    notes.map((note) =>
      note.semester.toString()
    )
  ),
];

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>📚 Notes Hub</h1>
        <p>
          Discover, share and download study
          materials from fellow students.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalNotes}</h2>
          <p>📚 Total Notes</p>
        </div>

        <div className="stat-card">
          <h2>{averageRating}</h2>
          <p>⭐ Average Rating</p>
        </div>

        <div className="stat-card">
          <h2>{totalDownloads}</h2>
          <p>📥 Downloads</p>
        </div>

        <div className="stat-card">
          <h2>{totalSubjects}</h2>
          <p>🎓 Subjects</p>
        </div>
      </div>

      <div className="filter-panel">
        <input
          type="text"
          placeholder="Search notes..."
          className="search-input"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={subjectFilter}
          onChange={(e) =>
            setSubjectFilter(e.target.value)
          }
          className="search-input"
        >
          {subjects.map((subject) => (
            <option
              key={subject}
              value={subject}
            >
              {subject}
            </option>
          ))}
        </select>

        <select
  value={semesterFilter}
  onChange={(e) => setSemesterFilter(e.target.value)}
  className="search-input"
>
  {semesters.map((semester) => (
    <option
      key={semester}
      value={semester}
    >
      {semester === "All"
        ? "All Semesters"
        : `Semester ${semester}`}
    </option>
  ))}
</select>

        <button className="upload-btn">
          Upload Notes
        </button>
      </div>

      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
            />
          ))
        ) : (
          <div className="no-notes">
            <h3>📭 No Notes Found</h3>
            <p>
              Try changing your search or
              filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesHub;