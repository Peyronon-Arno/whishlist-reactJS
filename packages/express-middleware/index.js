const express = require("express");
const router = express.Router();
const service = require("./service");
const db = require("better-sqlite3")(process.env.DB_PATH, {});
db.pragma("foreign_keys = ON");

let { expressjwt: jwt } = require("express-jwt");
const { NotFoundError, InvalidParamError } = require("./Error/CustomError");

process.on("exit", () => db.close());
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));

router.use(
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("invalid token...");
    }
  }
);

router.get("/", (req, res) => {
  try {
    res.send(service.getAll(req.auth.sub));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:uuid", (req, res) => {
  try {
    res.status(200).send(service.getOne(req.params.uuid));
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({ error: "Wishlist not found" });
    } else {
      return res.status(500).send({ error: err.message });
    }
  }
});

router.post("/", (req, res) => {
  try {
    res.status(201).send(service.create(req.body, req.auth.sub));
  } catch (err) {
    if (err instanceof InvalidParamError) {
      return res.status(422).send({ error: err.message });
    } else {
      return res.status(500).send({ error: err.message });
    }
  }
});

router.put("/:uuid", (req, res) => {
  try {
    res.send(service.update(req.body, req.auth.sub, req.params.uuid));
  } catch (err) {
    if (err instanceof InvalidParamError) {
      return res.status(422).send({ error: err.message });
    } else if (err instanceof NotFoundError) {
      return res.status(404).send({ error: "Wishlist not found" });
    } else {
      return res.status(500).send({ error: err.message });
    }
  }
});

router.delete("/:uuid", (req, res) => {
  try {
    service.delete(req.params.uuid, req.auth.sub);
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({ error: "Wishlist not found" });
    } else {
      return res.status(500).send({ error: err.message });
    }
  }
});

module.exports = router;
