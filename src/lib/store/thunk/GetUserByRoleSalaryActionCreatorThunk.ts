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



export const createGetUserByRoleAPIThunk = (requestType, successType, failureType) => {
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



export const GET_USER_BY_ROLE_REQUEST = 'GET_USER_BY_ROLE_REQUEST';
export const GET_USER_BY_ROLE_SUCCESS = 'GET_USER_BY_ROLE_SUCCESS';
export const GET_USER_BY_ROLE_FAILURE = 'GET_USER_BY_ROLE_FAILURE';


const getUserByRoleSalaryApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_USER_BY_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case GET_USER_BY_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default getUserByRoleSalaryApiReducer;
