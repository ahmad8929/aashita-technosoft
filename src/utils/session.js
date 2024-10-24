const config = {
    accessTokenFieldName: 'session',
}

const getAccessToken = () => {
    return localStorage.getItem(config.accessTokenFieldName);
}

const setAccessToken = (token) => {
    return localStorage.setItem(config.accessTokenFieldName, token);
}

export default {
    sessionToken: {
        getter: getAccessToken,
        setter: setAccessToken
    }
}