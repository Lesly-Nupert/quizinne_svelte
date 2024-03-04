<script>
   // Import de la variable réactive "searchRecipe" depuis le store, elle permet la mise à jour synchrone dans différents composants (SearchRecipe + RecipesFilter)
  import { searchRecipe } from "../store";
  import { link } from "svelte-spa-router";

  async function resultsSearch() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}recipes/title/${$searchRecipe}`
      );
      if (response.ok) {
        const recipes = await response.json();
        console.log(recipes);
        return recipes;
      } else {
        console.error("Erreur lors de la récupération des recettes filtrées");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }
</script>

<h1>RECHERCHE FILTRÉE</h1>

<section class="container_cards_recipes">
  {#await resultsSearch()}
    <p>Chargement des recettes</p>
  {:then recipes}
    {#each recipes as recipe}
      <a
        title={recipe.title}
        aria-label={`Accès aux détails de la recette dont le nom est : ${recipe.title}`}
        href={`/recipes/${recipe.id_recipe}`}
        use:link
        class="cards_recipes"
      >
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}${recipe.image}`}
          alt={`Photo de ${recipe.title}`}
          class="img_card"
        />
        <p class="p_category">{recipe.category}</p>
        <p class="p_title">{recipe.title}</p>
      </a>
    {/each}
  {/await}
</section>
