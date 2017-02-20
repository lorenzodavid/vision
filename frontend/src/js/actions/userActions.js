/* global firebase, console*/
import { browserHistory } from 'react-router';

export const getCurrentUser = () => {
  return (dispatch) => {
    let user = firebase.auth().currentUser;
    dispatch({
      type: 'CURRENT_USER_DETECTED',
      payload: user
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    firebase.auth().signOut().then(
      () => {
        dispatch({
          type: 'LOGOUT',
          payload: null
        });
        // remove all firebase local db and all in memory store
        location.href = '/';
      },
      (error) => {
        dispatch({
          type: 'LOGOUT_FAIL',
          payload: error
        });
      }
    );
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
      dispatch({
        type: 'LOGIN_FAIL',
        payload: {
          error
        }
      });
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
