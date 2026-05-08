const pool = require("../db/db");

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      `INSERT INTO projects
      (title, description, created_by)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, description, req.user.id],
    );

    res.status(201).json({
      message: "Project created",
      project: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT projects.*,
      users.name AS created_by_name
      FROM projects
      JOIN users
      ON projects.created_by = users.id
      ORDER BY projects.id DESC`,
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM projects
       WHERE id=$1`,
      [id],
    );

    res.json({
      message: "Project deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description } = req.body;

    const result = await pool.query(
      `UPDATE projects
       SET title=$1,
       description=$2
       WHERE id=$3
       RETURNING *`,
      [title, description, id],
    );

    res.json({
      message: "Project updated",
      project: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
