<script>
    // Import de la variable réactive "searchRecipe" depuis le store, elle permet la mise à jour synchrone dans différents composants
    import { searchRecipe  } from '../store';
    
    async function handleSearch() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}recipes/title/${$searchRecipe}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const results = await response.json();
        console.log(results);

        console.log("Recherche effectuée avec succès");

        // Redirection vers la page des recettes filtrées en fonction de ce qui a été tapé dans la barre de recherche
        window.location.href = "#/RecipesFilter";

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
            type="text"
            placeholder="Parcourir Quizine..."
        />
        <input on:click={handleSearch} type="button" value="Rechercher" disabled={!$searchRecipe}  />
    </form>
</section>



