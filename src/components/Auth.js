class Auth {
    #authenticated

    constructor() {
        this.#authenticated = false;
    }

    login(cb) {
        this.#authenticated = true;
        cb();
    }

    logout(cb) {
        this.#authenticated = false;
        cb();
    }

    isAunthenticated () {
        return this.#authenticated;
    }
}

export default new Auth();