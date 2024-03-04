<script>
   // Import de la variable réactive "searchRecipe" depuis le store, elle permet la mise à jour synchrone dans différents composants (SearchRecipe + RecipesFilter)
  import { searchRecipe } from "../store";

  // Redirection vers la page des résultats de la recherche
  let messageRedirection;

  async function handleSearch() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}recipes/title/${$searchRecipe}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const results = await response.json();
      console.log(results);
      
      messageRedirection =
        "Redirection vers la page des résultats de votre recherche";
      
      // Redirection vers la page des recettes filtrées en fonction de ce qui a été tapé dans la barre de recherche
      setTimeout(() => {
        window.location.href = "#/RecipesFilter";
      }, 1200);
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }
</script>

<section class="container_search_recipe">
  <form>
    <label for="searchRecipe">Rechercher une recette</label>
    <input
      id="searchRecipe"
      bind:value={$searchRecipe}
      type="search"
      placeholder="Parcourir Quizinne..."
    />
    <input
      on:click={handleSearch}
      type="button"
      value="Rechercher"
      disabled={!$searchRecipe}
    />

    <!-- {#if messageRedirection} -->
      <div class="message_redirection" aria-live="assertive">
        {messageRedirection}
      </div>
    <!-- {/if} -->
  </form>
</section>
