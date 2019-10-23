export const createRequestAction = (object) => {
  const serverUrl = 'http://localhost:8080'; // fixme put serverUrl here
  return createRequest(object, serverUrl);
};
const createRequest = ({url, method, body, successHandler}, server) => {
  const headers = method === "POST" ? {'Content-Type': 'application/json'} : {};
  const param = {
    method,
    headers,
    body: JSON.stringify(body)
  };

  return (dispatch) => fetch(server + url, param).then(response => response.json())
    .then(json => dispatch(successHandler(json))).catch(err => alert(err));
};