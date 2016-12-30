let express = require('express');
let bodyParser = require('body-parser');
let http = require('http');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let SERVER_PORT = 4242;

let messages = [{
  pseudo: 'test',
  message: 'message from server',
  date: new Date().toISOString()
}];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/message", (req, res) => {
  console.log(req.body);
  if(!req.body.pseudo || !req.body.message || !req.body.date) {
    return res.send({"status": "error", "message": "missing a parameter"});
  } else {
    messages.push(req.body);
    let status = 200;
    return res.status(status).end(http.STATUS_CODES[status]);
  }
});

let server = app.listen(SERVER_PORT,
  () => console.log("Listening on port %s...", server.address().port)
);


/* Documentation

GET /messages
-> array of messages (pseudo, message, date)

POST /messages
-> require one message in the body ie
{
  pseudo: 'my pseudo',
  message: 'my message',
  date: '2016-12-30T13:17:49.563Z'
}
*/
