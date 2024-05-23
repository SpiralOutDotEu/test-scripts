const User = require('../models/User');

class UserRepository {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    return user;
  }

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  updateUser(user) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return user;
  }

  getAllUsers() {
    return this.users;
  }
}

module.exports = new UserRepository();
