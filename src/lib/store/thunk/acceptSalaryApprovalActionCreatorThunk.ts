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



export const createAcceptSalaryApprovalAPIThunk = (requestType, successType, failureType) => {
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



export const ACCEPT_SALARY_APPROVAL_REQUEST = 'ACCEPT_SALARY_APPROVAL_REQUEST';
export const ACCEPT_SALARY_APPROVAL_SUCCESS = 'ACCEPT_SALARY_APPROVAL_SUCCESS';
export const ACCEPT_SALARY_APPROVAL_FAILURE = 'ACCEPT_SALARY_APPROVAL_FAILURE';

const acceptSalaryApprovalApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_SALARY_APPROVAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ACCEPT_SALARY_APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case ACCEPT_SALARY_APPROVAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default acceptSalaryApprovalApiReducer;
