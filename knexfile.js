try {
  require('dotenv').load();
} catch (err) {
  console.error(err);
}

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'tilde',
      user:  'root',
      host: 'localhost',
      port: 3306
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL
  }
};
