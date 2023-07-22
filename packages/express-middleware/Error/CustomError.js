class InvalidParamError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidParamError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

class GetOneError extends Error {
  constructor(message) {
    super(message);
    this.name = "GetOneError";
  }
}

class GetAllError extends Error {
  constructor(message) {
    super(message);
    this.name = "GetAllError";
  }
}

class CreateError extends Error {
  constructor(message) {
    super(message);
    this.name = "CreateError";
  }
}

class UpdateError extends Error {
  constructor(message) {
    super(message);
    this.name = "UpdateError";
  }
}

class DeleteError extends Error {
  constructor(message) {
    super(message);
    this.name = "DeleteError";
  }
}

module.exports = {
  NotFoundError,
  InvalidParamError,
  GetOneError,
  GetAllError,
  CreateError,
  UpdateError,
  DeleteError,
};
