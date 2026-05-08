const pool = require("../db/db");

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date, project_id, assigned_to } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks
      (
        title,
        description,
        due_date,
        project_id,
        assigned_to,
        created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [title, description, due_date, project_id, assigned_to, req.user.id],
    );

    res.status(201).json({
      message: "Task created",
      task: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await pool.query(
        `SELECT tasks.*,
        users.name AS assigned_user,
        projects.title AS project_name
        FROM tasks
        JOIN users
        ON tasks.assigned_to = users.id
        JOIN projects
        ON tasks.project_id = projects.id
        ORDER BY tasks.id DESC`,
      );
    } else {
      result = await pool.query(
        `SELECT tasks.*,
        projects.title AS project_name
        FROM tasks
        JOIN projects
        ON tasks.project_id = projects.id
        WHERE assigned_to=$1
        ORDER BY tasks.id DESC`,
        [req.user.id],
      );
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const { id } = req.params;

    const result = await pool.query(
      `UPDATE tasks
      SET status=$1
      WHERE id=$2
      RETURNING *`,
      [status, id],
    );

    res.json({
      message: "Task updated",
      task: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
