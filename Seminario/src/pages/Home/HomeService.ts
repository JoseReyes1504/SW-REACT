const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI4NGIzM2ZiNDM0MWI4NzI0ODg1ZWQiLCJlbWFpbCI6ImVkdWFyZG8ucmV5ZXNzdWF6b0BnbWFpbC5jb20iLCJyb2xlcyI6WyJwdWJsaWMiXSwiaWF0IjoxNjgxMDQ4MjM5LCJleHAiOjE2ODExMzQ2Mzl9.L_OTMw0L_b4XYKu9YQVmpR5BrmfEU9FGxEsunnWJ24Y"


export const getHomeData = async () => {
  const url = 'http://localhost:3001/empresas/all';
  const response = await fetch(url, {
    method: 'GET', 
    headers: {
      apikey: '89393c34-e984-4376-83b8-6a94c708731e',
      Authorization: JWT
    }
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}
