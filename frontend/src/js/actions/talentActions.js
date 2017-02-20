/* global firebase*/
let subscribed = false;
export const subscribeTalents = () => {
  return (dispatch) => {
    if (!subscribed) {
      subscribed = true;
      let talentRef = firebase.database().ref('talents');
      talentRef.once('value').then((snapshot) => {
        let talents = snapshot.val();
        const talentArray = [];
        for (let talentKey in talents) {
          let talent = talents[talentKey];
          talentArray.push({
            id: talentKey,
            ...talent
          });
        }
        dispatch({
          type: 'GOT_TALENTS',
          payload: talentArray
        });
        talentRef.on('child_added', (snapshot) => {
          dispatch({
            type: 'GOT_TALENT',
            payload: {
              ...snapshot.val(),
              id: snapshot.key}
          });
        });
      });
    }
  };
};
