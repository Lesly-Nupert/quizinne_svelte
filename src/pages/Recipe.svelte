<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(`id recette: ${params.id}`);

    // Variable du Formulaire ajout commentaire
    let content;

    // Variable initialisation du compteur à Zéro
    let count = 0;

    // Fonction pour charger une recette
    async function getRecipe() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/${params.id}`,
            );
            if (response.ok) {
                const recipe = await response.json();
                // console.log(recipe);
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
                console.log("Recette supprimée !");
                alert("Recette supprimée avec succès !");

                // Redirection
                window.location.href = "#/";
            } else {
                console.error("Erreur Suppression", response.status);
                alert("Erreur lors de la suppression !");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction pour ajouter un commentaire
    async function handleComment() {
        try {
            const data = { content };
            // console.log(data);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/comment/${
                    params.id
                }`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Bearer " + token,
                    },
                    body: new URLSearchParams(data).toString(),
                },
            );
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            console.log("Données soumises avec succès");
            alert("Commentaire publié !");

            // Rechargement de la page après ajout commentaire
            window.location.reload();
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction pour charger les commentaires
    async function getComments() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/${
                    params.id
                }/comments`,
            );
            if (response.ok) {
                const comments = await response.json();
                // console.log(comments);
                return comments;
            } else {
                console.error(
                    "Erreur lors de la récupération des commentaires",
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction pour Aimer une recette
    async function handleLike() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/like/${params.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                },
            );
            if (response.ok) {
                count += 1;
                console.log("Like fonctionne");
                alert("Vous aimez cette recette !");

                // Rechargement de la page après avoir cliquer sur J'aime
                window.location.reload();
            } else {
                console.error(
                    "Erreur Recette déjà liké par le membre",
                    response.status,
                );
                alert("Vous aimez déjà cette recette !");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction pour charger les J'aime
    async function getLikes() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/${
                    params.id
                }/likes`,
            );
            if (response.ok) {
                const likes = await response.json();
                // console.log(likes);
                return likes;
            } else {
                console.error("Erreur lors de la récupération des J'aime");
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

        <!-- *BLOC TEXTE RECETTE FAITE PAR  + LA DATE -->
        <!-- Méthode toLocaleDateString = Conversion en date locale -->
        <div class="doneAndLike">
            <p class="done_by">
                Fait par <span class="user">{recipe.pseudo}</span>, le
                <span class="date"
                    >{new Date(recipe.created_at).toLocaleDateString()}</span
                >
            </p>

            <!-- *BLOC DU COMPTEUR J'AIME -->
            <!-- https://svelte.dev/repl/f5acc8113ec14bc7946eff9687916fa1?version=3.4.1 -->
            <div class="like_content">
                {#await getLikes()}
                    <p>Chargement des J'aime</p>
                {:then likes}
                    <span class="like_count">
                        {likes.count}
                    </span>
                {/await}

                <button
                    class="like_click"
                    on:click|once={handleLike}
                    disabled={!token}
                    title="Cliquer pour aimer la recette"
                    aria-label="Ajouter un J'aime à la recette"
                >
                    J'aime
                </button>
            </div>
        </div>

        <!-- *BLOC INGREDIENTS + ETAPES-->
        <div class="container_ingredients">
            <h2>Ingrédients :</h2>
            <p class="ingredients">{recipe.ingredients}</p>
        </div>

        <div class="container_steps">
            <h2>Étapes :</h2>
            <p class="steps">{recipe.steps}</p>
        </div>

        <!-- *BLOC BOUTONS MODIFIER + SUPPRIMER UNE RECETTE -->
        <!-- Si User connecté visualise sa propre recette -->
        {#if token && userId == recipe.id_member}
            <a
                title="Modifier votre recette"
                aria-label="Accès à la page de modification de votre recette"
                href={`/recipes/update/${recipe.id_recipe}`}
                use:link
                class="btn_patch_recipe">Modifier la recette</a
            >

            <form on:submit|preventDefault={deleteRecipe} class="delete_recipe">
                <button
                    type="submit"
                    class="btn_delete_recipe"
                    title="Supprimer votre recette"
                    aria-label="Suppression de votre recette"
                >
                    Supprimer la recette
                </button>
            </form>
        {/if}
    {/await}

    <!-- * BLOC FORMULAIRE AJOUT COMMENTAIRE-->
    <div class="container_addComment">
        <form on:submit|preventDefault={handleComment}>
            <label for="content">Partager un commentaire :</label>
            <textarea
                bind:value={content}
                name="contents"
                id="content"
                placeholder="Commentaires..."
                required
            ></textarea>
            <button
                disabled={!token}
                title="Publier un commentaire"
                aria-label="Publication du commentaire"
                >Publier commentaire</button
            >
        </form>
    </div>

    <!-- *BLOC COMMENTAIRE DES MEMBRES-->
    <div class="container_comments">
        {#await getComments()}
            <p>Chargement des commentaires</p>
        {:then comments}
            {#each comments as comment}
                <section class="comments">
                    <p class="content">{comment.content}</p>
                    <span class="content_pseudo_date">{comment.pseudo}</span>
                    <span class="content_pseudo_date">{`-`}</span>
                    <span class="content_pseudo_date">
                        {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                </section>
            {/each}
        {/await}
    </div>
</div>

<style>
    .like_content {
        display: flex;
    }

    .like_count {
        padding: 5px;
    }

    .like_click {
        width: 55px;
        font-weight: 300;
        border-radius: 20px;
        cursor: pointer;
        background: linear-gradient(
            90deg,
            hsla(277, 79%, 84%, 1) 0%,
            hsla(204, 95%, 77%, 1) 100%
        );
    }

    .content {
        font-size: 16px;
    }

    .content_pseudo_date {
        color: #777575;
    }

    .container_comments {
        max-width: 700px;
        margin-top: 50px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .comments {
        border-bottom: lightgray 2px solid;
        margin-bottom: 10px;
        line-height: 1.7;
    }

    .container_addComment {
        max-width: 700px;
        margin-top: 50px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .container_addcomment button {
        margin-top: 10px;
        display: block;
        padding: 5px;
    }

    .doneAndLike {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .container_details_recipe {
        max-width: 700px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    textarea {
        width: 100%;
        padding: 8px;
        font-size: 16px;
    }

    button {
        display: block;
        padding: 5px;
        cursor: pointer;
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
        border: 5px solid #5b59c7;
        border-radius: 10px;
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
        width: 134px;
        border: 1px solid black;
        border-radius: 2px;
        text-align: center;
        text-decoration: none;
        color: black;
        background-color: #efefef;
        padding: 5px;
    }

    .btn_delete_recipe {
        cursor: pointer;
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
