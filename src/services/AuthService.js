import Router from "next/router";
import { getAuthToken } from '../api/token';

export default class {
    static isAuthorized(context) {
        return !!getAuthToken(context);
    }

    static initialShouldAuthorized(context) {
        if (this.isAuthorized(context)) {
            return;
        }

        if (context.res) {
            context.res.writeHead(302, {Location: '/auth/login'});
            context.res.end();
        } else {
            Router.push('/auth/login');
        }
    }

    static initialShouldNotAuthorized(context) {
        if (!this.isAuthorized(context)) {
            return;
        }

        if (context.res) {
            context.res.writeHead(302, {Location: '/dashboard'});
            context.res.end();
        } else {
            Router.push('/dashboard');
        }
    }
}
