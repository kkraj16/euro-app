import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLeads, LeadItem, LeadNote, LeadStatus } from "./lead.fakeData";

interface LeadState {
  leadList: LeadItem[];
  selectedLead: LeadItem | null;
}

const initialState: LeadState = {
  leadList: initialLeads,
  selectedLead: null,
};

const leadSlice = createSlice({
  name: "Leads",
  initialState,
  reducers: {
    selectLead(state, action: PayloadAction<string>) {
      state.selectedLead =
        state.leadList.find((l) => l.LeadId === action.payload) || null;
    },
    createLead(
      state,
      action: PayloadAction<
        Omit<
          LeadItem,
          "LeadId" | "CreatedDate" | "LastUpdated" | "Status" | "Activity"
        >
      >
    ) {
      const id = `LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toISOString();
      const payload = action.payload as any;
      const newLead: LeadItem = {
        LeadId: id,
        CreatedDate: now,
        LastUpdated: now,
        ...payload,
        Status: "New",
        Activity: [
          { id: `N-${Date.now()}`, timestamp: now, text: "Lead created." },
        ],
      };
      state.leadList.unshift(newLead);
      state.selectedLead = newLead;
    },
    updateLead(state, action: PayloadAction<LeadItem>) {
      const idx = state.leadList.findIndex(
        (l) => l.LeadId === action.payload.LeadId
      );
      if (idx !== -1) {
        const now = new Date().toISOString();
        state.leadList[idx] = { ...action.payload, LastUpdated: now };
        state.selectedLead = state.leadList[idx];
      }
    },
    deleteLead(state, action: PayloadAction<string>) {
      state.leadList = state.leadList.filter(
        (l) => l.LeadId !== action.payload
      );
      if (state.selectedLead?.LeadId === action.payload)
        state.selectedLead = null;
    },
    updateLeadStatus(
      state,
      action: PayloadAction<{
        LeadId: string;
        Status: LeadStatus;
        ReasonLost?: string;
      }>
    ) {
      const lead = state.leadList.find(
        (l) => l.LeadId === action.payload.LeadId
      );
      if (lead) {
        lead.Status = action.payload.Status;
        if (action.payload.Status === "Lost") {
          lead.ReasonLost = action.payload.ReasonLost || "Not specified";
        }
        if (action.payload.Status === "Archived") {
          // Archived leads treated as read-only by UI logic
        }
        lead.LastUpdated = new Date().toISOString();
        lead.Activity = lead.Activity || [];
        lead.Activity.push({
          id: `N-${Date.now()}`,
          timestamp: new Date().toISOString(),
          text: `Status changed to ${lead.Status}`,
        });
      }
    },
    addLeadNote(
      state,
      action: PayloadAction<{ LeadId: string; note: LeadNote }>
    ) {
      const lead = state.leadList.find(
        (l) => l.LeadId === action.payload.LeadId
      );
      if (lead) {
        lead.Activity = lead.Activity || [];
        lead.Activity.push(action.payload.note);
        lead.LastUpdated = new Date().toISOString();
      }
    },
  },
});

export const {
  selectLead,
  createLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
  addLeadNote,
} = leadSlice.actions;
export default leadSlice.reducer;

// selectors
export const selectLeadList = (state: any) => state.Leads.leadList;
export const selectSelectedLead = (state: any) => state.Leads.selectedLead;
export const selectLeadById = (state: any, id: string) =>
  state.Leads.leadList.find((l: LeadItem) => l.LeadId === id);
