
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI4NGIzM2ZiNDM0MWI4NzI0ODg1ZWQiLCJlbWFpbCI6ImVkdWFyZG8ucmV5ZXNzdWF6b0BnbWFpbC5jb20iLCJyb2xlcyI6WyJwdWJsaWMiXSwiaWF0IjoxNjgxMDQ4MjM5LCJleHAiOjE2ODExMzQ2Mzl9.L_OTMw0L_b4XYKu9YQVmpR5BrmfEU9FGxEsunnWJ24Y"


export const NewEmpresa = (Name: string, user: string) => {

    const datos = {        
        "nombre": Name,
        "status": "Activo",
        "tipo": 0,
        "user": user
    }
    console.log(JSON.stringify(datos));
    return fetch('http://localhost:3001/empresas/new', {
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
            console.log('Datos enviados:', data);            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


export const UpdateEmpresa = (Name: string, id: string) => {
    const datos = {
        "nombre": Name
    }
    console.log(JSON.stringify(datos));
    return fetch('http://localhost:3001/empresas/updEmp/?id=' + id, {
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
            console.log('Datos enviados:', data);            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

