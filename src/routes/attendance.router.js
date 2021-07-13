const { Router } = require("express");
const AttendanceController = require("../controllers/AttendanceController");

const attendanceRouter = Router();
const attendanceController = new AttendanceController();

attendanceRouter.get("/", (req, res) => attendanceController.list(req, res));
attendanceRouter.get("/:id", (req, res) =>
  attendanceController.findById(req, res)
);
attendanceRouter.post("/", (req, res) => attendanceController.add(req, res));

attendanceRouter.put("/:id", (req, res) => attendanceController.update(req, res));
attendanceRouter.delete("/:id", (req, res) => attendanceController.delete(req, res))

module.exports = attendanceRouter;
