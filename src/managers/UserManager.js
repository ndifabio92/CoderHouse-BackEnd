import UserDao from "../daos/UserDao.js";

class UserManager {

    constructor() {
        this.dao = new UserDao();
    }

    async getOne(email) {
        try {
            const userExist = await this.dao.getOne(email);
            if (userExist) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return userExist;
        } catch (error) {
            throw error;
        }
    };

    async create(user) {
        try {
            await this.getOne(user.email);
            return this.dao.create(user);
        } catch (error) {
            throw error;
        }
    };

    async userValidate(email) {
        try {
            const validate = await this.dao.validateUser(email);
            if (!validate) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return validate;
        } catch (error) {
            throw error;
        }
    }
}

export default UserManager;