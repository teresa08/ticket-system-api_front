import { useState } from "react"

export const UserPageHook = ()=>{
    const [breadcrumb, setBreadcrumb] = useState<number>(1);
    console.log(breadcrumb)
    return{
        breadcrumb,
        setBreadcrumb
    }
}