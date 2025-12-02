import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

// Departments
import DepartmentsReducer from "./departments/reducer";

// Staff Positions
import StaffPositionsReducer from "./staffPositions/reducer";

// Tenant Rental Config
import TenantRentalConfigReducer from "./tenantRentalConfig/reducer";

// Client Rental Config
import ClientRentalConfigReducer from "./clientRentalConfig/reducer";

// Meetings
import MeetingsReducer from "./meetings/reducer";

// Leads
import LeadsReducer from "./leads/lead.slice";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Departments: DepartmentsReducer,
  StaffPositions: StaffPositionsReducer,
  TenantRentalConfig: TenantRentalConfigReducer,
  ClientRentalConfig: ClientRentalConfigReducer,
  Meetings: MeetingsReducer,
  Leads: LeadsReducer,
});

export default rootReducer;
