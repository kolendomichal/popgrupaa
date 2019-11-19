import types from './sessionTypes';

const setSession = (session) => ({
    type: types.SET_SESSION,
    payload: session
});

export default {
    setSession
}