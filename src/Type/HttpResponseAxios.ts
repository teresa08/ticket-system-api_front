export type userResponse = {
    name: string,
    email: string,
    role: string,
    department: string
}

export type getPropertyCreateTicketResponse = {
    categoryNames: [{ id: number, categoryName: string }],
    departmentNames: [{ id: number, departmentName: string }],
    priorityNames: [{ id: number, priorityName: string }]
}

export type getUserNamesByDepartmentsResponse = {
    id: number,
    name: string
}

export type getAllCategoryResponse = {
    id: number,
    categoryName: string
}

export type getAllDepartmentResponse = {
    id: number,
    departmentName: string,
    description?: string
}

export type getAllUserResponse = {
    name: string,
    email: string,
    role: string,
    department: string,
}

export type getPropertyCreateUserResponse = {
    departmentNames: [{id:number, departmentName: string}],
    roleNames:[{id:number, roleName:string }]
}