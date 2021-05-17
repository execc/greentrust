export const query = (queryString, token) => {
  return fetch(`/api/query?${queryString}`, {  
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
}