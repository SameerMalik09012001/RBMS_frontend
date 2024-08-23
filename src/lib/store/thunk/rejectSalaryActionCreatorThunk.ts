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



export const createRejectSalaryAPIThunk = (requestType, successType, failureType) => {
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



export const REJECT_SALARY_REQUEST = 'REJECT_SALARY_REQUEST';
export const REJECT_SALARY_SUCCESS = 'REJECT_SALARY_SUCCESS';
export const REJECT_SALARY_FAILURE = 'REJECT_SALARY_FAILURE';

const rejectSalaryApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case REJECT_SALARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case REJECT_SALARY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case REJECT_SALARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default rejectSalaryApiReducer;
