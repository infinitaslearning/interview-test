const express = require('express');
const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');

const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

teacherRoutes(app);
studentRoutes(app);

module.exports = app;
