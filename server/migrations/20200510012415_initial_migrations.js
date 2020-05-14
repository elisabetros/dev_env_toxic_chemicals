exports.up = function (knex) {
    return knex.schema
        .createTable('tSite', (table) => {
            table.increments('nSiteID').primary().unsigned().notNullable();
            table.string('cSiteName', 2).unique().notNullable();
        })
        .createTable('tWarehouse', (table) => {
            table.increments('nWarehouseID').primary().unsigned().notNullable();
            table.string('cWarehouseName', 3).notNullable();
            table.integer('nCapacity').unsigned();
            table.integer('nCurrentStock').unsigned();
            table.integer('nSiteID').unsigned().notNullable();
            table.foreign('nSiteID').references('nSiteID').inTable('tSite');
        })
        .createTable('tChemicalStock', (table) => {
            table.increments('nChemicalStockID').primary().unsigned().notNullable();
            table.integer('nWarehouseID').unsigned().notNullable();
            table.foreign('nWarehouseID').references('nWarehouseID').inTable('tWarehouse');
            table.string('cChemicalName', 2).notNullable();
            table.integer('nStock').unsigned();
            table.timestamps(true, true);
        })
        .createTable('tJob', (table) => {
            table.bigIncrements('nJobID').primary().unsigned().notNullable();
            table.string('cJobType', 1).notNullable();
            table.timestamp('dDate').notNullable().defaultTo(knex.fn.now());
        })
        .createTable('tJobItem', table => {
            table.bigIncrements('nJobItemID').primary().unsigned().notNullable();
            table.integer('nAmount').unsigned().notNullable();
            table.bigInteger('nJobID').unsigned().notNullable();
            table.foreign('nJobID').references('nJobID').inTable('tJob');
            table.string('cChemicalName').notNullable();
            table.integer('nWarehouseID').unsigned().notNullable();
            table.foreign('nWarehouseID').references('nWarehouseID').inTable('tWarehouse');
        })
        .createTable('tAuditChemicalMovement', (table) => {
            table.increments('nAuditID').primary().unsigned().notNullable();
            table.integer('nWarehouseID').unsigned().notNullable();
            table.foreign('nWarehouseID').references('nWarehouseID').inTable('tWarehouse');
            table.string('cChemicalName').notNullable()
            table.string('nAmount')
            table.string('sAction', 1).notNullable()

        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tJobItem')
        .dropTableIfExists('tJob')
        .dropTableIfExists('tChemicalStock')
        .dropTableIfExists('tAuditChemicalStock')
        .dropTableIfExists('tWarehouse')
        .dropTableIfExists('tSite')
};