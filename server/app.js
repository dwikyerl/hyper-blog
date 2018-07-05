require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// Import routes
const routes = require('./routes');

// Import error handlers
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api', routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.validationErrors);
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

app.on('ready', function() { 
  const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port --> ${server.address().port}`);
  });
}); 

// Initialize database connection
const mongoose = require('./database/mongoose');
mongoose.connection.once('open', () => {
  app.emit('ready');
});

module.exports = app;
