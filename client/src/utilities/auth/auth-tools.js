//Imports JSON Web Token decoder from jwt-decode
import { jwtDecode } from "jwt-decode";

//Exports function that returns a decoded JSON Web Token
export function decodeToken(token) {
    return jwtDecode(token);
}