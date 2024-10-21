import { useEffect, useState } from "react"
import { _delete, get, MessagePayload, post } from "../../Axios/axios";
import Swal from "sweetalert2";



export interface DataRow {
    id: number,
    departmentName: string
    description: string,
}
type CreateDepartmentRequest = {
    departmentName: string
    description: string
}
export const DepartmentHook = () => {
    // List 
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<DataRow[]>([{
        departmentName: "",
        description: "",
        id: 0
    }]);
    const [DepartmentsData, setDepartmentsData] = useState<DataRow[]>([{
        departmentName: "",
        description: "",
        id: 0
    }]);
    const getAllDepartments = async () => {
        try {
            const res = await get<[DataRow]>("/departments");
            setFilteredData(res.payload)
            setDepartmentsData(res.payload)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = DepartmentsData
            .filter(
                (item) =>
                    item.departmentName.toLowerCase().includes(value)
                // item.description.toLowerCase().includes(value)
            );

        setFilteredData(filtered);
    };
    // END List Department

    // New Department
    const [department, setDepartment] = useState<CreateDepartmentRequest>({
        description: "",
        departmentName: "",
    });

    const createDepartment = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
           await post<CreateDepartmentRequest, string>("/new-department", department);
            Swal.fire({
                text: `Departamento Creado`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            getAllDepartments()
        } catch (err) {
            const errorMessage = (err as{response:{data:MessagePayload<number>}} ).response?.data?.errorCode || 'Ha ocurrido un error inesperado';
            Swal.fire({
                title: 'error',
                text: `${errorMessage}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };

    // END New Department

    // Delate Department
    const handleDeleteDepartment = async (id: number) => {
        try {
            await _delete<number>(`delete-department/${id}`);
            getAllDepartments()
        } catch (err) {
            const errorMessage = (err as{response:{data:MessagePayload<number>}} ).response?.data?.errorCode || 'Ha ocurrido un error inesperado';
            Swal.fire({
                title: 'error',
                text: `${errorMessage}`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    // END Delate Department

    useEffect(() => {
        getAllDepartments()
    }, [])

    return {
        setDepartment,
        department,
        searchTerm,
        handleSearch,
        filteredData,
        createDepartment,
        handleDeleteDepartment
    }
}