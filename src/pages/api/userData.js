export const userData = (payload) => {
  return fetch('api/public/auth', {  
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}