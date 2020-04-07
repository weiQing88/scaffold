
 const demo2 = ( state = {}, action ) => {
    switch( action.type ){
        case 'DO_NOT' : return { ...state, text : action.text };
        default : return state
    }
}
export default demo2