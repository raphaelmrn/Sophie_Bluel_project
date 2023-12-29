
export async function fetchWorksData() {
  const worksEndpoint = 'http://localhost:5678/api/works';

  try {
    const worksResponse = await fetch(worksEndpoint);

    if (!worksResponse.ok) {
      throw new Error(`Erreur HTTP lors de la récupération des œuvres! Statut: ${worksResponse.status}`);
    }

    const worksData = await worksResponse.json();
    return worksData;
  } catch (error) {
    console.error('Erreur lors de la requête API pour les œuvres:', error.message);
    throw error;
  }
}

export async function fetchCategoriesData() {
  const categoriesEndpoint = 'http://localhost:5678/api/categories';

  try {
    const categoriesResponse = await fetch(categoriesEndpoint);

    if (!categoriesResponse.ok) {
      throw new Error(`Erreur HTTP lors de la récupération des catégories! Statut: ${categoriesResponse.status}`);
    }

    const categoriesData = await categoriesResponse.json();
    return categoriesData;
  } catch (error) {
    console.error('Erreur lors de la requête API pour les catégories:', error.message);
    throw error;
  }
}