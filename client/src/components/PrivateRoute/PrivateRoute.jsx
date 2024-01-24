import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../data";
import { getUserToken, decodeToken } from "../../utilities/auth/auth-token";

export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const token = getUserToken();

    //TODO: Add useContext
    // const { user } = useContext(UserContext);

    // function evalCurrentUser() {
    //     const userDecoded = decodeToken(token);

    //     if (user?._id !== userDecoded.id) {
    //         navigate("/auth");
    //     }
    // }

    // useEffect(() => {
    //     evalCurrentUser();
    // }, []);

    if (!token) {
        navigate("/auth");
    }

    return children;
}