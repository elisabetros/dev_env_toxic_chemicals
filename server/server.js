const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000','https://valsdottir.net', 'http://valsdottir.net', 'https://www.valsdottir.net', 'https://.valsdottir.net'];
app.use(cors())
console.log(cors())
// app.use(cors({ 
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development)

// Give the knex instance to objection
Model.knex(knex)



// ROUTES

const warehouseRoute = require('./routes/warehouses')
const processJobRoute = require('./routes/processJob')
const jobRoute = require('./routes/jobs')
const auditRoute = require('./routes/audits')

app.use(warehouseRoute)
app.use(processJobRoute)
app.use(jobRoute)
app.use(auditRoute)

// ////////////////



const port = process.env.PORT || 80

app.listen(port, (error) => {
  if (error) {
    console.log("Error running express", error);
  }
  console.log("The server is running on port", port);
});
