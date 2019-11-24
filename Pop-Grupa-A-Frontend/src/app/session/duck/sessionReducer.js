import types from './sessionTypes';

const INITIAL_STATE = {
    session: undefined
};

const sessionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.SET_SESSION:
            return {...state, session: action.payload};
        default : return state;
    }
};

export default sessionReducer;