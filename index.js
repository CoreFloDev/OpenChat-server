let express = require('express');
let bodyParser = require('body-parser');
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
  messageLog("All messages sent");
  res.send(messages);
});

app.post("/message", (req, res) => {
  if(!req.body.pseudo || !req.body.message || !req.body.date) {
    return res.send({"status": "error", "message": "missing a parameter"});
  } else {
    messages.push(req.body);
    messageLog("Message received "+req.body);
    return res.send(req.body);
  }
});

let server = app.listen(SERVER_PORT,
  () => messageLog("Listening on port " + server.address().port + "...")
);

let messageLog = (message) => console.log("[%s] %s", new Date().toISOString(), message);


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
