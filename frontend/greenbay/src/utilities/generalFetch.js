async function generalFetch(endpoint, method, bodyData = undefined) {
  
  const requestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (bodyData !== undefined) { requestOptions.body = JSON.stringify(bodyData); }

  const apiUrl= process.env.REACT_APP_API_URL || 'http://localhost:8080/'

  const httpResponse = await fetch(`${apiUrl}${endpoint}`, requestOptions);
  const response = await httpResponse.json();
  return response;

}
export default generalFetch;
