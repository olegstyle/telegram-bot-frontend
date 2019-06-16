import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {expires: 1});
    }
};

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key);
    }
};

export const getCookie = (key, context) => {
    return process.browser
        ? cookie.get(key)
        : getCookieFromServer(key, context);
};

const getCookieFromServer = (key, context) => {
    if (typeof context === "undefined") return undefined;
    if (typeof context.req === "undefined") return undefined;
    if (!context.req.headers.cookie) return undefined;
    const rawCookie = context.req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) return undefined;

    return rawCookie.split('=')[1];
};
