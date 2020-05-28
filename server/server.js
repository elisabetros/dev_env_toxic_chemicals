const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

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


// if (process.env.NODE_ENV === "production") {
//   //Set static folder
//   app.use(express.static("build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }
// app.get('/', async (req, res) => {  
//   const result = await ChemicalStock.query().withGraphFetched("warehouse").orderBy('nWarehouseID');
//   res.header("Access-Control-Allow-Origin", "*");
//   res.send(result)
// })

const port = process.env.PORT || 80

app.listen(port, (error) => {
  if (error) {
    console.log("Error running express", error);
  }
  console.log("The server is running on port", port);
});
