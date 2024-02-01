<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    //coeur test
    // import { Icon } from "svelte-awesome";
    // import heart from "svelte-awesome/icons/heart";

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Fonction pour charger une recette
    async function getRecipe() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/${params.id}`,
            );
            if (response.ok) {
                const recipe = await response.json();
                console.log(recipe);
                return recipe;
            } else {
                console.error("Erreur lors de la récupération de la recette");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction pour supprimer une recette
    async function deleteRecipe() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/delete/${
                    params.id
                }`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            );

            if (response.ok) {
                console.log("Recette supprimée avec succès");
                alert("Recette supprimée avec succès !");

                // Redirection
                window.location.href = "/#";
            } else {
                console.error("Erreur lors de la suppression", response.status);
                alert("Erreur lors de la suppression de la recette !");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

<div class="container_details_recipe">
    {#await getRecipe()}
        <p>Chargement de la recette</p>
    {:then recipe}
        <h1>{recipe.title}</h1>

        <img
            class="img_recipe"
            src={`http://localhost:3000/${recipe.image}`}
            alt={`photo de ${recipe.title}`}
        />

        <!-- Méthode toLocaleDateString = Conversion en date locale -->
        <p class="done_by">
            Fait par <span class="user">{recipe.pseudo}</span>, le
            <span class="date"
                >{new Date(recipe.created_at).toLocaleDateString()}</span
            >
        </p>

        <!-- <span>
            <Icon data={heart} color="red" width="32" height="32" />
        </span> -->

        <div class="container_ingredients">
            <h2>Ingrédients :</h2>
            <p class="ingredients">{recipe.ingredients}</p>
        </div>

        <div class="container_steps">
            <h2>Étapes :</h2>
            <p class="steps">{recipe.steps}</p>
        </div>

        <!-- Si User connecté visualise sa propre recette -->
        {#if token && userId == recipe.id_member}
            <a  title="Modifier votre recette"
                aria-label="Accès à la page de modification de votre recette"
                href={`/recipes/update/${recipe.id_recipe}`}
                use:link
                class="btn_patch_recipe">Modifier la recette</a
            >

            <form on:submit|preventDefault={deleteRecipe} class="delete_recipe">
                <button type="submit" class="btn_delete_recipe">
                    Supprimer la recette
                </button>
            </form>
        {/if}

        <!-- Juste pour le visuel-->
        <div class="container_comments">
            <textarea name="" id="" placeholder="Commentaires..."></textarea>
            <button>Publier commentaire</button>
        </div>
    {/await}
</div>

<style>
    .container_details_recipe {
        max-width: 700px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    .container_comments {
        max-width: 700px;
        margin-top: 50px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .container_comments button {
        margin-top: 10px;
    }

    textarea {
        width: 100%;
        padding: 8px;
        font-size: 16px;
    }

    button {
        display: block;
        padding: 5px;
    }

    h1 {
        text-align: center;
        margin-top: 50px;
        font-size: 48px;
        word-wrap: break-word; 
        max-width: 100%;
    }

    h1::first-letter {
        text-transform: uppercase;
    }

    .img_recipe {
        margin-top: 50px;
        border: 5px solid lightgrey;
    }

    .done_by {
        font-size: 16px;
    }

    h2 {
        font-size: 36px;
        color: #00008b;
    }

    .container_ingredients,
    .container_steps {
        margin-top: 30px;
        margin-left: 10px;
        margin-right: 10px;
    }

    p {
        font-size: 24px;
        line-height: 1.2;
    }

    .ingredients,
    .steps {
        white-space: pre-line;
    }

    .btn_patch_recipe {
        font-size: 13px;
        margin-top: 35px;
        margin-left: 10px;
        width: 125px;
        border: 1px solid black;
        border-radius: 2px;
        text-align: center;
        text-decoration: none;
        color: black;
        background-color: #efefef;
        padding: 5px;
    }

    .delete_recipe {
        border-radius: 5px;
        cursor: pointer;
        margin-top: 15px;
        margin-bottom: -10px;
        margin-left: 10px;
    }

    .btn_patch_recipe:hover {
        background-color: #00008b;
        color: #fff;
    }
    .btn_delete_recipe:hover {
        background-color: red;
        color: #fff;
    }

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 768px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 36px;
        }

        h2 {
            font-size: 30px;
        }

        p {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 500px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 24px;
        }

        h2 {
            font-size: 20px;
        }

        p {
            font-size: 16px;
        }
    }
</style>
