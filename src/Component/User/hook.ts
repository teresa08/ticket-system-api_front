import { useEffect, useState } from "react"
import { _delete, get, MessagePayload, post } from "../../Axios/axios";
import { getPropertyCreateUserResponse } from "../../Type/HttpResponseAxios";
import Swal from 'sweetalert2'

export interface DataRow {
    name: string
    email: string,
    role: string,
    department: string,
    id: number
}

export interface registerUser {
    name: string
    email: string,
    roleId: number,
    departmentId: number,
    password: string
}

export const UserHook = () => {

    //List User
    const [usersData, setUsersData] = useState<DataRow[]>([{
        department: "",
        email: "",
        name: "",
        role: "",
        id: 0
    }]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<DataRow[]>([{
        department: "",
        email: "",
        name: "",
        role: "",
        id: 0
    }]);
    const getAllUser = async () => {
        try {
            const res = await get<DataRow[]>("/users");
            setUsersData(res.payload)
            setFilteredData(res.payload)
        } catch (err) {
            const errorMessage = (err as{response:{data:MessagePayload<number>}} ).response?.data?.errorCode || 'Ha ocurrido un error inesperado';
            Swal.fire({
                title: 'Error',
                text: `${errorMessage}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = usersData
            .filter(
                (item) =>
                    item.department.toLowerCase().includes(value) ||
                    item.name.toLowerCase().includes(value) ||
                    item.role.toLowerCase().includes(value) ||
                    item.email.toLowerCase().includes(value)
            );
        setFilteredData(filtered);
    };
    // END List User

    //New User
    const [propertyCreateUser, setPropertyCreateUser] = useState<getPropertyCreateUserResponse>();
    const [registerUser, setRegisterUser] = useState<registerUser>({
        departmentId: 0,
        email: "",
        name: "",
        password: "",
        roleId: 0,
    });
    const getPropertyCreateUser = async () => {
        try {
            const res = await get<getPropertyCreateUserResponse>("/get-property-create-user");
            if (res) {
                setPropertyCreateUser({ departmentNames: res.payload.departmentNames, roleNames: res.payload.roleNames })
            }
        } catch (err) {
            const errorMessage = (err as{response:{data:MessagePayload<number>}} ).response?.data?.errorCode || 'Ha ocurrido un error inesperado';
            Swal.fire({
                title: 'Error',
                text: `${errorMessage}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };
    function passwordSplit(email: string): string {
        const parts = email.split('@');
        return parts[0];
    }
    const handleCreateUser = async () => {
        try {
             await post<registerUser, string>("/register", {
                departmentId: registerUser.departmentId,
                email: registerUser.email,
                name: registerUser.name,
                password: passwordSplit(registerUser.email),
                roleId: registerUser.roleId
            });
            getAllUser()
            Swal.fire({
                text: `Usuario registrado`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            const errorMessage = (err as{response:{data:MessagePayload<number>}} ).response?.data?.errorCode || 'Ha ocurrido un error inesperado';
            Swal.fire({
                title: 'Error',
                text: `${errorMessage}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };

    // END New User

    //  Delete User
    const handleDeleteUser = async (id: number) => {
        try {
            await _delete<number>(`users/${id}/delete`);
            Swal.fire({
                text: 'Usuario Eliminado',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            getAllUser()
        } catch (err) {
            const errorMessage = (err as{response:{data:MessagePayload<number>}} ).response?.data?.errorCode || 'Ha ocurrido un error inesperado';
            Swal.fire({
                title: 'Error',
                text: `${errorMessage}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    // END Delete User

    useEffect(() => {
        try {
            getAllUser()
            getPropertyCreateUser()

        } catch (err) {
            console.log(err)
        }
    }, [])



    return {
        searchTerm,
        handleSearch,
        filteredData,
        propertyCreateUser,
        handleCreateUser,
        setRegisterUser,
        registerUser,
        handleDeleteUser
    }
}