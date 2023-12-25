// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// your second API endpoint... 
app.get("/api/?", function (req, res) {
  var currentDate = new Date()
  console.log(res.json({unix: currentDate.valueOf(), utc: currentDate.toUTCString()}))
  res.json({unix: currentDate.valueOf(), utc: currentDate.toUTCString()});
});

// your third API endpoint... 
app.get("/api/:date?", function (req, res) {
  inputDate = req.params.date;
  if (new Date(inputDate) == 'Invalid Date' && (isNaN(inputDate) == false)) {
    var inputIntDate = parseInt(inputDate)
    var inputIntDateOutput = new Date(inputIntDate)
    ///res.json({unix: inputIntDateOutput.valueOf(), utc: inputIntDateOutput.toUTCString()})
    ///return inputIntDateOutput
    return res.json({unix: inputIntDateOutput.valueOf(), utc: inputIntDateOutput.toUTCString()})
   }
  else if (new Date(inputDate) != "Invalid Date") {
    correctedDate = new Date(inputDate)
    ///res.json({unix: correctedDate.valueOf(), utc: correctedDate.toUTCString()})
    ///return correctedDate
    return res.json({ unix: correctedDate.valueOf(), utc: correctedDate.toUTCString() })
  } else {
    ///res.json({error: "Invalid Date"})
    ///return inputDate
    return res.json({ error: "Invalid Date" })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log('Your URL is http://localhost:' + listener.address().port);
});
