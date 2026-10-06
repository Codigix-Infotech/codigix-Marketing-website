import 'dotenv/config';
import mysql from 'mysql2/promise';

const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT || 3306);
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'Codigix_marketing';

console.log('====================================================');
console.log(' Codigix Database Connection Diagnostic');
console.log('====================================================');
console.log(`Connecting to MySQL:`);
console.log(`  Host:     ${host}`);
console.log(`  Port:     ${port}`);
console.log(`  User:     ${user}`);
console.log(`  Database: ${database}`);
console.log('----------------------------------------------------');

try {
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
    connectTimeout: 5000,
  });

  console.log(' [SUCCESS] Connected to MySQL database successfully!\n');

  const [tables] = await connection.query('SHOW TABLES');
  const tableKey = Object.keys(tables[0] || {})[0];
  const tableNames = tables.map((r) => r[tableKey]);

  console.log(`Found ${tableNames.length} tables in '${database}':`);
  for (const name of tableNames) {
    const [[count]] = await connection.query(`SELECT COUNT(*) as total FROM \`${name}\``);
    console.log(`  - ${name.padEnd(20)} (${count.total} rows)`);
  }

  await connection.end();
  console.log('\nAll database connections verified successfully.');
  process.exit(0);
} catch (err) {
  console.error('\n [FAILED] Database connection failed:');
  console.error(`  ${err.code || err.name}: ${err.message}\n`);

  console.log('Troubleshooting Tips:');
  if (err.code === 'ECONNREFUSED') {
    console.log(`  - MySQL server is NOT running on ${host}:${port}.`);
    console.log(`    Start your MySQL service (e.g., via XAMPP, Laragon, MySQL Workbench, or Services).`);
  } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    console.log(`  - Invalid user or password for '${user}'@'${host}'. Check DB_USER and DB_PASSWORD in backend/.env.`);
  } else if (err.code === 'ER_BAD_DB_ERROR') {
    console.log(`  - Database '${database}' does not exist on MySQL.`);
    console.log(`    Import 'backend/codigix_cms.sql' into your MySQL server, or create the database '${database}'.`);
  } else {
    console.log(`  - Check MySQL configuration and firewall settings.`);
  }
  process.exit(1);
}
