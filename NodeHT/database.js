const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Mohar123jvyy",
  database: "postgres",
});

client.connect().then(() => console.log("connected"));

module.exports = client; 

// client.query('Select * from habitstable',(err, res) => {
//     if(!err){
//         console.log(res.rows)
//     }else{
//         console.log(err.message)
//     }
//     client.end;
// })


// client.query(`Select * from users`, (err, res) => {
//   if (!err) {
//     console.log(res.rows);
//   } else {
//     console.log(err.message);
//   }
//   client.end;
// });