
const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/style.css") {
    fs.readFile("style.css", function (err, data) {

      res.write(data);
      res.end();
    });
  } else if (page == "/index.js") {
    fs.readFile("index.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if ("pali" in params) {
      let userInput = params["pali"];
      let word = `${userInput}`;
      let palLap = word.toLowerCase() === word.toLowerCase().split("").reverse().join("") ? "It's a Palindrome!" : "Sorry — Try again!" ;
      res.writeHead(200, { "Content-Type": "application/json" });
      const objToJson = {
        result: palLap,
      };
      res.end(JSON.stringify(objToJson));
    }

  }
});

server.listen(8000);