const express = require("express");
const bodyParser = require("body-parser");

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


const Warehouse = require('./models/Warehouse')
const ChemicalStock = require('./models/ChemicalStock')

// ROUTES
const warehouseRoute = require('./routes/warehouses')

app.use(warehouseRoute)

// ////////////////

// app.get('/', async (req, res) => {  
//   const result = await ChemicalStock.query().withGraphFetched("warehouse").orderBy('nWarehouseID');
//   res.header("Access-Control-Allow-Origin", "*");
//   res.send(result)
// })


const server = app.listen(80, (error) => {
  if (error) {
    console.log("Error running express", error);
  }
  console.log("The server is running on port", server.address().port);
});
