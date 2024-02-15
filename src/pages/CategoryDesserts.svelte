<script>
    import { link } from "svelte-spa-router";

    // Fonction pour charger les recettes, catégorie = Desserts
    async function getRecipes() {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL + "recipes/category/Desserts",
            );
            if (response.ok) {
                const recipes = await response.json();
                console.log(recipes);
                return recipes;
            } else {
                console.error(
                    "Erreur lors de la récupération des recettes par catégorie",
                );
            }
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des recettes par catégorie : ",
                error,
            );
        }
    }
</script>

<div class="title_category">
    <h1>Catégorie : Desserts</h1>
</div>

<!-- <div class="select_category">
    <a href="/recipes/category/entries" use:link>Entrées</a>
    <a href="/recipes/category/dishes" use:link>Plats</a>
    <a href="/recipes/category/desserts" use:link>Desserts</a>
    <a href="/recipes/category/drinks" use:link>Boissons</a>
</div> -->

<div class="container_cards_recipes">
    {#await getRecipes()}
        <p>Chargement des cartes de recettes</p>
    {:then recipes}
        {#each recipes as recipe}
            <a
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
</div>

<style>
    .title_category {
        text-align: center;
    }

    img {
        width: 50px;
        text-align: center;
    }

    .container_cards_recipes {
        max-width: 1050px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 50px;
        box-sizing: border-box; 
    }

    h1 {
        text-align: center;
        margin-top: 50px;
        font-size: 48px;
        display: inline-block;
    }

    .select_category {
        text-align: center;
        margin-top: 30px;
        font-weight: bold;
    }

    .select_category a {
        font-size: 16px;
        font-weight: bold;
        color: darkred;
        padding: 5px;
    }

    .cards_recipes {
        text-decoration: none;
        width: 310px;
        height: 315px;
        overflow: hidden;
        text-align: center;
        box-shadow: 1px 1px 1px 2px #5B59C7;
        border-radius: 5px;
        box-sizing: border-box;
        margin: 20px 20px;
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

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 768px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 36px;
        }
    }

    @media screen and (max-width: 500px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 24px;
        }
    }
</style>
