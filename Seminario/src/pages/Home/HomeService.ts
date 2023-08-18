const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI4NGIzM2ZiNDM0MWI4NzI0ODg1ZWQiLCJlbWFpbCI6ImVkdWFyZG8ucmV5ZXNzdWF6b0BnbWFpbC5jb20iLCJyb2xlcyI6WyJwdWJsaWMiXSwiaWF0IjoxNjgxMDQ4MjM5LCJleHAiOjE2ODExMzQ2Mzl9.L_OTMw0L_b4XYKu9YQVmpR5BrmfEU9FGxEsunnWJ24Y"


export const getHomeData = async () => {
  const url = 'http://localhost:3001/empresas/all';
  const response = await fetch(url, {
    method: 'GET', 
    headers: {
      apikey: '0273f8f2-4a8e-4fbf-9438-b1dcbddf4f52',
      Authorization: JWT
    }
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}
