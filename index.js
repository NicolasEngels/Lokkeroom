import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const client = new pg.Client({
  host: "localhost",
  user: "lokkeroom_admin",
  port: 5432,
  password: "LokkerPassword",
  database: "lokkeroom",
});

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let users = 
  "CREATE TABLE Users(id int,email varchar,password varchar,PRIMARY KEY (id));";

let groups_list =
  "CREATE TABLE Groups_list(id int ,id_Users int REFERENCES Users(id),id_Groups int REFERENCES Groups(id) ,PRIMARY KEY (id));";

let groups = 
  "CREATE TABLE Groups(id int, PRIMARY KEY (id));";


client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});


// client
//   .query(groups_list)
//   .catch((err) => console.error("connection error", err.stack));



