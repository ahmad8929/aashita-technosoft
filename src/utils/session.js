const config = {
    accessTokenFieldName: 'session',
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
  
  