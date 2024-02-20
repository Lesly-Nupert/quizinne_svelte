<script>
    // Obtention du token dans le localStorage
    let token = localStorage.getItem("TOKEN");

    // Variables du Formulaire d'ajout d'une recette
    let category, title, image, ingredients, steps, addRecipeOk, errorMessage;

    // Fonction pour le traitement de l'image
    function handleFile(event) {
        image = event.target.files[0];
    }

    // Fonction pour ajouter une recette
    // FORMDATA car il y a un fichier à télécharger
    async function handleSubmit() {
        const formData = new FormData();
        formData.append("category", category);
        formData.append("title", title);
        formData.append("image", image);
        formData.append("ingredients", ingredients);
        formData.append("steps", steps);

        try {
            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL + "addRecipe",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    body: formData,
                },
            );

            if (response.ok) {
                console.log("Recette soumise avec succès");

                addRecipeOk =
                    "Recette ajoutée avec succès ! Redirection vers la page de toutes les recettes";

                setTimeout(() => {
                    window.location.href = "/#/recipes";
                }, 1000);
            } else {
                console.error(
                    "Erreur lors de la soumission des données",
                    response.status,
                );
                errorMessage =
                    "Erreur lors de la soumission de la recette, veuillez réessayer !";
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

{#if token}
    <main>
        <section class="add_and_update_recipe">
            <h1>AJOUTER UNE RECETTE</h1>
            <form on:submit|preventDefault={handleSubmit}>
                <label for="category"
                    >Choisir une catégorie <span aria-hidden="true">*</span
                    ></label
                >
                <select
                    bind:value={category}
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
                    >Titre de la recette <span aria-hidden="true">*</span
                    ></label
                >
                <input
                    bind:value={title}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Titre de la recette"
                    required
                    aria-required="true"
                    autocapitalize="sentences"
                />
                <label for="image"
                    >Télécharger une photo <span aria-hidden="true">*</span
                    ></label
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
                    bind:value={ingredients}
                    name="ingredients"
                    id="ingredients"
                    placeholder="Les ingrédients"
                    required
                    aria-required="true"
                    rows="5"
                ></textarea>
                <label for="steps"
                    >Les étapes <span aria-hidden="true">*</span></label
                >

                <textarea
                    bind:value={steps}
                    name="steps"
                    id="steps"
                    placeholder="Les étapes"
                    required
                    aria-required="true"
                    rows="10"
                ></textarea>
                <input
                    class="submit"
                    type="submit"
                    value="Publier la recette"
                />

                {#if addRecipeOk}
                    <div aria-live="polite" class="addRecipeOk">
                        {addRecipeOk}
                    </div>
                {/if}

                {#if errorMessage}
                    <div class="error_message" aria-live="assertive">
                        {errorMessage}
                    </div>
                {/if}
            </form>
        </section>
    </main>
{/if}
