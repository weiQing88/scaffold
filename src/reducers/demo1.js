
 const demo1 = ( state = {}, action ) => {
      switch( action.type ){
          case 'TEST_ACTION' : return { ...state, text : action.text };
          default : return state
      }
}
export default demo1