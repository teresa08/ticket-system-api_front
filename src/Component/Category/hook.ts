import { useEffect, useState } from "react"
import { _delete, get, MessagePayload, post } from "../../Axios/axios";
import Swal from "sweetalert2";

export interface DataRow {
    id: number,
    categoryName: string
}
type CategoryName = {
    categoryName: string
}

export const CategoryHook = () => {
    // list Category

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<DataRow[]>([{
        categoryName: "",
        id: 0
    }]);

    const [getCategories, setGetCategories] = useState<DataRow[]>([{
        categoryName: "",
        id: 0
    }]);

    const getAllCategories = async () => {
        try {
            const res = await get<[DataRow]>("/categories");
            setFilteredData(res.payload)
            setGetCategories(res.payload)
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

        const filtered = getCategories
            .filter((item) => item.categoryName.toLowerCase().includes(value))

        setFilteredData(filtered);
    };

    // END list Category

    // New Category
    const [category, setCategory] = useState<CategoryName>({
        categoryName: "",
    });
    const createCategory = async () => {
        try {
             await post<CategoryName, string>("/new-category", category);
            getAllCategories()
            Swal.fire({
                text: `Categoria Creada`,
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


    // END New Category

    // Delate Department
    const handleDeleteCategory = async (id: number) => {
        try {
            await _delete<number>(`delete-category/${id}`);
            getAllCategories()
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

    // END Delate Department

    useEffect(() => {
        try {
            getAllCategories()
        } catch (err) {
            console.log(err)
        }
    }, [])


    return {
        setCategory,
        category,
        searchTerm,
        handleSearch,
        filteredData,
        createCategory,
        handleDeleteCategory
    }
}