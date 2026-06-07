
function NoteCard({ note }) {
  return (
    <div className="note-card">
      <span className="subject-badge">
        {note.subject}
      </span>

      <h3>{note.title}</h3>

      <p>👤 Uploaded by: {note.uploader}</p>
      <p>⭐ Rating: {note.rating}</p>
      <p>📥 Downloads: {note.downloads}</p>
      <p>🎓 Semester: {note.semester}</p>

      <button>Download</button>
    </div>
  );
}

export default NoteCard;