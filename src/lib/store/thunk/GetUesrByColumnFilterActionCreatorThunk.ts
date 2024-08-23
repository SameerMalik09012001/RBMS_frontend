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



export const createColumnFilterAPIThunk = (requestType, successType, failureType) => {
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



export const BY_COLUMN_FILTER_REQUEST = 'BY_COLUMN_FILTER_REQUEST';
export const BY_COLUMN_FILTER_SUCCESS = 'BY_COLUMN_FILTER_SUCCESS';
export const BY_COLUMN_FILTER_FAILURE = 'BY_COLUMN_FILTER_FAILURE';

const getUserByColumnFilterApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case BY_COLUMN_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case BY_COLUMN_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case BY_COLUMN_FILTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default getUserByColumnFilterApiReducer;
