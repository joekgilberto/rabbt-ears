//Imports useEffect form React, useNavigate and useParams from react-router-dom, and getUser from local storage tools
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../utilities/local-storage";

//Exports route that takes in child components and renders them, unless a user's username is the id in the url parameter, then the user is redirected to the Profile page
//Intended for the OtherProfile page to ensure logged can't view their own page from an outsider's perspective
export default function ProfileRoute({ children }) {
    const { id } = useParams;
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        if (user?.username === id) {
            navigate("/profile");
        }
    }, []);

    return children;
}