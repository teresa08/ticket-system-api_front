import { UserHook } from "./hook"

export function NewUser() {
    const {propertyCreateUser } = UserHook()
    return (
        <div className="card shadow-sm rounded col-8 d-flex justify-content-center">
            <div className="col-12  p-3 row ">
                <div className="col-6 p-3 ">
                    <div className="col-12">
                        <label className="col-form-label">Nombre</label>
                    </div>
                    <div className="col-12">
                        <input className="form-control" />
                    </div>
                </div>
                <div className="col-6 p-3 ">
                    <div className="col-12">
                        <label className="col-form-label">Correo</label>
                    </div>
                    <div className="col-12">
                        <input className="form-control" />
                    </div>
                </div>
                <div className="col-6">
                        <label className="col-form-label">departamento</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Seleccionar</option>
                            {propertyCreateUser?.departmentNames?.map((department) => (
                                <option value={department.id}>{department.departmentName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="col-form-label">Rol</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Seleccionar</option>
                            {propertyCreateUser?.roleNames?.map((role) => (
                                <option value={role.id}>{role.roleName}</option>
                            ))}
                        </select>
                    </div>
            </div>
            <div className="p-3 d-flex justify-content-end">
                <button className="btn btn-success col-2" type="button">Registrar Usuario</button>
            </div>
        </div>
    )
}