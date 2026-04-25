const pool = require('./db');

async function checkAll() {
  const tables = ['authors', 'books', 'categories', 'fines', 'issued_books', 'librarians', 'notifications', 'reservations', 'returns', 'users'];
  
  for (const table of tables) {
    try {
      const result = await pool.query(`SELECT * FROM ${table} LIMIT 5`);
      console.log(`${table}: ${result.rows.length} rows`);
    } catch (err) {
      console.log(`${table}: ERROR - ${err.message}`);
    }
  }
  pool.end();
}

checkAll();