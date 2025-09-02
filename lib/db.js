import mysql from 'mysql2/promise';

// This function establishes a secure connection to the MySQL-compatible database.
// It uses environment variables and enables SSL to connect securely.
export async function query({ query, values = [] }) {
  try {
    const dbconnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      // Enable SSL/TLS and let the driver use the default system CAs.
      // This is more portable than specifying a file path that might not exist
      // in the deployment environment.
      ssl: {
        rejectUnauthorized: true,
      }
    });

    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    // Log a more descriptive error for easier debugging
    console.error("Database connection or query failed: ", error);
    throw new Error(`Database Error: ${error.message}`);
  }
}

