
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../db_schema.txt');
const log = (msg) => fs.appendFileSync(logFile, msg + '\n');

log('Starting inspection...');
async function inspect() {
    try {
        log('Querying tables...');
        const [tables] = await db.query('SHOW TABLES');
        log(`Tables found: ${tables.length}`);

        for (const tableRow of tables) {
            const tableName = Object.values(tableRow)[0];
            log(`\nTable: ${tableName}`);
            const [columns] = await db.query(`DESCRIBE \`${tableName}\``);
            columns.forEach(col => {
                log(` - ${col.Field} (${col.Type})`);
            });
        }
    } catch (err) {
        log(`Error: ${err.message}`);
    } finally {
        log('Done.');
        process.exit(0);
    }
}

inspect();
