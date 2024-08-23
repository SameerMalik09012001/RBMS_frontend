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



export const createLogoutAPIThunk = (requestType, successType, failureType) => {
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



export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const RESET_LOGOUT_STATE = 'RESET_LOGOUT_STATE';

export const resetLogoutState = () => ({
  type: RESET_LOGOUT_STATE,
});

const logoutApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case RESET_LOGOUT_STATE:
      return {
        data: null,
        loading: false,
        error: null
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default logoutApiReducer;
