import { useState } from "react"

export const TicketPageHook = ()=>{
    const [breadcrumb, setBreadcrumb] = useState<number>(1);
    console.log(breadcrumb)
    return{
        breadcrumb,
        setBreadcrumb
    }
}