import { createSlice } from "@reduxjs/toolkit";
import {
  getMeetings,
  getMeetingById,
  addNewMeeting,
  updateMeeting,
  deleteMeeting,
} from "./thunk";

export interface Meeting {
  id?: number;
  title: string;
  clientId?: number;
  clientName: string;
  meetingDate: string;
  meetingTime: string;
  endTime?: string;
  duration: number; // in minutes
  location: string;
  locationType: "In-Person" | "Virtual" | "Hybrid";
  meetingLink?: string;
  attendees: string[];
  organizer: string;
  agenda: string;
  notes?: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  meetingType:
    | "Client Meeting"
    | "Site Visit"
    | "Review"
    | "Consultation"
    | "Internal"
    | "Other";
  priority: "High" | "Medium" | "Low";
  reminders: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MeetingsState {
  meetings: Meeting[];
  meeting: Meeting | null;
  error: any;
  isMeetingCreated: boolean;
  isMeetingSuccess: boolean;
}

export const initialState: MeetingsState = {
  meetings: [],
  meeting: null,
  error: {},
  isMeetingCreated: false,
  isMeetingSuccess: false,
};

const MeetingsSlice = createSlice({
  name: "MeetingsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMeetings.fulfilled, (state: any, action: any) => {
      state.meetings = action.payload;
      state.isMeetingCreated = false;
      state.isMeetingSuccess = true;
    });
    builder.addCase(getMeetings.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
      state.isMeetingCreated = false;
      state.isMeetingSuccess = false;
    });

    builder.addCase(getMeetingById.fulfilled, (state: any, action: any) => {
      state.meeting = action.payload;
    });
    builder.addCase(getMeetingById.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(addNewMeeting.fulfilled, (state: any, action: any) => {
      state.meetings.unshift(action.payload);
      state.isMeetingCreated = true;
    });
    builder.addCase(addNewMeeting.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(updateMeeting.fulfilled, (state: any, action: any) => {
      state.meetings = state.meetings.map((meeting: any) =>
        meeting.id === action.payload.id
          ? { ...meeting, ...action.payload }
          : meeting
      );
    });
    builder.addCase(updateMeeting.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });

    builder.addCase(deleteMeeting.fulfilled, (state: any, action: any) => {
      state.meetings = state.meetings.filter(
        (meeting: any) =>
          meeting.id.toString() !== action.payload.meeting.toString()
      );
    });
    builder.addCase(deleteMeeting.rejected, (state: any, action: any) => {
      state.error = action.payload?.error || null;
    });
  },
});

export default MeetingsSlice.reducer;
