const db = require("better-sqlite3")(process.env.DB_PATH, {});
db.pragma("foreign_keys = ON");
const uuid = require("uuid");
const {
  GetAllError,
  GetOneError,
  CreateError,
  UpdateError,
  DeleteError,
} = require("./Error/CustomError");

exports.getAll = (user) => {
  try {
    return db.prepare("SELECT * FROM wishlist WHERE user = ?;").all(user);
  } catch (err) {
    throw new GetAllError(err);
  }
};

exports.getOne = (uuid) => {
  try {
    return db.prepare("SELECT * FROM wishlist WHERE uuid = ?;").get(uuid);
  } catch (err) {
    throw new GetOneError(err);
  }
};

exports.create = (wishlist, user) => {
  try {
    const { name, store, price } = wishlist;
    db.prepare(
      "INSERT INTO wishlist (uuid, name, store, price, user) VALUES (?, ?, ?, ?, ?);"
    ).run(uuid.v4(), name, store, price, user);

    //Get the last inserted row
    return db
      .prepare("SELECT * FROM wishlist WHERE rowid = last_insert_rowid();")
      .get();
  } catch (err) {
    throw new CreateError(err);
  }
};

exports.update = (wishlist, user, uuid) => {
  try {
    const { name, store, price } = wishlist;
    db.prepare(
      "UPDATE wishlist SET name = ?, store = ?, price = ? WHERE uuid = ? AND user = ?;"
    ).run(name, store, price, uuid, user);
    return db.prepare("SELECT * FROM wishlist WHERE uuid = ?;").get(uuid);
  } catch (err) {
    throw new UpdateError(err);
  }
};

exports.delete = (uuid) => {
  try {
    db.prepare("DELETE FROM wishlist WHERE uuid = ?;").run(uuid);
  } catch (err) {
    throw new DeleteError(err);
  }
};
