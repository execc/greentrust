export const adminUser = (payload, token) => {
  return fetch('api/admin/user', {  
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ password: payload.password, "name": payload.login, "org": "org1", "msp": "Org1MSP" })
  });
}