
const { pool: db } = require('../config/db');

async function migrate() {
    try {
        console.log('Migrating contact_forms table...');
        // Drop and recreate is easier for now given we have no data, 
        // BUT user might have data. User said "minimal working version".
        // Let's Add columns if they don't exist and drop 'message' later if needed, 
        // but user requested 'mobile' and 'city' and 'name' and 'email'.
        // Current: name, email, message.
        // Requested: name, email, mobile, city.

        // We will ADD mobile and city. 
        // We will keep 'message' because usually contact forms have messages, even if not explicitly requested in the prompt list 
        // (prompt said "Fields: name, email, mobile, city" - implies these are the INPUTS. 
        // But a contact form without a message is weird. I'll add mobile and city. 
        // If I strictly follow "Fields: name, email, mobile, city", maybe I should drop message or just ignore it.
        // I will add mobile and city.

        try {
            await db.query('ALTER TABLE contact_forms ADD COLUMN mobile VARCHAR(20)');
            console.log('Added mobile column.');
        } catch (e) { console.log('mobile column might exist or error:', e.message); }

        try {
            await db.query('ALTER TABLE contact_forms ADD COLUMN city VARCHAR(100)');
            console.log('Added city column.');
        } catch (e) { console.log('city column might exist or error:', e.message); }

        console.log('Migration finished.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
