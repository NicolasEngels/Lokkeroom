import express, { application } from "express";
import bodyParser from "body-parser";
import pg from "pg";

const client = new pg.Client({
  host: "localhost",
  user: "admin_lokkeroom",
  port: 5432,
  password: "lokkeroom_password",
  database: "lokkeroom_db",
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  client.query(
    `SELECT * FROM "Users"
      WHERE email = $1`, [email], (err, results) => {
      if(err){
        throw err
      }

      if (results.rows.length > 0){
        res.send('this email is already registered');
      }else{
        client.query(
          `INSERT INTO "Users" (email, password)
            VALUES ($1, $2)
            RETURNING id`, [email, password], (err, results) => {
              if(err){
                throw err
              }
              res.send("account created");
            }
        )
      }
    }
  )
});

app.get('/api/login', (req, res) => {
  const { email, password } = req.body;

  client.query(
    `SELECT * FROM "Users"
      WHERE email = $1`, [email], (err, results) => {
      if(err){
        throw err
      }

      if(results.rows.length === 0){
        res.send('this email is not registered');
      }

      if(results.rows[0].password == password){
        res.send('connected')
      }else{
        res.send('password wrong');
      }
    }
  )
});

app.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}/`)
);


