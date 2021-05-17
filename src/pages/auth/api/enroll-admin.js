const payload = {
  "password": "adminpw",
  "org": "org1",
  "msp": "Org1MSP",
}

export const enrollAdmin = () => {
  return fetch('api/public/enrollAdmin', {  
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}