export const trading = (token) => {
  return fetch(`/api/query?code=CertSM&status=Trading`, {  
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
}