class Table {
  init(connection) {
    this._connection = connection;

    this.createAttendence();
  }

  createAttendence() {
    const sql = `CREATE TABLE IF NOT EXISTS attendence (id
      uuid NOT NULL, client varchar(50) NOT NULL,
      pet varchar(30), service varchar(30) NOT NULL, status varchar(20) NOT NULL,
      observations text, data date NOT NULL, created_at date NOT NULL, PRIMARY KEY(id))`;

    this._connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      }

      console.log("Table created!");
    });
  }
}

module.exports = new Table;
