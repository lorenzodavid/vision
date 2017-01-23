const initial = {
  talents: []
};
export const talentsReducer =
  (state = initial, action) => {
    switch (action.type) {
      case 'GOT_TALENT': {
        return {
          ...state,
          talents: state.talents.concat([action.payload])
        };
      }
      default: {
        return state;
      }
    }
  };
export default talentsReducer;
