import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getMeetings as getMeetingsApi,
  getMeetingById as getMeetingByIdApi,
  addNewMeeting as addNewMeetingApi,
  updateMeeting as updateMeetingApi,
  deleteMeeting as deleteMeetingApi,
} from "../../helpers/fakebackend_helper";

export const getMeetings = createAsyncThunk(
  "meetings/getMeetings",
  async () => {
    try {
      const response = getMeetingsApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getMeetingById = createAsyncThunk(
  "meetings/getMeetingById",
  async (id: number) => {
    try {
      const response = getMeetingByIdApi(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addNewMeeting = createAsyncThunk(
  "meetings/addNewMeeting",
  async (meeting: any) => {
    try {
      const response = addNewMeetingApi(meeting);
      const data = await response;
      toast.success("Meeting Scheduled Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Meeting Schedule Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateMeeting = createAsyncThunk(
  "meetings/updateMeeting",
  async (meeting: any) => {
    try {
      const response = updateMeetingApi(meeting.id, meeting);
      const data = await response;
      toast.success("Meeting Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Meeting Update Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteMeeting = createAsyncThunk(
  "meetings/deleteMeeting",
  async (meeting: any) => {
    try {
      const response = deleteMeetingApi(meeting);
      toast.success("Meeting Deleted Successfully", { autoClose: 3000 });
      return { meeting, ...response };
    } catch (error) {
      toast.error("Meeting Delete Failed", { autoClose: 3000 });
      return error;
    }
  }
);
