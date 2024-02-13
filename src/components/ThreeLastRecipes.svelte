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
            console.error(
                "Erreur lors de la récupération des 3 dernières recettes : ",
                error,
            );
        }
    }
</script>

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

<style>
    .cards_recipes {
        text-decoration: none;
        width: 310px;
        height: 300px;
        overflow: hidden;
        text-align: center;
        margin-top: 30px;
        box-shadow: 1px 1px 1px 2px #5B59C7;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .cards_recipes:hover {
        box-shadow: 5px 5px 5px 5px #5B59C7;
    }

    .cards_recipes img {
        width: 100%;
        height: 70%;
        object-fit: cover;
    }

    .p_category {
        font-size: 16px;
        font-weight: bold;
        color: darkred;
        margin: 10px;
    }

    .p_category::first-letter {
        text-transform: uppercase;
    }

    .p_title {
        font-size: 20px;
        font-weight: bold;
        color: black;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        padding: 0px 10px;
    }

    .p_title::first-letter {
        text-transform: uppercase;
    }
</style>
