import { CategoryHook } from "./hook"

export function NewCategory(){
    const {setCategory, category, createCategory } = CategoryHook()
    return(
        <div className="container mt-5">
        <form >
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Introduzca el nombre de la categoría"
                    value={category.categoryName}
                    onChange={(e) => setCategory( {...category, categoryName: e.target.value})}
                    required
                />
            </div>
            <button type="submit" onClick={createCategory} className="btn btn-primary mt-3">Crear Categoría</button>
        </form>
    </div>
    )
}