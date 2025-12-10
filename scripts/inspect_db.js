
const db = require('../config/db');

async function inspect() {
    try {
        const [tables] = await db.query('SHOW TABLES');
        if (tables.length === 0) {
            console.log('No tables found.');
            process.exit(0);
        }

        for (const tableRow of tables) {
            const tableName = Object.values(tableRow)[0];
            console.log(`\nTable: ${tableName}`);
            const [columns] = await db.query(`DESCRIBE \`${tableName}\``);
            columns.forEach(col => {
                console.log(` - ${col.Field} (${col.Type}) ${col.Key ? `[${col.Key}]` : ''}`);
            });
        }
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting DB:', err);
        process.exit(1);
    }
}

inspect();
