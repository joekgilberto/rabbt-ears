import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../utilities/local-storage";

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