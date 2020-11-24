import path from "path";
import fs from "fs";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Helmet from "react-helmet";

import { StaticRouter as Router } from "react-router-dom";
import App from "../src/containers/App";

//set a port on which express should be running
const PORT = 8080;
const app = express();

// define that all the routes matching the /* wildcard should return a static version of
//the app that is rendered bu ReactDomServer as a string

app.get("/*", (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <Router location={req.url} context={context}>
      <App />
    </Router>
  );
  const helmet = Helmet.renderStatic();

  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong: ", err);
      return res.status(500).send("Oops, better luck next time");
    }
    data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    data = data.replace(
      '<meta name="helmet"/>',
      `${helmet.title.toString()} ${helmet.meta.toString()}`
    );
    return res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Serverul merge pe portul ${PORT}`);
});
