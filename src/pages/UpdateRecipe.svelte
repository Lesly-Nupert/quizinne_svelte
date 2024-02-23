<script>
    // Chargement du composant dans le Document Object Model (DOM)
    // Equivalent au DOMContentLoad en JS vanilla
    import { onMount } from "svelte";

    // Obtention du token dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Variables du Formulaire de modification d'une recette
    let recipe = {
        category: "",
        title: "",
        image: "",
        ingredients: "",
        steps: "",
        addRecipeOk: "",
        errorMessage: "",
    };

    // Fonction pour le traitement de l'image
    function handleFile(event) {
        recipe.image = event.target.files[0];
    }

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Chargement des données existantes de la recette dans le composant
    onMount(async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}recipes/${params.id}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );

        recipe = await response.json();
    });

    // Fonction pour modifier la recette après le onMount
    // FORMDATA car il y a un fichier à télécharger
    async function handleSubmit() {
        const formData = new FormData();
        formData.append("category", recipe.category);
        formData.append("title", recipe.title);
        formData.append("image", recipe.image);
        formData.append("ingredients", recipe.ingredients);
        formData.append("steps", recipe.steps);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}recipes/update/${
                    params.id
                }`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    body: formData,
                },
            );

            if (response.ok) {
                console.log("Recette mise à jour avec succès");
                recipe.addRecipeOk =
                    "Recette mise à jour avec succès ! Redirection vers la page de toutes les recettes";

                setTimeout(() => {
                    window.location.href = "/#/recipes";
                }, 1000);
            } else {
                console.error("Erreur lors de la mise à jour", response.status);
                recipe.errorMessage =
                    "Erreur lors de la mise à jour de la recette, veuillez réessayer !";
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>


<main>
    {#if token && userId}
    <section class="add_and_update_recipe">
        <h1>MODIFIER LA RECETTE</h1>
    
        <form on:submit|preventDefault={handleSubmit}>
            <label for="category"
                >Choisir une catégorie <span aria-hidden="true">*</span></label
            >
            <select
                bind:value={recipe.category}
                name="category"
                id="category"
                required
                aria-required="true"
            >
                <option value="Entrées">Entrées</option>
                <option value="Plats">Plats</option>
                <option value="Desserts">Desserts</option>
                <option value="Boissons">Boissons</option>
            </select>
    
            <label for="title"
                >Titre de la recette <span aria-hidden="true">*</span></label
            >
            <input
                bind:value={recipe.title}
                type="text"
                name="title"
                id="title"
                placeholder="Titre de la recette"
                required
                aria-required="true"
            />
    
            <label for="image"
                >Télécharger une photo <span aria-hidden="true">*</span></label
            >
            <!-- on:change car fichier et non texte -->
            <input
                on:change={handleFile}
                type="file"
                name="image"
                id="image"
                accept=".jpg, .jpeg, .png"
            />
    
            <label for="ingredients"
                >Ingrédients <span aria-hidden="true">*</span></label
            >
            <textarea
                bind:value={recipe.ingredients}
                name="ingredients"
                id="ingredients"
                placeholder="Les ingrédients"
                required
                aria-required="true"
                rows="5"
            ></textarea>
    
            <label for="steps">Les étapes <span aria-hidden="true">*</span></label>
            <textarea
                bind:value={recipe.steps}
                name="steps"
                id="steps"
                placeholder="Les étapes"
                required
                aria-required="true"
                rows="10"
            ></textarea>
    
            <input class="submit" type="submit" value="Mettre à jour la recette" />
    
            {#if recipe.addRecipeOk}
                <div aria-live="polite" class="addRecipeOk">
                    {recipe.addRecipeOk}
                </div>
            {/if}
    
            {#if recipe.errorMessage}
                <div class="error_message" aria-live="assertive">
                    {recipe.errorMessage}
                </div>
            {/if}
        </form>
    </section>
    {/if}
</main>
