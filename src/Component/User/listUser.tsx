import React, { } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { DataRow, UserHook } from './hook';



export const ListUser: React.FC = () => {

  const { handleCreateUser,
    setRegisterUser,
    registerUser,
    propertyCreateUser,
    searchTerm,
    handleSearch,
    handleDeleteUser,
    filteredData } = UserHook()
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Departamento',
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: 'Correo Eletronico',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Eliminar',
      cell: (row) => (
        <button onClick={() => { handleDeleteUser(row.id) }} className={"btn btn-danger"}>
          Eliminar
        </button>
      ),
      sortable: true,
    },
    {
      name: 'Actualizar',
      cell: () => (
        <button className={`btn btn-info`}>
          Actualizar
        </button>
      ),
      sortable: true,
    }

  ];

  return (
    <div className="container mt-5">
      <div className="row col-12">
        <h2 className="mb-4 col-4">Usuarios</h2>
        <div className="mb-4 col-8 row ">
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
            <button className="btn col-4 btn-primary" data-bs-toggle="modal" data-bs-target="#CreateUser">
              Crear Usuario
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

      {/* Modal Create User */}
      <div className="modal fade" id="CreateUser" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateTicket">Registrar Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="col-12  p-3 row ">
                <div className="col-6 p-3 ">
                  <div className="col-12">
                    <label className="col-form-label">Nombre</label>
                  </div>
                  <div className="col-12">
                    <input value={registerUser.name} onChange={(e) => { e.preventDefault(); setRegisterUser({ ...registerUser, name: e.target.value }) }}  className="form-control" />
                  </div>
                </div>
                <div className="col-6 p-3 ">
                  <div className="col-12">
                    <label className="col-form-label">Correo</label>
                  </div>
                  <div className="col-12">
                    <input className="form-control" value={registerUser.email} onChange={(e) => { e.preventDefault(); setRegisterUser({ ...registerUser, email: e.target.value }) }} />
                  </div>
                </div>
                <div className="col-6">
                  <label className="col-form-label">departamento</label>
                  <select onChange={(e) => { e.preventDefault(); setRegisterUser({ ...registerUser, departmentId: Number(e.target.value) }) }}  className="form-select" aria-label="Default select example">
                    <option selected>Seleccionar</option>
                    {propertyCreateUser?.departmentNames?.map((department) => (
                      <option value={department.id}>{department.departmentName}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="col-form-label">Rol</label>
                  <select  onChange={(e) => { e.preventDefault(); setRegisterUser({ ...registerUser, roleId: Number(e.target.value) }) }} className="form-select" aria-label="Default select example">
                    <option selected>Seleccionar</option>
                    {propertyCreateUser?.roleNames?.map((role) => (
                      <option value={role.id}>{role.roleName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button  data-bs-dismiss="modal" onClick={handleCreateUser} className="btn btn-success col-3" type="button">Registrar</button>
            </div>
          </div>
        </div>
      </div>
      {/* END Modal Create User */}
    </div>
  );
};
