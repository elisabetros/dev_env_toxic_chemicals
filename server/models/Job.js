const { Model } = require("objection");


const JobItem = require("./JobItem");

class Job extends Model {
  static get tableName() {
    return "job";
  }
  static get idColumn() {
    return "id";
}

  static get relationMappings() {
    return {
      jobItem: {
        relation: Model.HasManyRelation,
        modelClass: JobItem,
        join:{
          from:'job.id',
          to:'jobItem.job_id'
        }
      }
    };
  }
}

module.exports = Job;