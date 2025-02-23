require('dotenv').config()

const db = require('./src/database')
const app = require('./express')

const port = 8080;

app.listen(port, async () => {
  db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error))

  console.log(`Server running at http://localhost:${port}`);
});
