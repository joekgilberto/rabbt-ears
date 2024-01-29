// Creates local storage for token
function getUserToken(){
    return localStorage.getItem("token");
};

function setUserToken(token){
    if(token){
        return localStorage.setItem("token", token);
    }
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
    if(user){
        return localStorage.setItem("user", JSON.stringify(user));
    }
};

function clearUser(){
    return localStorage.setItem("user", "");
};

// Exports local storage functions
export { getUserToken, setUserToken, clearUserToken, getUser, setUser, clearUser };
