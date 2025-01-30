class User {
    constructor(id, email, name, passwordHash, created_at) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.passwordHash = passwordHash;
        this.created_at = created_at
    }
}

module.exports = User;
