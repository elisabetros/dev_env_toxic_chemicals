const { Model } = require("objection");

const Warehouse = require("./Warehouse");
const JobItem = require("./JobItem");

class Job extends Model {
  static get tableName() {
    return "job";
  }

  static get relationMappings() {
    return {
      warehouse: {
        relation: Model.HasManyRelation,
        modelClass: Warehouse,
        join: {
          from: "job.warehouse_id",
          to: "warehouse.id",
        },
      },
      jobItem: {
        relation: Model.HasManyRelation,
        modelClass: JobItem,
        join:{
          from:'jobItem.job_id',
          to:'job.id'
        }
      }
    };
  }
}

module.exports = Job;