<script>
    import { link } from "svelte-spa-router";

    // Fonction pour charger les cartes des 3 dernières recettes qui sont sur la page d'accueil du site.
    async function getRecipes() {
        try {
            const response = await fetch(import.meta.env.VITE_API_BASE_URL + "recipesLast",);
            if (response.ok) {
                const recipes = await response.json();
                // console.log(recipes);
                return recipes;
            } else {
                console.error(
                    "Erreur lors de la récupération des 3 dernières recettes",
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

<section class="container_cards_recipes">
{#await getRecipes()}
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


