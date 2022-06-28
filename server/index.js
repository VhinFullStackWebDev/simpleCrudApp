const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crudtest'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/', (req, res)=>{
  res.send("test");
});

app.post('/add', (req, res) =>{

  const title = req.body.title;
  const description = req.body.description;

  const sqlInsert = "INSERT INTO crudmovies (title, description) VALUE (?, ?)";
  db.query(sqlInsert, [title, description], (err, result) => {
    console.log(result);
  })
});

app.get('/view', (req, res) => {
  const sqlGet = "SELECT * from crudmovies";
  db.query(sqlGet, (err, result) => {
    if(err){
      res.send(err);
    }else {
      res.send(result);
    }
  })
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM crudmovies WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if(err){
      console.log(err);
    }else{
      console.log(req.body.title, "deleted");
    }
  })
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const newTitle = req.body.newTitle;
  const sqlUpdate = "UPDATE crudmovies SET title = REPLACE(title, ?, ?) WHERE id = ?";

  db.query(sqlUpdate, [title, newTitle, id], (err, result) => {
    if(err){
      console.log(err);
    }else{
      console.log(result, "updated");
    }
  })
})

app.listen(3001, () => {
  console.log("running on port 3001");
});