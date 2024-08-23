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



export const createCookieCheckAPIThunk = (requestType, successType, failureType) => {
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



export const CHECK_COOKIE_REQUEST = 'CHECK_COOKIE_REQUEST';
export const CHECK_COOKIE_SUCCESS = 'CHECK_COOKIE_SUCCESS';
export const CHECK_COOKIE_FAILURE = 'CHECK_COOKIE_FAILURE';
export const RESET_CHECK_COOKIE_STATE = 'RESET_LOGIN_STATE';

export const resetCookieCheckState = () => ({
  type: RESET_CHECK_COOKIE_STATE,
});

const cookieCheckApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_COOKIE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CHECK_COOKIE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case CHECK_COOKIE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

      case RESET_CHECK_COOKIE_STATE:
      return {
        data: null,
        loading: false,
        error: null
      };


    default:
      return state;
  }
};

export default cookieCheckApiReducer;