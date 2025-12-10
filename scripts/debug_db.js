
const db = require('../config/db');

console.log('Starting inspection...');
async function inspect() {
    try {
        console.log('Querying tables...');
        const [tables] = await db.query('SHOW TABLES');
        console.log('Tables found:', tables.length);

        if (tables.length === 0) {
            console.log('No tables found.');
        }

        for (const tableRow of tables) {
            const tableName = Object.values(tableRow)[0];
            console.log(`\nTable: ${tableName}`);
            const [columns] = await db.query(`DESCRIBE \`${tableName}\``);
            columns.forEach(col => {
                console.log(` - ${col.Field} (${col.Type})`);
            });
        }
    } catch (err) {
        console.error('Error inspecting DB:', err);
    } finally {
        console.log('Done.');
        process.exit(0);
    }
}

inspect();
