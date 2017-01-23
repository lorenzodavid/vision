/* global firebase, console*/
export const getCurrentUser = () => {
  return (dispatch) => {
    let user = firebase.auth().currentUser;
    dispatch({
      type: 'CURRENT_USER_DETECTED',
      payload: user
    });
  };
};
export const loginUserAction = (username, password) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
      let user = firebase.auth().currentUser;
      if (user) {
        console.log('yeah');
        dispatch({
          type: 'LOGIN',
          payload: user
        });
      }
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log('FAIL' + errorCode + ' ' + errorMessage);
    });
  };
};
export const getUsers = () => {
  return (dispatch) => {
    let clientRef = firebase.database().ref('users');
    // TODO do it on child delete
    clientRef.on('child_added', function (snapshot) {
      dispatch({
        type: 'GOT_USER',
        payload: {
          id: snapshot.key,
          user: snapshot.val()
        }
      });
    });
  };
};
