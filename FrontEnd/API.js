const apiUrl = "http://localhost:5678/api/";

export async function fetchData(endpoint) {
  try {
    const response = await fetch(apiUrl + endpoint);

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP lors de la récupération des données! Statut: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Erreur lors de la requête API pour ${endpoint}:`,
      error.message
    );
    throw error;
  }
}

export async function fetchWorksData() {
  return fetchData("works");
}

export async function fetchCategoriesData() {
  return fetchData("categories");
}

export function tokenStorage(token) {
  sessionStorage.setItem("authToken", token);
}
