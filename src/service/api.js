import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    function(config) {
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        // stop global loader here
        return processResponse(response);
    },
    function(error) {
        // stop global loader here
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg || 'An error occurred',
            code: response?.code || 0,
        };
    }
};

const processError = (error) => {
    if (error.response) {
        // Request made and server responded with a status other than 2xx
        console.error('Error in response:', error.response);

        return {
            isError: true,
            msg: error.response.data.error || API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status,
        };
    } else if (error.request) {
        // Request made but no response was received
        console.error('Error in request:', error.request);

        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: 0,
        };
    } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error in network:', error.message);

        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: 0,
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },
        });
}

export { API };
