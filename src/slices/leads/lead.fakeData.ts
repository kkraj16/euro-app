export type LeadStatus =
  | "New"
  | "Contacted"
  | "Quoted"
  | "In Progress"
  | "Pending Approval"
  | "Won"
  | "Lost"
  | "On Hold"
  | "Archived";

export interface LeadNote {
  id: string;
  timestamp: string;
  text: string;
}

export interface LeadItem {
  LeadId: string;
  ClientName: string;
  ContactName?: string;
  ContactPhone?: string;
  ContactEmail?: string;
  LeadSource?:
    | "Website"
    | "Referral"
    | "Returning Client"
    | "Phone"
    | "Walk-in"
    | "Other";
  ProjectName: string;
  ProjectType?:
    | "Domestic"
    | "Commercial"
    | "Industrial"
    | "Housing"
    | "New Build";
  EstimatedStartDate?: string; // ISO date
  EstimatedDurationWeeks?: number;
  Notes?: string;
  CreatedDate: string; // ISO datetime
  LastUpdated: string; // ISO datetime
  Status: LeadStatus;
  ReasonLost?: string;
  Activity?: LeadNote[];
}

export const initialLeads: LeadItem[] = [
  {
    LeadId: "LEAD-1001",
    ClientName: "Skyline Construction",
    ContactName: "Alex Turner",
    ContactPhone: "+44 20 7123 4567",
    ContactEmail: "alex.turner@skylinecon.co.uk",
    LeadSource: "Website",
    ProjectName: "City Tower Access",
    ProjectType: "Commercial",
    EstimatedStartDate: "2026-01-10",
    EstimatedDurationWeeks: 8,
    Notes: "High-traffic zone, consider noise and dust mitigation.",
    CreatedDate: new Date().toISOString(),
    LastUpdated: new Date().toISOString(),
    Status: "New",
    Activity: [
      { id: "N1", timestamp: new Date().toISOString(), text: "Lead created." },
    ],
  },
  {
    LeadId: "LEAD-1002",
    ClientName: "Greenfield Homes",
    ContactName: "Sophie Lee",
    ContactPhone: "+44 161 555 0101",
    ContactEmail: "sophie.lee@greenfieldhomes.uk",
    LeadSource: "Referral",
    ProjectName: "Housing Estate Phase 3",
    ProjectType: "Housing",
    EstimatedStartDate: "2026-02-05",
    EstimatedDurationWeeks: 12,
    Notes: "Multiple identical plots; reusable material plan.",
    CreatedDate: new Date().toISOString(),
    LastUpdated: new Date().toISOString(),
    Status: "Contacted",
    Activity: [
      {
        id: "N2",
        timestamp: new Date().toISOString(),
        text: "Initial call scheduled.",
      },
    ],
  },
  {
    LeadId: "LEAD-1003",
    ClientName: "Portside Industrials",
    ContactName: "Mark Evans",
    ContactPhone: "+44 23 8000 2222",
    ContactEmail: "mark.evans@portside-industrials.uk",
    LeadSource: "Phone",
    ProjectName: "Temporary Roof Overhaul",
    ProjectType: "Industrial",
    EstimatedStartDate: "2026-03-12",
    EstimatedDurationWeeks: 6,
    Notes: "Wind exposure is high. Extra bracing likely required.",
    CreatedDate: new Date().toISOString(),
    LastUpdated: new Date().toISOString(),
    Status: "Quoted",
    Activity: [
      {
        id: "N3",
        timestamp: new Date().toISOString(),
        text: "Quote submitted to client.",
      },
    ],
  },
  {
    LeadId: "LEAD-1004",
    ClientName: "Riverside Council",
    ContactName: "Priya Shah",
    ContactPhone: "+44 131 600 7788",
    ContactEmail: "priya.shah@riverside.gov.uk",
    LeadSource: "Returning Client",
    ProjectName: "Bridge Edge Protection",
    ProjectType: "Commercial",
    EstimatedStartDate: "2026-01-20",
    EstimatedDurationWeeks: 10,
    Notes: "Night work windows preferred.",
    CreatedDate: new Date().toISOString(),
    LastUpdated: new Date().toISOString(),
    Status: "In Progress",
    Activity: [
      {
        id: "N4",
        timestamp: new Date().toISOString(),
        text: "Site survey completed.",
      },
    ],
  },
];
