const dbal = require("./dbal");
const {
  NotFoundError,
  InvalidParamError,
  GetOneError,
  CreateError,
  GetAllError,
  UpdateError,
  DeleteError,
} = require("./Error/CustomError");

exports.getAll = (user) => {
  try {
    return dbal.getAll(user);
  } catch (error) {
    throw new GetAllError(err);
  }
};

exports.getOne = (uuid) => {
  // Validate the uuid
  if (!uuid) throw new Error("UUID is required");
  try {
    const wishlist = dbal.getOne(uuid);
    if (!wishlist) throw new NotFoundError("Wishlist not found");
    return wishlist;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    } else {
      throw new GetOneError(err);
    }
  }
};

exports.create = (wishlist, user) => {
  if (wishlist.name === undefined || !wishlist.name === "" || !wishlist.name)
    throw new InvalidParamError("Name is required");
  if (wishlist.store === undefined || !wishlist.store === "" || !wishlist.store)
    throw new InvalidParamError("Store is required");
  if (wishlist.price === undefined || !wishlist.price === "" || !wishlist.price)
    throw new InvalidParamError("Price is required");
  if (isNaN(wishlist.price))
    throw new InvalidParamError("Price must be a number");
  try {
    return dbal.create(wishlist, user);
  } catch (err) {
    throw new CreateError(err);
  }
};

exports.update = (wishlist, user, uuid) => {
  if (wishlist.name === undefined || !wishlist.name === "" || !wishlist.name)
    throw new InvalidParamError("Name is required");
  if (wishlist.store === undefined || !wishlist.store === "" || !wishlist.store)
    throw new InvalidParamError("Store is required");
  if (wishlist.price === undefined || !wishlist.price === "" || !wishlist.price)
    throw new InvalidParamError("Price is required");
  if (isNaN(wishlist.price))
    throw new InvalidParamError("Price must be a number");

  if (!dbal.getOne(uuid)) throw new NotFoundError("Wishlist not found");

  try {
    return dbal.update(wishlist, user, uuid);
  } catch (err) {
    throw new UpdateError(err);
  }
};

exports.delete = (uuid) => {
  if (!uuid) throw new Error("UUID is required");
  try {
    if (!dbal.getOne(uuid)) {
      throw new NotFoundError();
    } else {
      dbal.delete(uuid);
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    } else {
      throw new DeleteError(err);
    }
  }
};
