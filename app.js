const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// const courses = {
//   title: 'test',
//   smallDescrition: 'Small Description for test',
//   longDescription: 'Long Description for test',
//   tags: 'Tags for test',
//   images: 'Images for test',
//   chapters: {
//     title: 'Chapter title',
//     content: 'Chapter content'
//   },
//   question: {
//     title: 'Question title',
//     answers: ['Question answer 1','Question answer 2','Question answer 3']
//   }
// }



// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));


module.exports = app;