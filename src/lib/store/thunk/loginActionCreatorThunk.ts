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




export const createLoginAPIThunk = (requestType, successType, failureType) => {
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
          dispatch(failure(error?.response?.data));
        });
    };
  };
}



export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_LOGIN_STATE = 'RESET_LOGIN_STATE';

export const resetLoginState = () => ({
  type: RESET_LOGIN_STATE,
});

const loginApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case RESET_LOGIN_STATE:
      return {
        data: null,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

export default loginApiReducer;
