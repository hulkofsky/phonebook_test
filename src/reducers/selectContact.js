const initialState = '';

export default function selectContact(state = initialState, action) {
    if(action.type === 'SELECT_CONTACT') {
        return action.payload;
    };
    return state;
}