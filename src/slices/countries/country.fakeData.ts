export interface CountryItem {
    id: string;
    name: string;
    code: string;
    isDeleted: boolean;
}

export interface CountriesResponse {
    items: CountryItem[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export const initialCountries: CountryItem[] = [
    {
        id: "1",
        name: "United Kingdom",
        code: "GB",
        isDeleted: false,
    },
    {
        id: "2",
        name: "Germany",
        code: "DE",
        isDeleted: false,
    },
    {
        id: "3",
        name: "France",
        code: "FR",
        isDeleted: false,
    },
    {
        id: "4",
        name: "Spain",
        code: "ES",
        isDeleted: false,
    },
    {
        id: "5",
        name: "Italy",
        code: "IT",
        isDeleted: false,
    },
    {
        id: "6",
        name: "Netherlands",
        code: "NL",
        isDeleted: false,
    },
    {
        id: "7",
        name: "Belgium",
        code: "BE",
        isDeleted: false,
    },
    {
        id: "8",
        name: "Poland",
        code: "PL",
        isDeleted: false,
    },
    {
        id: "9",
        name: "Sweden",
        code: "SE",
        isDeleted: false,
    },
    {
        id: "10",
        name: "Austria",
        code: "AT",
        isDeleted: false,
    },
    {
        id: "11",
        name: "Denmark",
        code: "DK",
        isDeleted: false,
    },
    {
        id: "12",
        name: "Norway",
        code: "NO",
        isDeleted: false,
    },
    {
        id: "13",
        name: "Switzerland",
        code: "CH",
        isDeleted: false,
    },
    {
        id: "14",
        name: "Ireland",
        code: "IE",
        isDeleted: false,
    },
    {
        id: "15",
        name: "Portugal",
        code: "PT",
        isDeleted: false,
    },
];

