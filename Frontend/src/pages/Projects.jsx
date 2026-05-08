import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

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

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
    };

    loadProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post("/projects", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setFormData({
        title: "",
        description: "",
      });

      setEditingId(null);

      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setFormData({
      title: project.title,
      description: project.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Projects</h1>

        {role === "admin" && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
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

            <button type="submit" style={styles.button}>
              {editingId ? "Update Project" : "Create Project"}
            </button>
          </form>
        )}

        <div style={styles.projectContainer}>
          {projects.map((project) => (
            <div key={project.id} style={styles.card}>
              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <small>Created By: {project.created_by_name}</small>

              {role === "admin" && (
                <div style={styles.actionContainer}>
                  <button
                    onClick={() => handleEdit(project)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              )}
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
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "450px",
    marginBottom: "40px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
  },

  textarea: {
    padding: "14px",
    minHeight: "120px",
    borderRadius: "10px",
    border: "none",
  },

  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  projectContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "#111827",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  actionContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  editBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#f59e0b",
    color: "white",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};

export default Projects;
