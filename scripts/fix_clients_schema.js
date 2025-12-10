
const { pool: db } = require('../config/db');

async function migrate() {
    try {
        console.log('Fixing clients table schema...');

        // Add designation if missing
        try {
            await db.query('ALTER TABLE clients ADD COLUMN designation VARCHAR(255)');
            console.log('Added designation.');
        } catch (e) { console.log('designation exists or error:', e.message); }

        // Add description if missing
        try {
            await db.query('ALTER TABLE clients ADD COLUMN description TEXT');
            console.log('Added description.');
        } catch (e) { console.log('description exists or error:', e.message); }

        // Add image_path if missing
        try {
            await db.query('ALTER TABLE clients ADD COLUMN image_path VARCHAR(255)');
            console.log('Added image_path.');
        } catch (e) { console.log('image_path exists or error:', e.message); }

        // Verify columns
        const [cols] = await db.query('DESCRIBE clients');
        console.log('Current columns:', cols.map(c => c.Field).join(', '));

        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
