import { APIClient } from "./api_helper";

import * as url from "./url_helper";
import { departmentsData } from "../common/data/departments";
import { staffPositions } from "../common/data/staffPositions";
import { tenantRentalConfigData } from "../common/data/tenantRentalConfig";
import { clientRentalConfigData } from "../common/data/clientRentalConfig";
import { meetingsData } from "../common/data/meetings";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data: any) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data: any) =>
  api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data: any) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data: any) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url: string, data: any) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postJwtLogin = (data: any) =>
  api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data: any) =>
  api.create(url.SOCIAL_LOGIN, data);

// Departments
export const getDepartments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(departmentsData);
    }, 300);
  });
};

export const getDepartmentById = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const department = departmentsData.find((d) => d.id === id);
      resolve(department);
    }, 300);
  });
};

export const addNewDepartment = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDepartment = {
        ...data,
        id: departmentsData.length + 1,
        employeeCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      departmentsData.unshift(newDepartment);
      resolve(newDepartment);
    }, 300);
  });
};

export const updateDepartment = (id: number, data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = departmentsData.findIndex((d) => d.id === id);
      if (index !== -1) {
        departmentsData[index] = {
          ...departmentsData[index],
          ...data,
          updatedAt: new Date().toISOString().split("T")[0],
        };
        resolve(departmentsData[index]);
      }
    }, 300);
  });
};

export const deleteDepartment = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = departmentsData.findIndex((d) => d.id === id);
      if (index !== -1) {
        departmentsData.splice(index, 1);
      }
      resolve({ success: true });
    }, 300);
  });
};

// Staff Positions
export const getStaffPositions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(staffPositions);
    }, 300);
  });
};

export const getStaffPositionById = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const position = staffPositions.find((p) => p.id === id);
      resolve(position);
    }, 300);
  });
};

export const addNewStaffPosition = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPosition = {
        ...data,
        id: staffPositions.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      staffPositions.unshift(newPosition);
      resolve(newPosition);
    }, 300);
  });
};

export const updateStaffPosition = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = staffPositions.findIndex((p) => p.id === data.id);
      if (index !== -1) {
        staffPositions[index] = {
          ...staffPositions[index],
          ...data,
          updatedAt: new Date().toISOString().split("T")[0],
        };
        resolve(staffPositions[index]);
      }
    }, 300);
  });
};

export const deleteStaffPosition = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = staffPositions.findIndex((p) => p.id === id);
      if (index !== -1) {
        staffPositions.splice(index, 1);
      }
      resolve({ success: true });
    }, 300);
  });
};

// Tenant Rental Configuration
export const getTenantRentalConfig = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tenantRentalConfigData);
    }, 300);
  });
};

export const updateTenantRentalConfig = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Object.assign(tenantRentalConfigData, {
        ...data,
        updatedAt: new Date().toISOString().split("T")[0],
      });
      resolve(tenantRentalConfigData);
    }, 300);
  });
};

// Client Rental Configuration
export const getClientRentalConfigs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clientRentalConfigData);
    }, 300);
  });
};

export const getClientRentalConfigByClientId = (clientId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const config = clientRentalConfigData.find(
        (c) => c.clientId === clientId
      );
      resolve(config);
    }, 300);
  });
};

export const updateClientRentalConfig = (clientId: number, data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = clientRentalConfigData.findIndex(
        (c) => c.clientId === clientId
      );
      if (index !== -1) {
        clientRentalConfigData[index] = {
          ...clientRentalConfigData[index],
          ...data,
          updatedAt: new Date().toISOString().split("T")[0],
        };
        resolve(clientRentalConfigData[index]);
      }
    }, 300);
  });
};

// ========================
// MEETINGS API
// ========================

export const getMeetings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(meetingsData);
    }, 300);
  });
};

export const getMeetingById = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const meeting = meetingsData.find((m) => m.id === id);
      resolve(meeting);
    }, 300);
  });
};

export const addNewMeeting = (meeting: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMeeting = {
        id: meetingsData.length + 1,
        ...meeting,
        createdAt: new Date().toISOString().split("T")[0],
      };
      meetingsData.unshift(newMeeting);
      resolve(newMeeting);
    }, 300);
  });
};

export const updateMeeting = (id: number, meeting: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = meetingsData.findIndex((m) => m.id === id);
      if (index !== -1) {
        meetingsData[index] = {
          ...meetingsData[index],
          ...meeting,
          updatedAt: new Date().toISOString().split("T")[0],
        };
        resolve(meetingsData[index]);
      }
    }, 300);
  });
};

export const deleteMeeting = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = meetingsData.findIndex((m) => m.id === id);
      if (index !== -1) {
        meetingsData.splice(index, 1);
      }
      resolve({});
    }, 300);
  });
};
