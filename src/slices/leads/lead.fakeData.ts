export type LeadStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// 0: New, 1: Contacted, 2: Quoted, 3: In Progress, 4: Pending Approval, 5: Won, 6: Lost, 7: On Hold, 8: Archived

export const LeadStatusLabels: Record<LeadStatus, string> = {
  0: "New",
  1: "Contacted",
  2: "Quoted",
  3: "In Progress",
  4: "Pending Approval",
  5: "Won",
  6: "Lost",
  7: "On Hold",
  8: "Archived",
};

export interface LeadNote {
  id: string;
  timestamp: string;
  text: string;
}

export interface LeadItem {
  id: string;
  tenantId: string;
  tenantName: string;
  clientId: string | null;
  clientName: string;
  userId: string;
  userName: string;
  title: string;
  contactPerson: string;
  contactEmail: string;
  description: string;
  leadStatus: LeadStatus;
  tentativeHours: number;
  notes: string;
  isDeleted: boolean;
}

export interface LeadsResponse {
  items: LeadItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const initialLeads: LeadItem[] = [
  {
    id: "1",
    tenantId: "tenant-1",
    tenantName: "Tenant One",
    clientId: "client-1",
    clientName: "Client One",
    userId: "user-1",
    userName: "John Doe",
    title: "Mr.",
    contactPerson: "Jane Smith",
    contactEmail: "jane.smith@example.com",
    description: "Interested in premium plan",
    leadStatus: 0,
    tentativeHours: 20,
    notes: "Initial contact made",
    isDeleted: false,
  },
  {
    id: "2",
    tenantId: "tenant-1",
    tenantName: "Tenant One",
    clientId: "client-2",
    clientName: "Client Two",
    userId: "user-1",
    userName: "John Doe",
    title: "Ms.",
    contactPerson: "Alice Johnson",
    contactEmail: "alice.j@example.com",
    description: "Looking for consultation",
    leadStatus: 1,
    tentativeHours: 10,
    notes: "Scheduled a meeting",
    isDeleted: false,
  },
];
