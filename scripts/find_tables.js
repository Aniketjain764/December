
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../db_find_tables.txt');
const log = (msg) => fs.appendFileSync(logFile, msg + '\n');
const clearLog = () => fs.writeFileSync(logFile, '');

clearLog();
log('Starting table search...');

async function find() {
    try {
        const [dbs] = await db.query('SHOW DATABASES');
        const databases = dbs.map(d => d.Database).filter(d => !['information_schema', 'mysql', 'performance_schema', 'sys'].includes(d));

        for (const dbName of databases) {
            log(`Checking database: ${dbName}`);
            try {
                await db.query(`USE \`${dbName}\``);
                const [tables] = await db.query("SHOW TABLES LIKE 'projects'");
                if (tables.length > 0) {
                    log(`FOUND 'projects' table in database: ${dbName}`);
                    // Describe it to be sure
                    const [columns] = await db.query(`DESCRIBE projects`);
                    columns.forEach(col => {
                        log(` - ${col.Field} (${col.Type})`);
                    });
                    // Check for other tables
                    const [clients] = await db.query("SHOW TABLES LIKE 'clients'");
                    if (clients.length > 0) log(`FOUND 'clients' table in ${dbName}`);

                    const [contacts] = await db.query("SHOW TABLES LIKE 'contacts'");
                    if (contacts.length > 0) log(`FOUND 'contacts' table in ${dbName}`);

                    const [newsletter] = await db.query("SHOW TABLES LIKE 'newsletter'");
                    if (newsletter.length > 0) log(`FOUND 'newsletter' table in ${dbName}`);

                }
            } catch (err) {
                log(`Error accessing ${dbName}: ${err.message}`);
            }
        }
    } catch (err) {
        log(`Error: ${err.message}`);
    } finally {
        log('Done.');
        process.exit(0);
    }
}

find();
