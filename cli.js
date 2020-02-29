#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ngrok = require("ngrok");
const express = require("express");
const getPort = require("get-port");

const rand = (bytes = 4) => crypto.randomBytes(bytes).toString("hex");

(async function() {
  const file = process.argv[2] && path.resolve(process.argv[2]);
  const app = express();

  if (!file) {
    console.log("Warning: no file argument, streaming stdin.");
    console.log("");
  }

  app.get("/", (req, res) => {
    const stream = file ? fs.createReadStream(file) : process.stdin;
    res.writeHead(200, { "Content-Type": "text/event-stream" });
    stream.pipe(res).on("finish", () => {
      console.log(`Downloaded from ${req.headers["x-forwarded-for"]}`);
    });
  });

  const auth = `${rand()}:${rand()}`;
  const port = await getPort();

  await new Promise(resolve => app.listen(port, resolve));

  const url = await ngrok.connect({ auth, port });
  const authUrl = `https://${auth}@${url.replace("https://", "")}`;
  const fileName = file ? path.basename(file) : "output.txt";

  console.log("Download from remote terminal:");
  console.log("");
  console.log(`  curl ${authUrl} > ${fileName}`);
  console.log("");
})();
