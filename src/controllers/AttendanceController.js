const AttendanceService = require("../services/AttendanceService");

class AttedanceController {
  constructor() {
    this._attendanceService = new AttendanceService();
  }

  add(req, res) {
    const { client, pet, service, status, observations, data } = req.body;

    this._attendanceService
      .add(client, pet, service, status, observations, data)
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(400).json(error));
  }

  findById(req, res) {
    const { id } = req.params;

    this._attendanceService
      .findById(id)
      .then((result) => res.json(result))
      .catch((error) => res.status(400).json(error));
  }

  update(req, res) {
    const { id } = req.params;
    const { client, pet, service, status, observations, data } = req.body;
    this._attendanceService
      .update(client, pet, service, status, observations, data, id)
      .then(() => res.send())
      .catch((error) => res.status(400).json(error));
  }

  delete(req, res) {
    const { id } = req.params;
    this._attendanceService
      .delete(id)
      .then(() => res.send())
      .catch((error) => res.json(error));
  }

  list(req, res) {
    this._attendanceService
      .list()
      .then((result) => res.json(result))
      .catch((error) => res.status(400).json(error));
  }
}

module.exports = AttedanceController;
