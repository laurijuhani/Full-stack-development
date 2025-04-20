const { Client } = require('pg');

require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    await client.connect();
    const res = await client.query('SELECT author, title, likes FROM blogs');

    res.rows.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    await client.end();
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    process.exit(1);
  }
})();