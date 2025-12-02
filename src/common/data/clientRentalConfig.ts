export interface ClientRentalConfig {
  id: number;
  clientId: number;
  clientName: string;
  overrideGracePeriod: boolean;
  gracePeriodDays: number;
  overrideMinimumHire: boolean;
  minimumHireWeeks: number;
  overrideIncludeWeekends: boolean;
  includeWeekends: boolean;
  overrideExcludePublicHolidays: boolean;
  excludePublicHolidays: boolean;
  updatedAt?: string;
}

// Client-specific rental configuration overrides
const clientRentalConfigData: ClientRentalConfig[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "ABC Corporation",
    overrideGracePeriod: true,
    gracePeriodDays: 10,
    overrideMinimumHire: true,
    minimumHireWeeks: 4,
    overrideIncludeWeekends: false,
    includeWeekends: true,
    overrideExcludePublicHolidays: false,
    excludePublicHolidays: true,
    updatedAt: "2024-11-25",
  },
  {
    id: 2,
    clientId: 2,
    clientName: "XYZ Industries",
    overrideGracePeriod: false,
    gracePeriodDays: 7,
    overrideMinimumHire: true,
    minimumHireWeeks: 1,
    overrideIncludeWeekends: true,
    includeWeekends: false,
    overrideExcludePublicHolidays: false,
    excludePublicHolidays: true,
    updatedAt: "2024-11-20",
  },
  {
    id: 3,
    clientId: 3,
    clientName: "Tech Solutions",
    overrideGracePeriod: false,
    gracePeriodDays: 7,
    overrideMinimumHire: false,
    minimumHireWeeks: 2,
    overrideIncludeWeekends: false,
    includeWeekends: true,
    overrideExcludePublicHolidays: false,
    excludePublicHolidays: true,
    updatedAt: "2024-11-15",
  },
];

export { clientRentalConfigData };
