//Returns local storage of token
function getUserToken(){
    return localStorage.getItem("token");
};

//Set local storage by token
function setUserToken(token){
    if(token){
        return localStorage.setItem("token", token);
    }
};

//Clears token instance of local storage
function clearUserToken(){
    return localStorage.setItem("token", "");
};

//Returns local storage of user
function getUser(){
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"));
    } else {
        return "";
    }
};

//Set local storage by user
function setUser(user){
    if(user){
        return localStorage.setItem("user", JSON.stringify(user));
    }
};

//Clears user instance of local storage
function clearUser(){
    return localStorage.setItem("user", "");
};

// Exports local storage functions
export { getUserToken, setUserToken, clearUserToken, getUser, setUser, clearUser };
