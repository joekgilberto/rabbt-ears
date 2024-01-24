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

// Creates local storage for username
function getUsername(){
    return localStorage.getItem("username");
};

function setUsername(username){
    return localStorage.setItem("username", username);
};

function clearUsername(){
    return localStorage.setItem("username", "");
};

// Exports local storage functions
export { getUserToken, setUserToken, clearUserToken, getUsername, setUsername, clearUsername };
