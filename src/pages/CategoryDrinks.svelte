<script>
  import { link } from "svelte-spa-router";

  // Fonction pour charger les recettes, catégorie = Boissons
  async function getRecipes() {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "recipes/category/Boissons"
      );
      if (response.ok) {
        const recipes = await response.json();
        console.log(recipes);
        return recipes;
      } else {
        console.error(
          "Erreur lors de la récupération des recettes par catégorie"
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des recettes par catégorie : ",
        error
      );
    }
  }
</script>

<main>
  <h1>Catégorie : Boissons</h1>

  <section class="container_cards_recipes">
    {#await getRecipes()}
      <p>Chargement des cartes de recettes</p>
    {:then recipes}
      {#each recipes as recipe}
        <a href={`/recipes/${recipe.id_recipe}`} use:link class="cards_recipes">
          <img
          src={recipe.image}
          alt={recipe.title}
            class="img_card"
          />
          <p class="p_category">{recipe.category}</p>
          <p class="p_title">{recipe.title}</p>
        </a>
      {/each}
    {/await}
  </section>
</main>
