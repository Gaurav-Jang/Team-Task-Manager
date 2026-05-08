const pool = require("../db/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users(name,email,password)
       VALUES($1,$2,$3)
       RETURNING *`,
      [name, email, hashedPassword],
    );

    res.status(201).json({
      message: "User registered",
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
          id,
          name,
          email,
          role
         FROM users
         ORDER BY id DESC`,
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
