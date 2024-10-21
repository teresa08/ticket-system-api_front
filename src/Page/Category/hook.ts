import { useState } from "react"

export const CategoryPage = ()=>{
    const [breadcrumb, setBreadcrumb] = useState<number>(1);
    console.log(breadcrumb)
    return{
        breadcrumb,
        setBreadcrumb
    }
}