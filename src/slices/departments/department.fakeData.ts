export interface DepartmentItem {
    id: string;
    tenantId: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

export interface DepartmentsResponse {
    items: DepartmentItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export const initialDepartments: DepartmentItem[] = [
    {
        id: "1",
        tenantId: "tenant-1",
        name: "Human Resources",
        description: "Manages employee relations, recruitment, and organizational development",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
    },
    {
        id: "2",
        tenantId: "tenant-1",
        name: "Information Technology",
        description: "Handles all technology infrastructure and software development",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
    },
    {
        id: "3",
        tenantId: "tenant-1",
        name: "Finance",
        description: "Manages financial planning, accounting, and budgeting",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
    },
    {
        id: "4",
        tenantId: "tenant-1",
        name: "Marketing",
        description: "Oversees brand management, advertising, and customer engagement",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
    },
    {
        id: "5",
        tenantId: "tenant-1",
        name: "Operations",
        description: "Manages day-to-day business operations and process optimization",
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
    },
];
