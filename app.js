// mysql database using node and express

const express = require("express");
const App = express();
App.set("view engine", "ejs");
App.use(express.urlencoded({ extended: false }));

const mysql = require("mysql");

// for cennection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

App.get("/", (req, res) => {
  // read
  
  con.query("SELECT * FROM students", (err, result) => {
    if (err) console.log(err);

    res.render("index", { result: result });
  });
});

// delete
App.post("/", (req, res) => {
  let id = req.body.id;
  // console.log(id); 
    
      var sql = 'DELETE FROM students WHERE id = ?';
      con.query(sql, [id], function (err) {
      if (err) throw err;
      console.log("1 deleted!");
    });
    
    
  res.redirect('/');
});

// update
App.post('/update',(req,res)=>{
  let id=req.body.id;

  let newRoll_no=req.body.roll_no;
  var sql = 'UPDATE students SET roll_no=? WHERE id=?';
  con.query(sql,[newRoll_no,id],function(err){
    if(err) console.log(err);
    else console.log("1 inserted!");
  })
  res.redirect('/');
})
  



App.get("/add", (req, res) => {
  res.render("login");
});

// insert
App.post("/add", (req, res) => {
  let name = req.body.Name;
  let roll_no = req.body.Roll;
  let department = req.body.department;
  const queryString =
    "INSERT INTO students (name,roll_no,department) VALUES ('" +name +"','" +roll_no +"','" +department +"')";
  con.query(queryString, (err) => {
    if (err) console.log(err);
    else {
      console.log("1 inserted!");
    }
  });
  res.redirect("/");
});

App.listen(3000, () => {
  console.log("listening on 3000");
});
