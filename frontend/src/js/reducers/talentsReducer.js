const initial = {
  talents: []
};
export const talentsReducer =
  (state = initial, action) => {
    switch (action.type) {
      case 'GOT_TALENTS': {
        return {
          ...state,
          talents: action.payload
        };
      }
      case 'GOT_TALENT': {
        return {
          ...state,
          talents: state.talents.concat([action.payload])
        };
      }
      case 'LOGOUT': {
        return {
          ...state,
          ...initial
        };
      }
      default: {
        return state;
      }
    }
  };
export default talentsReducer;
