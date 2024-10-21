import React, { } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { DataRow, NewTicketHook } from './hook';





export const ListTicket: React.FC = () => {

  const { states,
    handleDeleteTicket,
    handleUpdateTicket,
    updateTicket,
    setUpdateTicket,
    getTicketById,
    getPriorityColor,
    searchTerm,
    handleSearch,
    filteredData,
    handleNewTicket,
    setTicket,
    ticket,
    propertyTicket,
    setUserId,
    userNames, 
    setStateId } = NewTicketHook()



  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Título',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: (row) => row.description,
    },
    {
      name: 'Prioridad',
      cell: (row) => (
        <button className={`btn ${getPriorityColor(row.priority)}`}>
          {row.priority}
        </button>
      ),
      sortable: true,
    },
    {
      name: 'Categoría',
      selector: (row) => row.category,
    },
    {
      name: 'Estado',
      selector: (row) => row.state,
    },
    {
      name: 'Departamento',
      selector: (row) => row.department,
    },
    {
      name: 'Fecha',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Asignado',
      selector: (row) => row.user,
    },
    {
      name: 'Opcion',
      cell: (row) => (
        <div>
          <button onClick={() => { getTicketById(row.id) }} className="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#UpdateTicket">
            Editar
          </button>
          <button onClick={() => { handleDeleteTicket(row.id) }} className="btn btn-danger">
            Eliminar
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row col-12">
        <h2 className="mb-4 col-5">Tickets</h2>
        <div className="mb-4 col-7 row ">
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-7">
            <button className="btn col-4 btn-primary" data-bs-toggle="modal" data-bs-target="#CreateTicket">
              Crear Ticket
            </button>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />

      {/* Modal Create Tickers */}
      <div className="modal fade" id="CreateTicket" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateTicket">Crear Ticket</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                      <select onChange={(e) => { e.preventDefault(); setUserId(Number(e.target.value)) }} className="form-select" aria-label="Default select example">
                        <option selected>Seleccionar</option>
                        {propertyTicket?.departmentNames.map((department) => (
                          <option value={department.id}>{department.departmentName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="col-form-label">Asignar a:</label>
                      <select className="form-select" onChange={(e) => { e.preventDefault(); setTicket({ ...ticket, userId: Number(e.target.value) }) }} aria-label="Default select example">
                        <option selected>Seleccionar</option>
                        {userNames?.map((userNames) => (
                          <option value={userNames.id}>{userNames.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button data-bs-dismiss="modal" onClick={handleNewTicket} className="btn btn-success col-2" type="button">Crear</button>
            </div>
          </div>
        </div>
      </div>
      {/* END Modal Editar Tickers */}

      {/* Modal Update Tickers */}
      <div className="modal fade" id="UpdateTicket" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateTicket">Actualizar Ticket</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="">
                <div className="col-12 p-3 ">
                  <div className="col-12">
                    <label className="col-form-label">Titulo</label>
                  </div>
                  <div className="col-12">
                    <input className="form-control" value={updateTicket.title} onChange={(e) => { e.preventDefault(); setUpdateTicket({ ...updateTicket, title: e.target.value }) }} />
                  </div>
                </div>
                <div className="col-12 p-3">
                  <textarea className="form-control" value={updateTicket.description} onChange={(e) => { e.preventDefault(); setUpdateTicket({ ...updateTicket, description: e.target.value }) }} placeholder="Descripción" id="floatingTextarea2" style={{ height: "200px" }}></textarea>
                </div>
                <div className=" p-3">
                  <div className="row">
                    <div className="col-6">
                      <label className="col-form-label">Categoria:</label>
                      <select onChange={(e) => { e.preventDefault(); setUpdateTicket({ ...updateTicket, categoryId: Number(e.target.value) }) }} className="form-select" aria-label="Default select example">
                        {propertyTicket?.categoryNames.map((category) => (
                          category.categoryName == updateTicket.category ?
                            <option selected value={category.id}>{category.categoryName}</option> :
                            <option value={category.id}>{category.categoryName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="col-form-label">Prioridad:</label>
                      <select className="form-select" onChange={(e) => { e.preventDefault(); setUpdateTicket({ ...updateTicket, priorityId: Number(e.target.value) }) }} aria-label="Default select example">
                        {propertyTicket?.priorityNames.map((priority) => (
                          priority.priorityName == updateTicket.priority ?
                            <option value={priority.id}>{priority.priorityName}</option> :
                            <option selected value={priority.id}>{priority.priorityName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label className="col-form-label">Departamento:</label>
                      <select onChange={(e) => { e.preventDefault(); setUserId(Number(e.target.value)) }} className="form-select" aria-label="Default select example">
                        {propertyTicket?.departmentNames.map((department) => (
                          department.departmentName == updateTicket.department ?
                            <option selected value={department.id}>{department.departmentName}</option> :
                            <option value={department.id}>{department.departmentName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="col-form-label">Asignar a:</label>
                      <select className="form-select" onChange={(e) => setUpdateTicket({ ...updateTicket, userId: Number(e.target.value) })} aria-label="Default select example">
                        {userNames?.map((userNames) => (

                          updateTicket.user == userNames.name ? <option selected value={userNames.id}>{userNames.name}</option> :
                            <option value={userNames.id}>{userNames.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-6">
                    <label className="col-form-label">Estado</label>
                    <select className="form-select" onChange={(e) => setStateId(Number(e.target.value))} aria-label="Default select example">
                      {states?.map((state) => (
                        state.stateName === updateTicket.state ?
                          <option selected value={state.id}>{state.stateName}</option> :
                          <option value={state.id}>{state.stateName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button data-bs-dismiss="modal" onClick={handleUpdateTicket} className="btn btn-success col-3" type="button">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
      {/* END Modal Update Tickers */}
    </div>
  );
};
