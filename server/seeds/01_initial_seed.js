exports.seed = function (knex) {
  return knex('tSite').insert([{
        cSiteName: "S1"
      },
      {
        cSiteName: "S2"
      },
    ])
    .then(async () => {
      global.siteIDs = await knex.select("nSiteID").from("tSite");
      siteIDs.sort(function (a, b) {
        return a.nSiteID - b.nSiteID;
      });

      return knex('tWarehouse').insert([{
          cWarehouseName: "W1",
          nCapacity: 10,
          nCurrentStock: 10,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W2",
          nCapacity: 12,
          nCurrentStock: 9,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W3",
          nCapacity: 5,
          nCurrentStock: 2,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W4",
          nCapacity: 3,
          nCurrentStock: 3,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W5",
          nCapacity: 9,
          nCurrentStock: 9,
          nSiteID: siteIDs[0].nSiteID,
        },
        {
          cWarehouseName: "W11",
          nCapacity: 10,
          nCurrentStock: 8,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W12",
          nCapacity: 12,
          nCurrentStock: 12,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W13",
          nCapacity: 5,
          nCurrentStock: 5,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W14",
          nCapacity: 3,
          nCurrentStock: 2,
          nSiteID: siteIDs[1].nSiteID,
        },
        {
          cWarehouseName: "W15",
          nCapacity: 9,
          nCurrentStock: 1,
          nSiteID: siteIDs[1].nSiteID,
        },
      ]);
    })
    .then(async () => {
      global.warehouseIDs = await knex.select("nWarehouseID").from("tWarehouse");
      warehouseIDs.sort(function (a, b) {
        return a.nWarehouseID - b.nWarehouseID;
      });

      return knex('tChemicalStock').insert([{
          nWarehouseID: warehouseIDs[0].nWarehouseID,
          sChemicalName: 'A',
          nStock: 5 // Max cap. is 10
        },
        {
          nWarehouseID: warehouseIDs[0].nWarehouseID,
          sChemicalName: 'C',
          nStock: 5
        },
        {
          nWarehouseID: warehouseIDs[1].nWarehouseID,
          sChemicalName: 'B',
          nStock: 9 // Max cap. is 12
        },
        {
          nWarehouseID: warehouseIDs[2].nWarehouseID,
          sChemicalName: 'C',
          nStock: 2 // Max cap. is 5
        },
        {
          nWarehouseID: warehouseIDs[3].nWarehouseID,
          sChemicalName: 'A',
          nStock: 3 // Max cap. is 3
        },
        {
          nWarehouseID: warehouseIDs[4].nWarehouseID,
          sChemicalName: 'B',
          nStock: 9 // Max cap is 9
        },
        {
          nWarehouseID: warehouseIDs[5].nWarehouseID,
          sChemicalName: 'B',
          nStock: 8 // Max cap. is 10
        },
        {
          nWarehouseID: warehouseIDs[6].nWarehouseID,
          sChemicalName: 'B',
          nStock: 3 // Max cap. is 12
        },
        {
          nWarehouseID: warehouseIDs[6].nWarehouseID,
          sChemicalName: 'C',
          nStock: 9
        },
        {
          nWarehouseID: warehouseIDs[7].nWarehouseID,
          sChemicalName: 'A',
          nStock: 5 // Max cap. is 5
        },
        {
          nWarehouseID: warehouseIDs[8].nWarehouseID,
          sChemicalName: 'C',
          nStock: 2 // Max cap. is 3
        },
        {
          nWarehouseID: warehouseIDs[9].nWarehouseID,
          sChemicalName: 'A',
          nStock: 1 // Max cap. is 9
        },
      ]);
    })
     .then(async () => {
      return knex('tShipmentJob').insert([{
          nTicketNo: 1,
          cShipmentJobType: 'O'
        },
        {
          nTicketNo: 2,
          cShipmentJobType: 'O'
        },
        {
          nTicketNo: 3,
          cShipmentJobType: 'I'
        },
        {
          nTicketNo: 4,
          cShipmentJobType: 'O'
        },
        {
          nTicketNo: 5,
          cShipmentJobType: 'I'
        },
      ]);
    })
    .then(async () => {
      global.shipmentJobIDs = await knex.select("nShipmentJobID").from("tShipmentJob");
      shipmentJobIDs.sort(function (a, b) {
        return a.nShipmentJobID - b.nShipmentJobID;
      });

      return knex("tShipmentItem").insert([{
          nAmount: 4,
          nShipmentJobID: shipmentJobIDs[0].nShipmentJobID,
          sChemicalName:'C',
          nWarehouseID: warehouseIDs[0].nWarehouseID
        },
        {
          nAmount: 8,
          nShipmentJobID: shipmentJobIDs[1].nShipmentJobID,
          sChemicalName: 'A',
          nWarehouseID: warehouseIDs[9].nWarehouseID,
        },
        {
          nAmount: 6,
          nShipmentJobID: shipmentJobIDs[2].nShipmentJobID,
          sChemicalName: 'C',
          nWarehouseID: warehouseIDs[9].nWarehouseID
        },
        {
          nAmount: 7,
          nShipmentJobID: shipmentJobIDs[3].nShipmentJobID,
          sChemicalName: 'B',
          nWarehouseID: warehouseIDs[6].nWarehouseID
        },
        {
          nAmount: 3,
          nShipmentJobID: shipmentJobIDs[4].nShipmentJobID,
          sChemicalName: 'A',
          nWarehouseID: warehouseIDs[2].nWarehouseID
        },
      ]);
    })
};