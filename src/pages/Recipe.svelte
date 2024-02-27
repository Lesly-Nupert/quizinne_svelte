<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Exporte la variable params pour récupérer l'identifiant de la recette
    // Route dynamique
    export let params = {};
    console.log(`id recette: ${params.id}`);

    // Variable du Formulaire ajout commentaire
    let content;

    // Variable compteur des J'aime
    let count = 0;

    // Message
    let messageDeleteRecipe = "";

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
                messageDeleteRecipe =
                    "Recette supprimée avec succès ! Redirection vers la page d'accueil";

                setTimeout(() => {
                    window.location.href = "#/";
                }, 1000);
            } else {
                console.error("Erreur Suppression", response.status);
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
            // alert("Commentaire publié !");

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

                window.location.reload();
            } else {
                console.error(
                    "Erreur Recette déjà liké par le membre",
                    response.status,
                );
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

<main class="container_details_recipe">
    {#await getRecipe()}
        <p>Chargement de la recette</p>
    {:then recipe}
        <h1>{recipe.title}</h1>

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
                        <span class="text_like">Cette recette a été aimée</span>
                        {likes.count} <span class="text_like">fois</span>
                    </span>
                {/await}

                <button
                    class="like_click"
                    on:click|once={handleLike}
                    disabled={!token}
                    aria-label="Aimer la recette"
                >
                    J'aime
                </button>
                <!-- {#if token && userId && count >1}
                <p>Vous aimez déjà cette recette</p>
                {/if} -->
            </div>
        </div>

        <img
            class="img_recipe"
            src={`http://localhost:3000/${recipe.image}`}
            alt={`${recipe.title}`}
        />

        <!-- *BLOC TEMPS DE PREPARATION + NIVEAU DIFFICULTÉ + NB DE PORTIONS-->
        <div class="container_info_cook">
            <p class="done_by">
                <b>Temps de préparation :</b>
                {recipe.time_cook_hours} heures et {recipe.time_cook_minutes} minutes
            </p>
            <p class="done_by">
                <b>Niveau de difficulté :</b>
                {recipe.difficulty} 
            </p>
            <p class="done_by">
                <b>Nombre de portions :</b>
                {recipe.nb_persons}
            </p>
        </div>

        <!-- *BLOC INGREDIENTS + ETAPES-->
        <div class="container_ingredients">
            <h2>Ingrédients</h2>
            <p class="ingredients">{recipe.ingredients}</p>
        </div>

        <div class="container_steps">
            <h2>Étapes</h2>
            <p class="steps">{recipe.steps}</p>
        </div>

        <!-- *BLOC BOUTONS MODIFIER + SUPPRIMER UNE RECETTE -->
        <!-- *Si User connecté visualise sa propre recette -->
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
                    aria-label="Suppression immédiate de votre recette"
                >
                    Supprimer la recette
                </button>
                {#if messageDeleteRecipe}
                    <div class="message" aria-live="assertive">
                        {messageDeleteRecipe}
                    </div>
                {/if}
            </form>
        {/if}
    {/await}

    <!-- * BLOC FORMULAIRE AJOUT COMMENTAIRE-->
    <div class="container_addComment">
        <form on:submit|preventDefault={handleComment}>
            <label for="content">Partager un commentaire :</label>
            <textarea
                class="textarea_comment"
                bind:value={content}
                name="contents"
                id="content"
                placeholder="Commentaires..."
                required
            ></textarea>
            <button
                class="btn_addComment"
                disabled={!token}
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
                    <span class="content_pseudo_date"
                        >{`commenté par ${comment.pseudo}`}</span
                    >
                    <span class="content_pseudo_date">{`le`}</span>
                    <span class="content_pseudo_date">
                        {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                </section>
            {/each}
        {/await}
    </div>
</main>
