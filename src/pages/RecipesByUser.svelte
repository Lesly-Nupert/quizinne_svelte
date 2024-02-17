<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Fonction pour charger toutes les recettes
    async function getRecipes() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/user/${userId}`,
            );
            // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}recipes/user/5`);

            if (response.ok) {
                const recipes = await response.json();
                console.log(recipes);
                return recipes;
            } else {
                console.error("Erreur lors de la récupération des recettes");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

{#if token && userId}
<h1>MES RECETTES</h1>

<section class="container_cards_recipes">
    {#await getRecipes()}
        <p>Chargement des recettes</p>
    {:then recipes}
        {#each recipes as recipe}
            <a  title={recipe.title}
                aria-label={`Accès aux détails de la recette dont le nom est : ${recipe.title}`}
                href={`/recipes/${recipe.id_recipe}`}
                use:link
                class="cards_recipes"
            >
                <img
                    src={`http://localhost:3000/${recipe.image}`}
                    alt={`Photo de ${recipe.title}`}
                    class="img_card"
                />
                <p class="p_category">{recipe.category}</p>
                <p class="p_title">{recipe.title}</p>
            </a>
        {/each}
    {/await}
</section>
{/if}

