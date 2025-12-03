/**
 * Branding Constants
 * Centralized configuration for all branding values used throughout the application
 */

export const APP_NAME = "EURO";
export const COMPANY_NAME = "K.K Rajpurohit";
export const APP_TAGLINE =
  "EURO Scaffold & Equipment Rental Services Management System";

// Page titles
export const PAGE_TITLES = {
  dashboard: `Dashboard | ${APP_NAME} - ${APP_TAGLINE}`,
  login: `Basic SignIn | ${APP_NAME} - ${APP_TAGLINE}`,
  profile: `Profile | ${APP_NAME} - ${APP_TAGLINE}`,
  resetPassword: `Reset Password | ${APP_NAME} - ${APP_TAGLINE}`,
  error404Basic: `404 Error Basic | ${APP_NAME} - ${APP_TAGLINE}`,
  error404Cover: `404 Error Cover | ${APP_NAME} - ${APP_TAGLINE}`,
  error404Alt: `404 Error Alt | ${APP_NAME} - ${APP_TAGLINE}`,
  error500: `500 Error | ${APP_NAME} - ${APP_TAGLINE}`,
  offline: `Offline Page | ${APP_NAME} - ${APP_TAGLINE}`,
};

// Email domains
export const ADMIN_EMAIL = "admin@naxdc.com";

// External URLs
export const COMPANY_WEBSITE = "https://naxdc.com/";
export const EXTERNAL_ASSETS_URL = "https://img.naxdc.com/euro";

// Footer text
export const FOOTER_TEXT = `${new Date().getFullYear()} © ${APP_NAME}`;
export const FOOTER_CREDIT = `Design & Develop by ${COMPANY_NAME}`;

// Authentication messages
export const AUTH_MESSAGES = {
  loginWelcome: `Sign in to continue to ${APP_NAME}.`,
  resetPassword: `Reset password with ${APP_NAME.toLowerCase()}`,
  copyright: `© ${new Date().getFullYear()} ${APP_NAME}. Crafted with`,
};
