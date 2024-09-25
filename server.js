const express = require("express");
const app = express();
const connection = require("./config/db");
var bodyParser = require("body-parser");  // this dependancy is use to grab the data from the fields
const dotenv = require("dotenv");
dotenv.config();


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");


app.get("/",(req,res) =>{
    res.redirect("/create.html")
})

app.get("/data",(req,res)=>{
  const allData = "select * from new_table";
  connection.query(allData,(err,rows)=>{
    if(err){
      console.log(err);
      
    }
    else{
      res.render("read.ejs",{rows})
    }
  })
})

app.get("/delete-data", (req, res) => {
  const deleteData = "delete from new_table where id=?";
  connection.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/data");
    }
  });
});



app.post("/create", (req, res) => {
    console.log(req.body.name);
    var name = req.body.name;
    var email = req.body.email;
    try {
      connection.query(
        "INSERT into new_table (name,email) values(?,?)", 
        [name, email],
        function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            // res.json({ result });
            res.redirect("/data");
            
              
            
          }
        }
      );
    } catch (err) {
      res.send(err);
    }
  });

  app.get("/update-data", (req, res) => {
    const updateData = "select * from  new_table where id=?";
    connection.query(updateData, req.query.id, (err, eachRow) => {
      if (err) {
        res.send(err);
      } else {
        console.log(eachRow[0]);
        result = JSON.parse(JSON.stringify(eachRow[0]));  //in case if it dint work 
        res.render("edit.ejs", { result });
      }
    });
  });


  //final update
app.post("/update", (req, res) => {
  const id_data = req.body.hidden_id;
  const name_data = req.body.name;
  const email_data = req.body.email;

  console.log("id...", req.body.name, id_data);

  const updateQuery = "update new_table set name=?, email=? where id=?";

  connection.query(
    updateQuery,
    [name_data, email_data, id_data],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/data");
      }
    }
  );
});

app.listen(process.env.PORT || 4000 ,(error)=>{  //create port number for lisning on server
    if(error) throw error

    console.log(`Running on ${process.env.PORT}`)

})


// first step to initiatiate nodejs server to do this open terminal and type npm initiatiate
// after that package.json file is created