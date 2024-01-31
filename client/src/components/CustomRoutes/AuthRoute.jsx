import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, getUser } from "../../utilities/local-storage";

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