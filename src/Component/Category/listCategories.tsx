import React, { } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { CategoryHook, DataRow } from './hook';




export const ListCategory: React.FC = () => {

  const {handleDeleteCategory, setCategory, category, createCategory, searchTerm, handleSearch, filteredData } = CategoryHook()
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Categoria',
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: 'Eliminar',
      cell: (row) => (
        <button onClick={()=>handleDeleteCategory(row.id)} className={"btn btn-danger"}>
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
        <h2 className="mb-4 col-3">Categoria</h2>
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
          <button className="btn col-4 btn-primary" data-bs-toggle="modal" data-bs-target="#CreateCategory">
            Crear Categoria
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />

      {/* Modal Crate Categoria */}
      <div className="modal fade" id="CreateCategory" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateTicket">Crear Categoria</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Introduzca el nombre de la categoría"
                    value={category.categoryName}
                    onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
              <button data-bs-dismiss="modal"  onClick={createCategory} className="btn btn-success col-2" type="button">Crear</button>
            </div>
          </div>
        </div>
      </div>
      {/* END Modal Create Categoria */}
    </div>
  );
};
