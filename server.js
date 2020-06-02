const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const { parse } = require("url");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const next = require("next");
const admin = require("firebase-admin");
const { join } = require("path");
const device = require("express-device");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({
  dev,
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    server.use(bodyParser.json());

    server.use(
      session({
        secret: "geheimnis",
        saveUninitialized: true,
        store: new FileStore({
          path: "/tmp/sessions",
          secret: "geheimnis",
        }),
        resave: false,
        rolling: true,
        httpOnly: true,
        cookie: {
          maxAge: 604800000,
        }, // week
      }),
      device.capture()
    );

    server.use((req, res, next) => {
      next();
    });

    server.get("/neta/:userName", (req, res) => {
      return app.render(req, res, "/minister/neta", {
        userName: req.params.userName,
      });
    });

    server.get("/minister/:userName", (req, res) => {
      return app.render(req, res, "/minister", {
        userName: req.params.userName,
      });
    });

    server.get("/profile", (req, res) => {
      return app.render(req, res, "/");
    });

    server.get("/profile/:userName", (req, res) => {
      return app.render(req, res, "/profile", {
        userName: req.params.userName,
      });
    });

    server.get("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      let device = req.device.type.toUpperCase();

      // Redirecting url before mount
      if (device === "PHONE" && pathname === "/") {
        app.render(req, res, "/mobile/welcome");
      }

      // handle GET request to /service-worker.js
      if (pathname === "/service-worker.js") {
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      } else {
        handle(req, res, parsedUrl);
      }
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
