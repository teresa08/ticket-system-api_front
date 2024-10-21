import { DepartmentHook } from "./hook";

export function NewDepartment() {
    const { department, setDepartment, createDepartment } = DepartmentHook();
    return (
        <div className="container mt-5">
            <form >
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        placeholder="Introduzca el nombre del departamento"
                        value={department.departmentName}
                        onChange={(e) => setDepartment({ ...department, departmentName: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="categoryName"
                        placeholder="Descripcion"
                        value={department.description}
                        onChange={(e) => setDepartment({ ...department, description: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" onClick={createDepartment} className="btn btn-primary mt-3">Crear Departamento</button>
            </form>
        </div>
    )
}