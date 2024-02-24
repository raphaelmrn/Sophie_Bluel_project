
const apiUrl = 'http://localhost:5678/api/';

export async function fetchData(endpoint) {
  try {
    const response = await fetch(apiUrl + endpoint);

    if (!response.ok) {
      throw new Error(`Erreur HTTP lors de la récupération des données! Statut: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la requête API pour ${endpoint}:`, error.message);
    throw error;
  }
}

export async function fetchWorksData() {
  return fetchData('works');
}

export async function fetchCategoriesData() {
  return fetchData('categories');
}


export async function storeApiDelete(id, requestURL, headers) {

  const apiDelete = {
    id: id,
    requestURL: requestURL,
    headers: headers,
  };

  const apiDeleteString = JSON.stringify(apiDelete);

  sessionStorage.setItem('apiDelete', apiDeleteString);
}

export async function getApiDelete() {
  
  const apiDeleteString = sessionStorage.getItem('apiDelete');

  if (apiDeleteString) {
    const apiDelete = JSON.parse(apiDeleteString);
    return apiDelete;
  } else {
    return null;
  }
}

storeApiDelete(1, 'http://localhost:5678/api/works/1', {
  accept: '*/*',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
});

const apiDelete = getApiDelete();
console.log(apiDelete);