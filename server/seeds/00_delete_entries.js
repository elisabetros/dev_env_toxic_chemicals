exports.seed = function (knex) {
  return knex("tShipmentItem").del()
    .then(() => {
      return knex("tShipmentJob").del();
    })
    .then(() => {
      return knex("tChemicalStock").del();
    })
    .then(() => {
      return knex("tWarehouse").del();
    })
    .then(() => {
      return knex("tSite").del();
    });
};