export const Login = (email: string, password: string) => {
  const datos = {
    "email": email,
    "password": password
  }
  // console.log(JSON.stringify(datos));
  return fetch('http://localhost:3001/security/signon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: '0273f8f2-4a8e-4fbf-9438-b1dcbddf4f52',
    },
    body: JSON.stringify(datos)
  })
    .then(response => {           
      return response.json();
    })
    .then(data => {      
      // console.log(data);
      return data;      
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export const SignIn = (email: string, password: string, user: string) => {
  const datos = {
    "email": email,
    "password": password,
    "user": user
  }
  // console.log(JSON.stringify(datos));
   fetch('http://localhost:3001/security/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: '0273f8f2-4a8e-4fbf-9438-b1dcbddf4f52',
    },
    body: JSON.stringify(datos)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos recibidos:', data);                 
    })
    .catch(error => {
      console.error('Error:', error);
    });
}