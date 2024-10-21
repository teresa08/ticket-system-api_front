import { useEffect, useState } from "react"
import { _delete, get, MessagePayload, post, put } from "../../Axios/axios";
import { getPropertyCreateTicketResponse, getUserNamesByDepartmentsResponse } from "../../Type/HttpResponseAxios";
import Swal from "sweetalert2";


type ticketType = {
    title: string,
    description: string,
    priorityId: number,
    categoryId: number,
    departmentId: number,
    userId?: number
}
export interface DataRow {
    id: number
    title: string;
    description: string;
    priority: string;
    category: string;
    state: string;
    department: string;
    date: string;
    user: string;
}



export interface getStateResponse {
    id: number;
    stateName: string;
}

export const NewTicketHook = () => {

    // ListTicket

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<DataRow[]>([{
        title: '',
        description: '',
        priority: '',
        category: '',
        state: '',
        department: '',
        date: '',
        user: '',
        id: 0
    }]);

    const [ticketData, setTicketData] = useState<DataRow[]>([{
        title: '',
        description: '',
        priority: '',
        category: '',
        state: '',
        department: '',
        date: '',
        user: '',
        id: 0
    }]);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = ticketData.filter(
            (item) =>
                item.title.toLowerCase().includes(value) ||
                item.description.toLowerCase().includes(value) ||
                item.priority.toLowerCase().includes(value) ||
                item.category.toLowerCase().includes(value) ||
                item.state.toLowerCase().includes(value) ||
                item.department.toLowerCase().includes(value) ||
                item.user.toLowerCase().includes(value) ||
                item.date.includes(value)
        );

        setFilteredData(filtered);
    };
    const getTickets = async () => {
        try {
            const res = await get<[DataRow]>("/ticket");
            setFilteredData(res.payload)
            setTicketData(res.payload)
        } catch (error) {
            console.log(error)
        }

    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Low':
                return 'btn-success';
            case 'Medium':
                return 'btn-warning';
            case 'High':
                return 'btn-danger';
            default:
                return 'btn-secondary';
        }
    };

    //END ListTicket

    // NewTicket
    const [propertyTicket, setPropertyTicket] = useState<getPropertyCreateTicketResponse>();
    const [userNames, setUserNames] = useState<[getUserNamesByDepartmentsResponse]>();
    const [ticket, setTicket] = useState<ticketType>({
        title: "",
        categoryId: 0,
        departmentId: 0,
        description: "",
        priorityId: 0,
    });

    const handleNewTicket = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            const res = await post<ticketType, string>("/new-ticket", ticket);
            if (res) {
                setTicket({
                    title: "",
                    categoryId: 0,
                    departmentId: 0,
                    description: "",
                    priorityId: 0,
                })
            }
            getTickets()
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

    const gerPropertyTicket = async () => {
        const res = await get<getPropertyCreateTicketResponse>("/property-ticket");
        setPropertyTicket({
            categoryNames: res.payload.categoryNames,
            departmentNames: res.payload.departmentNames,
            priorityNames: res.payload.priorityNames
        })
    }

    const setUserId = async (departmentId: number) => {
        if (departmentId) {
            const res = await get<[getUserNamesByDepartmentsResponse]>(`user-names-by-department/${departmentId}`);
            setTicket({ ...ticket, departmentId: departmentId })
            setUserNames(res.payload)
        }
    }

    //END NewTicket

    // Update Ticket
    const [states, setStates] = useState<getStateResponse[]>();
    const [stateId, setStateId] = useState<number>();

    const [updateTicket, setUpdateTicket] = useState<DataRow & {
        categoryId: number,
        departmentId: number,
        userId?: number,
        priorityId: number,
    }>({
        title: '',
        description: '',
        priority: '',
        category: '',
        state: '',
        department: '',
        date: '',
        user: '',
        id: 0,
        categoryId: 0,
        departmentId: 0,
        priorityId: 0,
    });
    const getTicketById = async (id: number) => {
        try {
            const res = await get<DataRow & {
                categoryId: number,
                departmentId: number,
                userId?: number,
                priorityId: 0,
            }>(`ticket/${id}`);
            setUpdateTicket(res.payload)
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

    const getState = async () => {
        try {
            const res = await get<getStateResponse[]>("/get-state");
            setStates(res.payload)
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

    const handleUpdateTicket = async () => {
        try {
            console.log(updateTicket)
             await put<ticketType & { stateId?: number }, number>(`tickets/${updateTicket.id}/update`, {
                title: updateTicket.title,
                description: updateTicket.description,
                priorityId: updateTicket.priorityId,
                categoryId: updateTicket.categoryId,
                userId: updateTicket.userId,
                stateId: stateId,
                departmentId: updateTicket.departmentId
            });
            getTickets()
            Swal.fire({
                text: `Ticket Editado`,
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


    //END Update Ticket

    //Delete Ticket
    const handleDeleteTicket = async (id: number) => {
        try {
            await _delete<number>(`tickets/${id}/delete`);
            getTickets()
            Swal.fire({
                text: `Ticket Eliminado`,
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
    }
    //END Delete Ticket
    useEffect(() => {
        try {
            gerPropertyTicket()
            getTickets()
            getState()
        } catch (err) {
            console.log(err)
        }
    }, [])




    return {
        setTicket,
        ticket,
        propertyTicket,
        setUserId,
        userNames,
        getPriorityColor,
        searchTerm,
        handleSearch,
        filteredData,
        handleNewTicket,
        handleUpdateTicket,
        getTicketById,
        updateTicket,
        setUpdateTicket,
        handleDeleteTicket,
        states,
        setStateId
    }
}