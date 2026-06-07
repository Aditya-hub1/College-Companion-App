import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        🎓 College Companion
      </div>

      <ul className="nav-links">
        <li>
          <Link
            className={
              location.pathname === "/"
                ? "active-link"
                : ""
            }
            to="/"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname === "/notes"
                ? "active-link"
                : ""
            }
            to="/notes"
          >
            Notes Hub
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname === "/events"
                ? "active-link"
                : ""
            }
            to="/events"
          >
            Event Hub
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname === "/placements"
                ? "active-link"
                : ""
            }
            to="/placements"
          >
            Placements
          </Link>
        </li>

        <li>
  <Link
    className={
      location.pathname === "/assignments"
        ? "active-link"
        : ""
    }
    to="/assignments"
  >
    Assignments
  </Link>
</li>

        <li>
          <Link
            className={
              location.pathname === "/profile"
                ? "active-link"
                : ""
            }
            to="/profile"
          >
            Profile
          </Link>
        </li>
      </ul>

      <div className="nav-user">
        🔔
        <div className="avatar">
          A
        </div>
      </div>
    </nav>
  );
}

export default Navbar;