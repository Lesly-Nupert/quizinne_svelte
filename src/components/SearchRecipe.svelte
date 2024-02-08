<script>
    import { link } from "svelte-spa-router";
    // cours Udemy: Svelte 3 et SvelteKit 1.0, formation complète pour débutants

    let searchRecipe = "";
    let recipeTitle = [];

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    // export let params = {};
    // console.log(params.id)

    // TODO: Redirection vers la recette

    async function handleSearch() {
        try {
            const response = await fetch(
                // import.meta.env.VITE_API_BASE_URL + "recipes",
                // import.meta.env.VITE_API_BASE_URL + "recipes/title",
                `${
                    import.meta.env.VITE_API_BASE_URL
                }recipes/title/${searchRecipe}`,
            );
            if (response.ok) {
                recipeTitle = await response.json();
                console.log(recipeTitle);
                // return recipeTitle;

                // window.location.href = `recipes/${recipeTitle.id_recipe}`;
            } else {
                console.error(
                    "Erreur lors de la récupération du titre de la recette",
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }



    
</script>

<div class="container_search_recipe">
    <form on:submit={handleSearch}>
        <label for="searchRecipe">Rechercher une recette</label>
        <input
            id="searchRecipe"
            bind:value={searchRecipe}
            type="text"
            placeholder="Parcourir Quizine..."
        />
        <input type="submit" value="Rechercher" disabled={!searchRecipe} />
    </form>
</div>

<!-- {#if recipes}
<ul>
    {#each recipes as recipe}
      <li>{recipe.title}</li>
    {/each}
</ul>
{/if} -->

<style>
    /*CONTAINER SEARCH RECIPE*/
    .container_search_recipe {
        max-width: 1200px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-top: 40px;
        border-radius: 20px;
        background-image: url(/images/bg_search.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 170px;
    }

    .container_search_recipe input {
        border: #00008b 1px solid;
    }

    form{
        /* display: flex;
        flex-direction: column; */
    }

    label{
        display:block;  
        font-size: 16px;  
        margin-bottom: 5px; 
        text-align: center;  
        color: black;    
        background-color: #fff;
    }

    input {
        padding: 5px;
        font-size: 24px;
    }

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 1024px) {
        .container_search_recipe {
            height: 150px;
        }

        input {
            font-size: 20px;
        }
    }

    @media screen and (max-width: 736px) {
        .container_search_recipe {
            height: 120px;
        }

        input {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 426px) {
        .container_search_recipe {
            height: 70px;
        }

        input {
            font-size: 16px;
        }
    }
</style>
