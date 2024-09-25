const mysql = require("mysql");
const dotenv = require("dotenv");
const { fileLoader } = require("ejs");
dotenv.config();
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
});

connection.connect((error)=>{
    if(error) throw error

    console.log("connection succesfull");
})

module.exports = connection;

// here we create a config fileLoader
// inside config folder we created db.js
// import mysql dependancy 
// import dotenv dependancy
// then inside mysql.createConnection({}) provide hosting details
// use process.env for extracting values from env file
// then export connection
