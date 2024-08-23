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

export const resetUpdateSalaryState = () => ({
  type: RESET_UPDATE_SALARY_STATE,
});


export const createUpdateSalaryTempAPIThunk = (requestType, successType, failureType) => {
  return (method, url, data = null) => {
    return (dispatch) => {
      const request = requestAction(requestType);
      const success = successAction(successType);
      const failure = failureAction(failureType);

      dispatch(request());

      return apiRequest(method, url, data)
        .then((response) => {
          console.log(response.data);
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(error?.response?.data));
        });
    };
  };
}



export const UPDATE_SALARY_REQUEST = 'UPDATE_SALARY_REQUEST';
export const UPDATE_SALARY_SUCCESS = 'UPDATE_SALARY_SUCCESS';
export const UPDATE_SALARY_FAILURE = 'UPDATE_SALARY_FAILURE';
export const RESET_UPDATE_SALARY_STATE = 'RESET_UPDATE_SALARY_STATE';


const updateSalaryTempApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SALARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_SALARY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case UPDATE_SALARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

      case RESET_UPDATE_SALARY_STATE:
      return {
        data: null,
        loading: false,
        error: null
      };


    default:
      return state;
  }
};

export default updateSalaryTempApiReducer;
