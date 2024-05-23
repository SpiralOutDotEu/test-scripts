class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.borrowedBooks = [];
  }
}

module.exports = User;
