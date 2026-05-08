const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

router.post("/", authMiddleware, roleMiddleware("admin"), createProject);

router.get("/", authMiddleware, getProjects);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProject);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateProject);
module.exports = router;
