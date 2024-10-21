import { useState } from "react";
import { post } from "../../Axios/axios";
import { userResponse } from "../../Type/HttpResponseAxios";
import { useNavigate } from "react-router-dom";
type userType = {
    email: string,
    password: string,
}
export const LoginHook = (setUserContext: (userContext: userResponse) => void) => {
    const [user, setUser] = useState<userType>({ email: '', password: '' });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            const res = await post<userType, userResponse>("/login", user);
            localStorage.removeItem('token');
            localStorage.setItem('token', res.token)
            setUserContext({
                department: res.payload.department,
                email: res.payload.email,
                name: res.payload.name,
                role: res.payload.role,
            });
            navigate('/');
        } catch (err) {
            console.log(err)
            setError(`${error}`)
        }
    };
    const validateLogin = (input: "email" | 'password', value: string) => {
        if (user.email.length < 0) {
            setError("ingresa tu correo")
        } else if (user.password.length < 0) {
            setError("ingresa tu contraseña")
        } else {
            setError("")
        }

        switch (input) {
            case "email":
                setUser({ ...user, email: value })
                break;
            case "password":
                setUser({ ...user, password: value })
                break;
            default:
                break;
        }

    }
    return {
        handleLogin,
        user,
        error,
        validateLogin
    }
}