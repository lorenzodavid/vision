/* global firebase*/
export const subscribeTalents = () => {
  return (dispatch) => {
    let talentRef = firebase.database().ref('talents');
    talentRef.on('child_added', function (snapshot) {
      dispatch({type: 'GOT_TALENT', payload: snapshot});
    });
  };
};
