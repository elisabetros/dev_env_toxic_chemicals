const {
    Model
} = require("objection");

class JobItem extends Model {
    static get tableName() {
        return "jobItem";
    }
    static get idColumn() {
        return "id";
    }

    static get relationMappings() {
        return {
            Job: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/Job.js`,
                join: {
                    from: 'jobItem.job_id',
                    to: 'job.id',
                },
            },
            warehouse: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/Warehouse.js`,
                join: {
                    from: 'jobItem.warehouse_id',
                    to: 'warehouse.id',
                },
            },
        };
    }
}

module.exports = JobItem;