// Creates local storage for token
function getUserToken(){
    return localStorage.getItem("token");
};

function setUserToken(token){
    return localStorage.setItem("token", token);
};

function clearUserToken(){
    return localStorage.setItem("token", "");
};

// Exports local storage functions
export { getUserToken, setUserToken, clearUserToken };
