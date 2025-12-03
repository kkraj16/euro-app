/**
 * COUNTRY MODULE - USAGE EXAMPLES
 *
 * This file demonstrates how to use the centralized Country master data
 * in your React components. The country data is loaded once during app
 * initialization and cached in Redux store.
 *
 * IMPORTANT: This is a READ-ONLY module. No create/edit/delete operations.
 */

import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { selectCountryList, selectCountryLoading } from "./country.slice";

// ============================================
// EXAMPLE 1: Using Countries in a Dropdown
// ============================================
const CountryDropdownExample = () => {
  const countries = useSelector(selectCountryList);
  const loading = useSelector(selectCountryLoading);

  // Transform countries for react-select
  const countryOptions = countries.map((country: any) => ({
    label: country.name,
    value: country.id,
  }));

  return (
    <div className="mb-3">
      <label className="form-label">Country</label>
      <Select
        options={countryOptions}
        placeholder={loading ? "Loading countries..." : "Select country"}
        isLoading={loading}
        classNamePrefix="select2-selection form-select"
      />
    </div>
  );
};

// ============================================
// EXAMPLE 2: Using with Formik in Create Form
// ============================================
import { useFormik } from "formik";
import * as Yup from "yup";

const SiteCreateWithCountryExample = () => {
  const countries = useSelector(selectCountryList);

  const validation = useFormik({
    initialValues: {
      siteName: "",
      address: "",
      countryId: "",
    },
    validationSchema: Yup.object({
      siteName: Yup.string().required("Please enter site name"),
      address: Yup.string().required("Please enter address"),
      countryId: Yup.string().required("Please select country"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
      // Submit to API
    },
  });

  // Transform countries for react-select
  const countryOptions = [
    {
      options: countries.map((country: any) => ({
        label: country.name,
        value: country.id,
      })),
    },
  ];

  return (
    <form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          Country <span className="text-danger">*</span>
        </label>
        <Select
          value={
            countryOptions[0]?.options.find(
              (option: any) => option.value === validation.values.countryId
            ) || null
          }
          onChange={(selectedOption: any) => {
            validation.setFieldValue("countryId", selectedOption?.value || "");
          }}
          options={countryOptions}
          placeholder="Select country"
          classNamePrefix="select2-selection form-select"
        />
        {validation.errors.countryId && validation.touched.countryId ? (
          <div className="invalid-feedback d-block">
            {String(validation.errors.countryId)}
          </div>
        ) : null}
      </div>
    </form>
  );
};

// ============================================
// EXAMPLE 3: Display Country Name in View Page
// ============================================
import { selectCountryById } from "./country.slice";

const SiteViewWithCountryExample = ({ siteData }: any) => {
  // Get country by ID from Redux store
  const country = useSelector((state: any) =>
    selectCountryById(state, siteData.countryId)
  );

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label fw-bold">Site Name</label>
          <p>{siteData.siteName}</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label fw-bold">Country</label>
          <p>{country?.name || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXAMPLE 4: Using in Edit Form (Pre-populated)
// ============================================
const SiteEditWithCountryExample = ({ siteData }: any) => {
  const countries = useSelector(selectCountryList);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      siteName: siteData.siteName || "",
      address: siteData.address || "",
      countryId: siteData.countryId || "", // Pre-populated from existing data
    },
    validationSchema: Yup.object({
      siteName: Yup.string().required("Please enter site name"),
      countryId: Yup.string().required("Please select country"),
    }),
    onSubmit: (values) => {
      console.log("Updated values:", values);
      // Update API call
    },
  });

  const countryOptions = [
    {
      options: countries.map((country: any) => ({
        label: country.name,
        value: country.id,
      })),
    },
  ];

  return (
    <form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          Country <span className="text-danger">*</span>
        </label>
        <Select
          value={
            countryOptions[0]?.options.find(
              (option: any) => option.value === validation.values.countryId
            ) || null
          }
          onChange={(selectedOption: any) => {
            validation.setFieldValue("countryId", selectedOption?.value || "");
          }}
          options={countryOptions}
          placeholder="Select country"
          classNamePrefix="select2-selection form-select"
        />
        {validation.errors.countryId && validation.touched.countryId ? (
          <div className="invalid-feedback d-block">
            {String(validation.errors.countryId)}
          </div>
        ) : null}
      </div>
    </form>
  );
};

// ============================================
// EXAMPLE 5: Display Country Code & Name
// ============================================
const CountryDisplayExample = ({ countryId }: any) => {
  const country = useSelector((state: any) =>
    selectCountryById(state, countryId)
  );

  if (!country) return <span>N/A</span>;

  return (
    <span>
      <strong>{country.code}</strong> - {country.name}
    </span>
  );
};

// ============================================
// EXAMPLE 6: Filter Countries by Name/Code
// ============================================
const CountryFilterExample = () => {
  const countries = useSelector(selectCountryList);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCountries = countries.filter(
    (country: any) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      <ul>
        {filteredCountries.map((country: any) => (
          <li key={country.id}>
            {country.code} - {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================
// IMPORTANT NOTES:
// ============================================
/**
 * 1. NO API CALLS IN COMPONENTS
 *    - Never call the API directly from components
 *    - Use useSelector() to read from Redux store
 *
 * 2. DATA IS LOADED ON APP START
 *    - Countries are fetched once during app initialization
 *    - Available globally throughout the app
 *    - No need to re-fetch
 *
 * 3. READ-ONLY MODULE
 *    - No create, update, or delete operations
 *    - Only GET operation is supported
 *
 * 4. REDUX SELECTORS AVAILABLE
 *    - selectCountryList: Get all countries
 *    - selectCountryById: Get specific country by ID
 *    - selectCountryLoading: Check loading state
 *    - selectCountryError: Get error message
 *
 * 5. USAGE IN DIFFERENT MODULES
 *    - Leads: For lead location
 *    - Sites: For site address
 *    - Clients: For client headquarters location
 *    - Staff: For staff nationality/location
 *    - Any address form across the app
 */

export {
  CountryDropdownExample,
  SiteCreateWithCountryExample,
  SiteViewWithCountryExample,
  SiteEditWithCountryExample,
  CountryDisplayExample,
  CountryFilterExample,
};
