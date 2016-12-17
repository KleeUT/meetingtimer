var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('combined'));
app.use(express.static('server/public'));

var port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}) ;
