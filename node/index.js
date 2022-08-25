const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const random_name = require("node-random-name");

const mysql = require("mysql");
const connection = mysql.createConnection(config);

app.get("/", async (req, res) => {
  try {
    const sql = `INSERT INTO people(name) values('${random_name()}')`;
    connection.query(sql);

    const sql2 = `SELECT name FROM people;`;
    connection.query(sql2, (e, result) => {
      if (e) throw e;
      let data = Object.values(JSON.parse(JSON.stringify(result)));
      console.log(Object.values(JSON.parse(JSON.stringify(result))));

      res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
      ${data
        .map((item) => {
          return `<li>${item.name}</li>`;
        })
        .join("")}
      </ul>
      `);
    });
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
