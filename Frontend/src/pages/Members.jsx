import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import api from "../services/api";

function Members() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      await fetchUsers();
    };

    loadStats();
  }, []);
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Team Members</h1>

        <div style={styles.grid}>
          {users.map((user) => (
            <div key={user.id} style={styles.card}>
              <h2>{user.name}</h2>

              <p>{user.email}</p>

              <span
                style={{
                  ...styles.role,
                  background: user.role === "admin" ? "#2563eb" : "#10b981",
                }}
              >
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "40px",
    color: "white",
  },

  heading: {
    fontSize: "40px",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#111827",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  role: {
    display: "inline-block",
    marginTop: "14px",
    padding: "6px 14px",
    borderRadius: "20px",
    color: "white",
    fontSize: "14px",
  },
};

export default Members;
