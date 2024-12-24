const config = {
    accessTokenFieldName: 'session',
<<<<<<< HEAD
  };
  
  // Getter function to retrieve the access token from localStorage
  export const getAccessToken = () => {
    return localStorage.getItem(config.accessTokenFieldName);
  };
  
  // Setter function to store the access token in localStorage
  export const setAccessToken = (token) => {
    return localStorage.setItem(config.accessTokenFieldName, token);
  };
  
  // Default export as an object with getter and setter methods
  export default {
    sessionToken: {
      getter: getAccessToken,
      setter: setAccessToken,
    },
  };
  
  
=======
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
>>>>>>> 61e73cf33923b5216a5e5b6e8f4d7e55c638be29
