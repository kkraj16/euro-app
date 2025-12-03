import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";

const { api } = config;

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// Initialize token from storage
const getAuthToken = () => {
  const authUser = localStorage.getItem("authUser") || sessionStorage.getItem("authUser");
  if (authUser) {
    try {
      const user = JSON.parse(authUser);
      return user.token || user.jwt || null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const token = getAuthToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

// Request interceptor to attach token dynamically
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response?.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        // Clear auth and redirect to login
        sessionStorage.removeItem("authUser");
        localStorage.removeItem("authUser");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: any) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: any, params: any) => {
    let response;

    let paramKeys: any = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url: any, data: any) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url: any, data: any) => {
    return axios.patch(url, data);
  };

  put = (url: any, data: any) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user =
    localStorage.getItem("authUser") || sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
