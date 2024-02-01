<script>
    import { link } from "svelte-spa-router";

    export let params = {};
    console.log(params.id);

    let searchRecipe;

    async function handleSubmit() {
        try {
            const response = await fetch(`http://localhost:3000/recipes/${params.id}`);
            if (!response.ok) {
                throw new Error("Problème lors de la récupération des données");
            }
            const searchRecipe = await response.json();
        } catch (error) {
            console.error("Erreur lors de la recherche", error);
            // alert("Erreur réseau.");
        }
    }
</script>

<div class="container_search_recipe">
    <input
        bind:value={searchRecipe}
        type="text"
        placeholder="Rechercher une recette"
    />
    <button on:submit={handleSubmit}>Rechercher</button>
</div>


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
        background-image: url(/images/background_search.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 170px;
    }

    .container_search_recipe input {
        border: #00008b 1px solid;
    }

    input,
    button {
        padding: 5px;
        font-size: 24px;
    }

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 1024px) {
        .container_search_recipe {
            height: 150px;
        }

        input,
        button {
            font-size: 20px;
        }
    }

    @media screen and (max-width: 736px) {
        .container_search_recipe {
            height: 120px;
        }

        input,
        button {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 426px) {
        .container_search_recipe {
            height: 70px;
        }

        input,
        button {
            font-size: 16px;
        }
    }
</style>
