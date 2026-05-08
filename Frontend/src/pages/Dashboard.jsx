import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
    };

    loadStats();
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "700",
            marginBottom: "10px",
            color: "#f8fafc",
          }}
        >
          Welcome Back 👋
        </h1>
        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
            fontSize: "18px",
          }}
        >
          Here's what's happening with your tasks today.
        </p>

        <div style={styles.cardContainer}>
          <div
            style={{
              ...styles.card,
              ...styles.totalCard,
            }}
          >
            <h2 style={styles.title}>Total Tasks</h2>

            <p style={styles.value}>{stats.totalTasks}</p>
          </div>

          <div
            style={{
              ...styles.card,
              ...styles.completedCard,
            }}
          >
            <h2 style={styles.title}>Completed</h2>

            <p style={styles.value}>{stats.completedTasks}</p>
          </div>

          <div
            style={{
              ...styles.card,
              ...styles.pendingCard,
            }}
          >
            <h2 style={styles.title}>Pending</h2>

            <p style={styles.value}>{stats.pendingTasks}</p>
          </div>

          <div
            style={{
              ...styles.card,
              ...styles.overdueCard,
            }}
          >
            <h2 style={styles.title}>Overdue</h2>

            <p style={styles.value}>{stats.overdueTasks}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "#ffffff",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    marginTop: "30px",
  },

  card: {
    padding: "28px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    transition: "0.3s",
  },

  totalCard: {
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },

  completedCard: {
    background: "linear-gradient(135deg, #10b981, #059669)",
  },

  pendingCard: {
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
  },

  overdueCard: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "14px",
    opacity: 0.9,
  },

  value: {
    fontSize: "42px",
    fontWeight: "bold",
  },
};

export default Dashboard;
