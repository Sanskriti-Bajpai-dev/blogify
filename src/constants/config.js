// API_NOTIFICATION_MESSAGES
export const  API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, Please wait'
    },
    success: {
        title: 'Success',
        message: "Data successfully loaded"
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetcing response for the server'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured wjile parsing request data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server. Please check the connectivity'
    }
}

// API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVOCE CALL : { url: '/', method: 'POST/GET/PUT/DELETE' params: true/false, query: true/false}
export const SERVICE_URLS = {
    userSignup: {url: '/signup', method: 'POST'}
} 