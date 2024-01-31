//Imports useEffect form React, useNavigate from react-router-dom, getUserToken and getUser from local-storage tools, and decodeToken from auth-tools
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, getUser } from "../../utilities/local-storage";
import { decodeToken } from "../../utilities/auth/auth-tools";

//Exports route that takes in child components and renders them, unless there is no token or if there is no user or if the user id doesnt equare to the JWT token's decoded id- then the user is routed to the Auth page
//Inteded to protect pages so only properly logged in users can access it
export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const token = getUserToken();
    const user = getUser();

    function evalCurrentUser() {
        const userDecoded = decodeToken(token);

        if (user?._id !== userDecoded.id) {
            navigate("/auth");
        }
    }

    useEffect(() => {
        if (!token || !user) {
            navigate("/auth");
        } else {
            evalCurrentUser();
        }
    }, []);

    return children;
}