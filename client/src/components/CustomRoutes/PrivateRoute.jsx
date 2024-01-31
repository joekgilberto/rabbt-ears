import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, getUser } from "../../utilities/local-storage";
import { decodeToken } from "../../utilities/auth/auth-tools";

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