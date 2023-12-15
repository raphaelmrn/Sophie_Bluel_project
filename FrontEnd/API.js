export const API_URL = 'http://localhost:5678/api/works'

export async function customFetch(route, method = "GET", body = {}) {
  const result = await fetch(API_URL + route, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json())
    .then(res => res)
    return result;
}
export async function getData(route) {
  const result = await customFetch(route, "GET");
  return result;
}