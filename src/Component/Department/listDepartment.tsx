import React, { } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { DataRow, DepartmentHook } from './hook';



export const ListDepartment: React.FC = () => {

  const {handleDeleteDepartment, searchTerm, handleSearch, filteredData, department, setDepartment, createDepartment } = DepartmentHook()
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Departamentos ',
      selector: (row) => row.departmentName,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Eliminar',
      cell: (row) => (
        <button onClick={()=> handleDeleteDepartment(row.id)} className={"btn btn-danger"}>
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
      <div className="mb-4 col-12 row ">
        <h2 className="mb-4 col-3">Departamento</h2>
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-5">
          <button className="btn col-4 btn-primary" data-bs-toggle="modal" data-bs-target="#CreateDepartment">
            Crear Departamento
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />

      {/* Modal create Department */}
      <div className="modal fade" id="CreateDepartment" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateTicket">Crear Departamento</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
              <button data-bs-dismiss="modal" onClick={createDepartment} className="btn btn-success col-2" type="button">Crear</button>
            </div>
          </div>
        </div>
      </div>
      {/* END Modal Create Department */}
    </div>
  );
};
