const pool = require('./db');

async function getColumns(table) {
  const result = await pool.query(
    "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position",
    [table]
  );
  return result.rows;
}

async function checkAll() {
  const tables = ['authors', 'books', 'categories', 'fines', 'issued_books', 'librarians', 'notifications', 'reservations', 'returns', 'users'];
  
  console.log('=== TABLE COLUMNS ===\n');
  for (const table of tables) {
    const cols = await getColumns(table);
    console.log(`${table}:`, cols.map(c => c.column_name).join(', '));
  }
  pool.end();
}

checkAll();