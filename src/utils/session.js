const config = {
    accessTokenFieldName: 'accessToken',
}

const getAccessToken = () => {
    return localStorage.getItem(config.accessTokenFieldName);
}

const setAccessToken = () => {
    return localStorage.setItem(config.accessTokenFieldName);
}

export default {
    accessToken: {
        getter: getAccessToken,
        setter: setAccessToken
    }
}