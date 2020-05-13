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
            table.string('sChemicalName', 2).notNullable();
            table.integer('nStock').unsigned();
            table.timestamps(true, true);
        })
        .createTable('tShipmentJob', (table) => {
            table.bigIncrements('nShipmentJobID').primary().unsigned().notNullable();
            table.integer('nTicketNo').unsigned().notNullable().unique();
            table.string('cShipmentJobType', 1).notNullable();
            table.timestamp('dDate').notNullable().defaultTo(knex.fn.now());
        })
        .createTable('tShipmentItem', table => {
            table.bigIncrements('nShipmentItemID').primary().unsigned().notNullable();
            table.integer('nAmount').unsigned().notNullable();
            table.bigInteger('nShipmentJobID').unsigned().notNullable();
            table.foreign('nShipmentJobID').references('nShipmentJobID').inTable('tShipmentJob');
            table.string('sChemicalName').notNullable();
            table.integer('nWarehouseID').unsigned().notNullable();
            table.foreign('nWarehouseID').references('nWarehouseID').inTable('tWarehouse');
        })
        .createTable('tAuditSite', (table) => {
            table.increments('nAuditSiteID').primary().unsigned().notNullable();
            table.integer('nOldSiteID').unsigned().notNullable();
            table.string('cOldSiteName', 2).unique().notNullable();
            table.integer('nNewSiteID').unsigned().notNullable();
            table.string('cNewSiteName', 2).unique().notNullable();
            table.string('cAction', 1).notNullable();
            table.timestamps(true, true);
            table.string('cDBUser').notNullable();
            table.string('cHost').notNullable();
        })
        .createTable('tAuditWarehouse', (table) => {
            table.increments('nAuditWarehouseID').primary().unsigned().notNullable();
            table.integer('nOldWarehouseID').unsigned().notNullable();
            table.string('cOldWarehouseName', 2).notNullable();
            table.integer('nOldCapacity').unsigned();
            table.integer('nOldCurrentStock').unsigned();
            table.integer('nOldSiteID').notNullable();
            table.integer('nNewWarehouseID').unsigned().notNullable();
            table.string('cNewWarehouseName', 2).notNullable();
            table.integer('nNewCapacity').unsigned();
            table.integer('nNewCurrentStock').unsigned();
            table.integer('nNewSiteID').unsigned().notNullable();
            table.string('cAction', 1).notNullable();
            table.timestamps(true, true);
            table.string('cDBUser').notNullable();
            table.string('cHost').notNullable();
        })
        .createTable('tAuditChemicalStock', (table) => {
            table.increments('nAuditChemicalStockID').primary().unsigned().notNullable();
            table.integer('nOldWarehouseID').unsigned().notNullable();
            table.string('sOldChemicalName', 2).notNullable();
            table.integer('nOldStock').unsigned();
            table.integer('nNewWarehouseID').unsigned().notNullable();
            table.string('sNewChemicalName', 2).notNullable();
            table.integer('nNewStock').unsigned();
            table.string('cAction', 1).notNullable();
            table.timestamps(true, true);
            table.string('cDBUser').notNullable();
            table.string('cHost').notNullable();
        })
        .createTable('tAuditShipmentJob', (table) => {
            table.bigIncrements('nAuditShipmentJobID').primary().unsigned().notNullable();
            table.bigInteger('nOldShipmentJobID').unsigned().notNullable();
            table.integer('nOldTicketNo').unsigned().notNullable();
            table.string('cOldShipmentJobType', 1).notNullable();
            table.timestamp('dOldDate').notNullable();
            table.bigInteger('nNewShipmentJobID').unsigned().notNullable();
            table.integer('nNewTicketNo').unsigned().notNullable();
            table.string('cNewShipmentJobType', 1).notNullable();
            table.timestamp('dNewDate').notNullable().defaultTo(knex.fn.now());
            table.string('cAction', 1).notNullable();
            table.timestamps(true, true);
            table.string('cDBUser').notNullable();
            table.string('cHost').notNullable();
        })
        .createTable('tAuditShipmentItem', table => {
            table.bigIncrements('nAuditShipmentItemID').primary().unsigned().notNullable();
            table.bigInteger('nOldShipmentItemID').unsigned().notNullable();
            table.integer('nOldAmount').unsigned().notNullable();
            table.bigInteger('nOldShipmentJobID').unsigned().notNullable();
            table.string('sOldChemicalName',2).notNullable();
            table.integer('nOldWarehouseID').unsigned().notNullable();
            table.bigInteger('nNewShipmentItemID').unsigned().notNullable();
            table.integer('nNewAmount').unsigned().notNullable();
            table.bigInteger('nNewShipmentJobID').unsigned().notNullable();
            table.string('sNewChemicalName', 2).notNullable();
            table.integer('nNewWarehouseID').unsigned().notNullable();
            table.string('cAction', 1).notNullable();
            table.timestamps(true, true);
            table.string('cDBUser').notNullable();
            table.string('cHost').notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tAuditShipmentItem')
        .dropTableIfExists('tAuditShipmentJob')
        .dropTableIfExists('tAuditChemicalStock')
        .dropTableIfExists('tAuditWarehouse')
        .dropTableIfExists('tAuditSite')
        .dropTableIfExists('tShipmentItem')
        .dropTableIfExists('tShipmentJob')
        .dropTableIfExists('tChemicalStock')
        .dropTableIfExists('tWarehouse')
        .dropTableIfExists('tSite')
};