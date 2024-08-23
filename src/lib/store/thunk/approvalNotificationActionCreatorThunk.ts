import Interceptor from "./axios";


const initialState = {
  data: null,
  loading: false,
  error: null,
};


// Generic API utility function
export const apiRequest = (method, url, data = null) => {
  console.log(method, url, data);
  return Interceptor({
    method,
    url,
    data
  });
};


export const requestAction = (type) => () => ({
  type,
});

export const successAction = (type) => (data) => ({
  type,
  payload: data,
});

export const failureAction = (type) => (error) => ({
  type,
  payload: error,
});



export const createNotiApprovalAPIThunk = (requestType, successType, failureType) => {
  return (method, url, data = null) => {
    return (dispatch) => {
      const request = requestAction(requestType);
      const success = successAction(successType);
      const failure = failureAction(failureType);

      dispatch(request());

      return apiRequest(method, url, data)
        .then((response) => {
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(error.message));
        });
    };
  };
}



export const APPROVAL_NOTIFICATION_REQUEST = 'APPROVAL_NOTIFICATION_REQUEST';
export const APPROVAL_NOTIFICATION_SUCCESS = 'APPROVAL_NOTIFICATION_SUCCESS';
export const APPROVAL_NOTIFICATION_FAILURE = 'APPROVAL_NOTIFICATION_FAILURE';


const approvalNotificationApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPROVAL_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case APPROVAL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case APPROVAL_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default approvalNotificationApiReducer;
