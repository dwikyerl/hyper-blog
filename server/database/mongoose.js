const mongoose = require('mongoose');

const options = { useNewUrlParser: true };
if (process.env.DB_USER === 'admin') {
  options.auth = { authdb: 'admin' };
}

options.user = process.env.DB_USER;
options.pass = process.env.DB_PASSWORD;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

mongoose
  .connect(
    `${process.env.DB_URL}-${process.env.NODE_ENV}`,
    options
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

module.exports = mongoose;
