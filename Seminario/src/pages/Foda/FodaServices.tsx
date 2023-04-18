const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM1YzZlYTA3YTc4ZWNiNTdhZDg1NmEiLCJlbWFpbCI6ImxpYW5hVmlsbGF0b3JvQGdtYWlsLmNvbSIsInVzZXIiOiJMaWFuYSIsInJvbGVzIjpbInB1YmxpYyJdLCJpYXQiOjE2ODEyNDc5ODAsImV4cCI6MTY4MTMzNDM4MH0.nJb57jlIsnmhsQZyugQHJbHgAYvBLpnRcQb-Jb4vKL4";

export const getFodaEntrysAll = async () => {
  const url = 'http://localhost:3001/fodaEntrys/all';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: '89393c34-e984-4376-83b8-6a94c708731e',
      Authorization: JWT,
    }
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export const getFodaAll = async () => {
  const url = 'http://localhost:3001/Foda/FodaAll/?user=Tato';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: '89393c34-e984-4376-83b8-6a94c708731e',
      Authorization: JWT,
    }
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export const NewFodaEntry = (descripcion: string, empresa: any, foda: string) => {
  const datos = {
    "id": "",
    "foda": foda,    
    "descripcion": descripcion,
    "tipo": "N",
    "categorias": {},
    "valoracion": 0,
    "observacion": "N/D",
  }
  console.log(JSON.stringify(datos));
  fetch('http://localhost:3001/fodaEntrys/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: '89393c34-e984-4376-83b8-6a94c708731e',
      Authorization: JWT,
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
      // console.log('Datos enviados:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export const UpdateFodaEntry = (tipo: string, id: any) => {
  const datos = {
    "id": "",
    "tipo": tipo
  }
  console.log(JSON.stringify(datos));
  fetch('http://localhost:3001/FodaEntrys/updType/?id=' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: '89393c34-e984-4376-83b8-6a94c708731e',
      Authorization: JWT,
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
      // console.log('Datos enviados:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


export const Delete = (id: any) => {
  fetch('http://localhost:3001/FodaEntrys/del/?id=' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      apikey: '89393c34-e984-4376-83b8-6a94c708731e',
      Authorization: JWT,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos Eliminados:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}