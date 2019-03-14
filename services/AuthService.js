import Router from "next/router";

export default class {
    static isAuthorized() {
        return false;
    }

    static initialShouldAuthorized(res) {
        if (this.isAuthorized()) {
            return;
        }

        if (res) {
            res.writeHead(302, {Location: '/auth/login'});
            res.end();
        } else {
            Router.push('/auth/login');
        }
    }

    static initialShouldNotAuthorized(res) {
        if (! this.isAuthorized()) {
            return;
        }

        if (res) {
            res.writeHead(302, {Location: '/dashboard'});
            res.end();
        } else {
            Router.push('/dashboard');
        }
    }
}
