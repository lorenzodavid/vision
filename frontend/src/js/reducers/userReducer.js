const initialData = {
  user: null,
  clients: [],
  loginError: {
    errorCode: null,
    errorMessage: null
  },
  redirectUrl: null
};
export const userReducer =
  (state = initialData, action) => {
    switch (action.type) {
      case 'SET_USER_REDIRECT': {
        return {
          ...state,
          redirectUrl: action.payload
        };
      }
      case 'LOGOUT': {
        return {
          ...state,
          ...initialData
        };
      }
      case 'LOGIN': {
        return {
          ...state,
          user: action.payload,
          loginError: {
            errorCode: null,
            errorMessage: null
          }
        };
      }
      case 'CURRENT_USER_DETECTED': {
        return {
          ...state,
          user: action.payload
        };
      }
      case 'LOGIN_FAIL': {
        return {
          ...state,
          user: null,
          loginError: {
            errorCode: action.payload.error.code,
            errorMessage: action.payload.error.message
          }
        };
      }
      case 'GOT_USER': {
        return {
          ...state,
          clients: {
            ...state.clients,
            [action.payload.id]: action.payload.user
          }
        };
      }
      default: {
        return state;
      }
    }
  };
export default userReducer;
