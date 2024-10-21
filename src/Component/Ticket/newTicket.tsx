import { NewTicketHook } from "./hook";

export function NewTicket() {



    const {setTicket, ticket, propertyTicket,setUserId,userNames} = NewTicketHook();

  
    return (
        <div className="">
            <div className="col-12 p-3 ">
                <div className="col-12">
                    <label className="col-form-label">Titulo</label>
                </div>
                <div className="col-12">
                    <input className="form-control" onChange={(e) => { e.preventDefault(); setTicket({ ...ticket, title: e.target.value }) }} />
                </div>
            </div>
            <div className="col-12 p-3">
                <textarea className="form-control" onChange={(e) => { e.preventDefault(); setTicket({ ...ticket, description: e.target.value }) }} placeholder="Descripción" id="floatingTextarea2" style={{ height: "200px" }}></textarea>
            </div>
            <div className=" p-3">
                <div className="row">
                    <div className="col-6">
                        <label className="col-form-label">Categoria:</label>
                        <select onChange={(e) => { e.preventDefault(); setTicket({ ...ticket, categoryId: Number(e.target.value) }) }} className="form-select" aria-label="Default select example">
                            <option selected>Seleccionar</option>
                            {propertyTicket?.categoryNames.map((category) => (
                                <option value={category.id}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="col-form-label">Prioridad:</label>
                        <select className="form-select" onChange={(e) => { e.preventDefault(); setTicket({ ...ticket, priorityId: Number(e.target.value) }) }} aria-label="Default select example">
                            <option selected>Seleccionar</option>
                            {propertyTicket?.priorityNames.map((priority) => (
                                <option value={priority.id}>{priority.priorityName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <label className="col-form-label">Departamento:</label>
                        <select onChange={(e)=> {e.preventDefault(); setUserId(Number(e.target.value))}} className="form-select" aria-label="Default select example">
                            <option selected>Seleccionar</option>
                            {propertyTicket?.departmentNames.map((department) => (
                                <option value={department.id}>{department.departmentName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="col-form-label">Asignado a:</label>
                        <select className="form-select" onChange={(e) => { e.preventDefault(); setTicket({ ...ticket, userId: Number(e.target.value) }) }}  aria-label="Default select example">
                            <option selected>Seleccionar</option>
                            {userNames?.map((userNames) => (
                                <option value={userNames.id}>{userNames.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}