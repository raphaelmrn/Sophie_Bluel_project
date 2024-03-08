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

// #TODO vérifier que le token existe avant (req 401) -> done

function tokenStorage(token) {
  sessionStorage.setItem("authToken", token);
}

export async function login(credentials) {
  try {
    const requestURL = apiUrl + "users/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };

    const response = await fetch(requestURL, options);

    if (response.status === 401) {
      console.error("Erreur d'authentification : Identifiants incorrects");
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP lors de la connexion! Statut: ${response.status}`
      );
    }

    const loginData = await response.json();
    tokenStorage(loginData.token);
    return loginData;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
}

export async function deleteElement(workId, authToken) {
  const requestURL = `${apiUrl}works/${workId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  return fetch(requestURL, options);
}
