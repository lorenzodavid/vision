const initialData = {
  user: null,
  clients: []
};
export const userReducer =
  (state = initialData, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return {
          ...state,
          user: action.payload
        };
      }
      case 'CURRENT_USER_DETECTED': {
        return {
          ...state,
          user: action.payload
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
