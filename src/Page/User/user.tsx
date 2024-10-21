import { ListUser } from "../../Component/User/listUser"


export function User() {
    return (
        <div>
            <div>
                <h1 className="display-5">Lista de Usuarios</h1>
            </div>

            <ListUser />

        </div>
    )
}