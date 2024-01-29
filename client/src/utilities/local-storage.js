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

// Creates local storage for token
function getUser(){
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"));
    } else {
        return "";
    }
};

function setUser(user){
    return localStorage.setItem("user", JSON.stringify(user));
};

function clearUser(){
    return localStorage.setItem("user", "");
};

// Exports local storage functions
export { getUserToken, setUserToken, clearUserToken, getUser, setUser, clearUser };
