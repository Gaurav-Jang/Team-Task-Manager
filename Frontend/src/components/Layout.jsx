import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div>
          <h1 style={styles.logo}>Task Manager</h1>

          <p style={styles.subtitle}>Manage your projects easily</p>
        </div>

        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>

          <Link to="/projects" style={styles.link}>
            Projects
          </Link>

          <Link to="/tasks" style={styles.link}>
            Tasks
          </Link>
          {role === "admin" && (
            <Link to="/members" style={styles.link}>
              Members
            </Link>
          )}
        </div>

        <div style={styles.bottomSection}>
          <div style={styles.roleCard}>
            <p style={styles.roleText}>Logged in as</p>

            <h3 style={styles.roleValue}>{role}</h3>
          </div>

          <button onClick={logout} style={styles.button}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#020617",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
  },

  sidebar: {
    width: "270px",
    background: "linear-gradient(180deg, #0f172a, #111827)",
    color: "white",
    padding: "30px 22px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
  },

  logo: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#f8fafc",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  navLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "50px",
  },

  link: {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "17px",
    padding: "14px 18px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    transition: "0.3s",
  },

  bottomSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "auto",
  },

  roleCard: {
    background: "rgba(255,255,255,0.04)",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  roleText: {
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "6px",
  },

  roleValue: {
    color: "#38bdf8",
    fontSize: "20px",
    textTransform: "capitalize",
  },

  button: {
    padding: "14px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    boxShadow: "0 10px 20px rgba(239,68,68,0.2)",
  },

  content: {
    flex: 1,
    marginLeft: "270px",
    height: "100vh",
    overflowY: "auto",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "white",
  },
};

export default Layout;
