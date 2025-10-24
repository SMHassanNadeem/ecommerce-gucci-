import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../global";

const PrivateRoute = ({ children }) => {
    const { session } = useContext(GlobalContext);

    if (session === undefined) {
        return <div>Loading...</div>;
    }
    return session ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;