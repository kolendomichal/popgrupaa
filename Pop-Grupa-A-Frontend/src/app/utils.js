export const createRequestAction = (object) => {
    const serverUrl = 'http://localhost:5000'; // fixme put serverUrl here
    return createRequest(object, serverUrl);
};
const createRequest = ({types, url, method, body, successHandler}, server) => {
    const headers = method === "POST" ? {'Content-Type': 'application/json'} : {};
    const param = {
        method,
        headers,
        body: JSON.stringify(body),
        credentials: 'include'
    };

    return {
        types,
        payload: fetch(server + url, param),
        fetchAction: true,
        successHandler: successHandler
    };
};

export const createFetchActionTypes = (type) => {
    return {
        BASE: `${type}_BASE`,
        PENDING: `${type}_PENDING`,
        FULFILLED: `${type}_FULFILLED`,
        REJECTED: `${type}_REJECTED`,
    }
};