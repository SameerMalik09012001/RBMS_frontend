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



export const createGetByRoleUserAPIThunk = (requestType, successType, failureType) => {
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



export const GET_ROLE_BY_USER_REQUEST = 'GET_ROLE_BY_USER_REQUEST';
export const GET_ROLE_BY_USER_SUCCESS = 'GET_ROLE_BY_USER_SUCCESS';
export const GET_ROLE_BY_USER_FAILURE = 'GET_ROLE_BY_USER_FAILURE';


const getUserByRoleApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLE_BY_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ROLE_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case GET_ROLE_BY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default getUserByRoleApiReducer;
