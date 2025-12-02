// Staff Profile API Helper Functions
// This file follows the same pattern as other API helpers in the project

// Mock API functions - Replace with actual API calls when backend is ready

export const getStaffProfile = (employeeId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock staff profile data
      const profile = {
        id: 1,
        employeeId: employeeId || "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        phone: "+1234567890",
        position: "Senior Developer",
        department: "IT",
        joinDate: "2024-01-15",
        dateOfBirth: "1990-05-20",
        address: "123 Main Street, City, State 12345",
        emergencyContact: "+1234567899",
        emergencyContactName: "Jane Doe",
        status: "Active",
        reportingManager: "Michael Smith",
        employmentType: "Full-time",
        workLocation: "Head Office",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15",
      };
      resolve(profile);
    }, 300);
  });
};

export const updateStaffProfile = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedProfile = {
        ...data,
        updatedAt: new Date().toISOString().split("T")[0],
      };
      resolve(updatedProfile);
    }, 300);
  });
};

// Add to existing fakebackend_helper.ts when integrating with Redux
export const addStaffProfileToBackend = () => {
  // This function should be added to src/helpers/fakebackend_helper.ts
  // Example implementation:
  /*
  export const getStaffProfile = (employeeId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = staffProfileData.find((p) => p.employeeId === employeeId);
        resolve(profile);
      }, 300);
    });
  };

  export const updateStaffProfile = (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = staffProfileData.findIndex((p) => p.id === data.id);
        if (index !== -1) {
          staffProfileData[index] = {
            ...staffProfileData[index],
            ...data,
            updatedAt: new Date().toISOString().split("T")[0],
          };
          resolve(staffProfileData[index]);
        }
      }, 300);
    });
  };
  */
};
