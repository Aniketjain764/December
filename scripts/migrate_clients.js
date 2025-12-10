
const { pool: db } = require('../config/db');

async function migrate() {
    try {
        console.log('Adding image_path to clients table...');
        await db.query('ALTER TABLE clients ADD COLUMN image_path VARCHAR(255)');
        console.log('Migration successful.');
        process.exit(0);
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Column already exists.');
            process.exit(0);
        }
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
