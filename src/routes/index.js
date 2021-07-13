const { Router } = require("express");
const attendanceRouter = require("./attendance.router");

const router = Router();
router.use("/attendance", attendanceRouter);

module.exports = router;
