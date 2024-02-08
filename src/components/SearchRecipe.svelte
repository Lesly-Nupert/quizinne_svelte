<script>
    import { link } from "svelte-spa-router";
    // cours Udemy: Svelte 3 et SvelteKit 1.0, formation complète pour débutants

    let searchRecipe = "";
    
    async function handleSearch() {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL + "recipesFilter",
                
            );
            if (response.ok) {
                const recipes = await response.json();
                console.log(recipes);
               
                // Redirection
                window.location.href = '#/recipesFilter';

            } else {
                console.error("Erreur lors de la récupération des recettes");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

</script>

<div class="container_search_recipe">
    <form>
        <label for="searchRecipe">Rechercher une recette</label>
        <input
            id="searchRecipe"
            bind:value={searchRecipe}
            type="text"
            placeholder="Parcourir Quizine..."
        />
        <input on:click={handleSearch} type="button" value="Rechercher" disabled={!searchRecipe} />
    </form>
</div>


<style>
    /*CONTAINER SEARCH RECIPE*/
    .container_search_recipe {
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-top: 40px;
        border-radius: 20px;
        background-image: url(/images/bg_search2.svg);
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
