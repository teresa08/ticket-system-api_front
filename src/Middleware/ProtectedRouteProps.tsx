import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const context = useContext(UserContext);

    if (!context) {
      throw new Error('Header must be used within a UserProvider');
    }
    const { userContext } = context;
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsValidToken(false);
            return;
        }

        const validateToken = async () => {
            try {
                await axios.get('/validate-token', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsValidToken(true); 
            } catch (error) {
              console.log(error)
                setIsValidToken(false); 
                localStorage.removeItem('token');
            }
        };

        validateToken();
    }, []);


    if (isValidToken === null) {
        return <div>Loading...</div>; 
    }

   
    if (!isValidToken || !userContext.role) {
        return <Navigate to="/login" />;
    }

    return children;
};
