import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    project_id: "",
    assigned_to: "",
  });

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.put(
        `/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        title: "",
        description: "",
        due_date: "",
        project_id: "",
        assigned_to: "",
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchTasks();

      if (role === "admin") {
        await fetchUsers();

        await fetchProjects();
      }
    };

    loadData();
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Tasks</h1>

        {role === "admin" && (
          <form onSubmit={createTask} style={styles.form}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              style={styles.textarea}
            />

            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>

            <select
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Assign Member</option>

              {users
                .filter((user) => user.role === "member")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>

            <button type="submit" style={styles.createBtn}>
              Create Task
            </button>
          </form>
        )}

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>

              <th style={styles.th}>Project</th>

              <th style={styles.th}>Status</th>

              <th style={styles.th}>Due Date</th>

              {role === "admin" && <th style={styles.th}>Assigned User</th>}

              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={styles.td}>{task.title}</td>

                <td style={styles.td}>{task.project_name}</td>

                <td style={styles.td}>{task.status}</td>

                <td style={styles.td}>
                  {new Date(task.due_date).toLocaleDateString()}
                </td>

                {role === "admin" && (
                  <td style={styles.td}>{task.assigned_user}</td>
                )}

                <td style={styles.td}>
                  <select
                    style={styles.select}
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                  >
                    <option value="todo">Todo</option>

                    <option value="in-progress">In Progress</option>

                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    fontSize: "42px",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "500px",
    marginBottom: "40px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
  },

  textarea: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    minHeight: "100px",
  },

  createBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#111827",
    borderRadius: "12px",
    overflow: "hidden",
  },

  th: {
    background: "#1f2937",
    padding: "16px",
    textAlign: "left",
  },

  td: {
    padding: "16px",
    borderBottom: "1px solid #374151",
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
  },
};

export default Tasks;
