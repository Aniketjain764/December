
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../db_databases.txt');
const log = (msg) => fs.appendFileSync(logFile, msg + '\n');

log('Starting database inspection...');
async function inspect() {
    try {
        const [dbs] = await db.query('SHOW DATABASES');
        log(`Databases found: ${dbs.length}`);

        for (const row of dbs) {
            log(` - ${row.Database}`);
        }
    } catch (err) {
        log(`Error: ${err.message}`);
    } finally {
        log('Done.');
        process.exit(0);
    }
}

inspect();
