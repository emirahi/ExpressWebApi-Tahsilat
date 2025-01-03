const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import serverless from "serverless-http";

var apiRouter = require('./routes/api');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Router
app.use('/api', apiRouter);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

export const handler = serverless(app);