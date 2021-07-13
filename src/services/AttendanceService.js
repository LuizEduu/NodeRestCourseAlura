const pool = require("../infra/connection");
const Attendence = require("../models/Attendance");
const { compareAsc, parseISO } = require("date-fns");

class AttendanceService {
  add(client, pet, service, status, observations, data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO attendence
     (id, client, pet, service, status, observations, data, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *`;

      const attendence = new Attendence(
        client,
        pet,
        service,
        status,
        observations,
        parseISO(data, "yyyy-MM-dd")
      );

      const clientIsValid = attendence.client.length >= 5;
      const validDate = compareAsc(attendence.data, attendence._createdAt);

      const validations = [
        {
          name: "data",
          isValid: validDate == -1 ? false : true,
          message: "Data deve ser maior ou igual a data atual",
        },

        {
          name: "cliente",
          isValid: clientIsValid,
          message: "Cliente deve ter pelo menos 5 caracteres",
        },
      ];

      const errors = validations.filter((validation) => !validation.isValid);

      if (errors.length > 0) {
        reject(errors);
      }

      const values = [
        attendence.id,
        attendence.client,
        attendence.pet,
        attendence.service,
        attendence.status,
        attendence.observations,
        attendence.data,
        attendence.createdAt,
      ];

      pool
        .query(sql, values)
        .then((response) => {
          const result = response.rows.reduce((acc, value) =>
            Object.assign(acc, value)
          );

          resolve(result);
        })
        .catch((error) => reject(error));
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM attendence WHERE id = $1";

      pool
        .query(sql, [id])
        .then((result) => {
          const attendance = result.rows.reduce((acc, value) =>
            Object.assign(acc, value)
          );

          resolve(attendance);
        })
        .catch((error) => reject(error));
    });
  }

  update(client, pet, service, status, observations, data, id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE attendence SET
        client = $1,
        pet = $2,
        service = $3,
        status = $4,
        observations = $5,
        data = $6
        WHERE id = $7`;

      pool
        .query(sql, [client, pet, service, status, observations, data, id])
        .then(() => resolve())
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM attendence WHERE id = $1";

      pool
        .query(sql, [id])
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM attendence";

      pool
        .query(sql)
        .then((result) => {
          resolve(result.rows);
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = AttendanceService;
