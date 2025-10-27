class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} not found.`);
    this.name = 'UserNotFoundError';
  }
}

class UserNameAlreadyExistsError extends Error {
  constructor(userName: string) {
    super(`User name "${userName}" already exists.`);
    this.name = 'UserNameAlreadyExistsError';
  }
}

class UserAlreadyActiveError extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} is already active.`);
    this.name = 'UserAlreadyActiveError';
  }
}

const OrderNotFoundError = class extends Error {
  constructor(orderId: number) {
    super(`Order with ID ${orderId.toString()} not found.`);
    this.name = 'OrderNotFoundError';
  }
};

class InvalidTimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTimeError';
  }
}

export {
  InvalidTimeError,
  OrderNotFoundError,
  UserAlreadyActiveError,
  UserNotFoundError,
  UserNameAlreadyExistsError,
};
