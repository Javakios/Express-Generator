module.exports = `const database = require('../config/databse.config');

module.exports = class User {

    constructor() {
        this.tableName = 'users';
    }

    async createUser(userData) {
        const [userId] = await database(this.tableName).insert(userData);
        return userId;
    }
    async getUsers() {
        const users = await database(this.tableName).select();
        return users;
    }
    async getSingleUser(userId) {
        const [user] = await database(this.tableName).select().where('id', userId);
        return user;
    }
    async updateUser(userId, userData) {
        await database(this.tableName)
            .where('id', userId)
            .update(userData);
    }
    async deleteUser(userId) {
        await database(this.tableName).where('id', userId).delete();
    }



}`