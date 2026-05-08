const pool = require("../db/db");

exports.getDashboardStats = async (req, res) => {
  try {
    let totalTasks;
    let completedTasks;
    let pendingTasks;
    let overdueTasks;

    if (req.user.role === "admin") {
      totalTasks = await pool.query(`SELECT COUNT(*) FROM tasks`);

      completedTasks = await pool.query(
        `SELECT COUNT(*) FROM tasks
         WHERE status='completed'`,
      );

      pendingTasks = await pool.query(
        `SELECT COUNT(*) FROM tasks
         WHERE status='todo'`,
      );

      overdueTasks = await pool.query(
        `SELECT COUNT(*) FROM tasks
         WHERE due_date < CURRENT_DATE
         AND status != 'completed'`,
      );
    } else {
      totalTasks = await pool.query(
        `SELECT COUNT(*) FROM tasks
         WHERE assigned_to=$1`,
        [req.user.id],
      );

      completedTasks = await pool.query(
        `SELECT COUNT(*) FROM tasks
         WHERE assigned_to=$1
         AND status='completed'`,
        [req.user.id],
      );

      pendingTasks = await pool.query(
        `SELECT COUNT(*) FROM tasks
         WHERE assigned_to=$1
         AND status='todo'`,
        [req.user.id],
      );

      overdueTasks = await pool.query(
        `SELECT COUNT(*) FROM tasks
         WHERE assigned_to=$1
         AND due_date < CURRENT_DATE
         AND status != 'completed'`,
        [req.user.id],
      );
    }

    res.json({
      totalTasks: totalTasks.rows[0].count,

      completedTasks: completedTasks.rows[0].count,

      pendingTasks: pendingTasks.rows[0].count,

      overdueTasks: overdueTasks.rows[0].count,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
