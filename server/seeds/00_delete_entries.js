exports.seed = function (knex) {
  return knex("tJobItem").del()
    .then(() => {
      return knex("tJob").del();
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