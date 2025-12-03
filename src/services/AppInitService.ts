import { fetchLeads } from "../slices/leads/lead.slice";
import { fetchDepartments } from "../slices/departments/department.slice";
import { fetchCountries } from "../slices/countries/country.slice";

/**
 * Centralized App Initialization Service
 * Handles loading of master data once on application bootstrap
 */
class AppInitService {
    private isInitialized = false;
    private isLoading = false;

    /**
     * Initialize application data on app startup
     * Loads all required master data once
     */
    async initialize(dispatch: any) {
        if (this.isInitialized || this.isLoading) {
            console.log("App already initialized or loading");
            return;
        }

        this.isLoading = true;
        try {
            console.log("Initializing app data...");

            // Load Leads
            await dispatch(fetchLeads({ pageNumber: 1, pageSize: 500 }));

            // Load Departments
            await dispatch(fetchDepartments({ pageNumber: 1, pageSize: 500 }));

            // Load Countries
            await dispatch(fetchCountries({ pageNumber: 1, pageSize: 50 }));

            // Future: Load other master data here
            // await dispatch(fetchMeetings());
            // await dispatch(fetchUserProfile());

            this.isInitialized = true;
            console.log("App initialization complete");
        } catch (error) {
            console.error("App initialization failed:", error);
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Force refresh leads data
     * Used after CRUD operations
     */
    async forceRefreshLeads(dispatch: any) {
        await dispatch(fetchLeads({ pageNumber: 1, pageSize: 500 }));
    }

    /**
     * Force refresh departments data
     * Used after CRUD operations
     */
    async forceRefreshDepartments(dispatch: any) {
        await dispatch(fetchDepartments({ pageNumber: 1, pageSize: 500 }));
    }

    /**
     * Force refresh countries data
     * Used after CRUD operations or manual refresh
     */
    async forceRefreshCountries(dispatch: any) {
        await dispatch(fetchCountries({ pageNumber: 1, pageSize: 50 }));
    }

    /**
     * Reset initialization state
     * Useful for logout or re-initialization scenarios
     */
    reset() {
        this.isInitialized = false;
        this.isLoading = false;
    }

    /**
     * Check if app is initialized
     */
    getIsInitialized(): boolean {
        return this.isInitialized;
    }
}

// Export singleton instance
export const appInitService = new AppInitService();
