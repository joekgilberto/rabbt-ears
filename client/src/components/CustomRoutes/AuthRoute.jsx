//Imports useEffect form React, useNavigate from react-router-dom, and getUserToken and getUser from local-storage tools
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, getUser } from "../../utilities/local-storage";

//Exports route that takes in child components and renders them, unless a user and token are present then the user is routed to the Profile page
//Intended for the Auth page to ensure logged in users cant log back in
export default function AuthRoute({ children }) {
    const navigate = useNavigate();
    const user = getUser();
    const token = getUserToken();

    useEffect(() => {
        if (user && token) {
            navigate("/profile");
        }
    }, []);

    return children;
}