<script>
    // Obtention du token dans le localStorage
    let token = localStorage.getItem("TOKEN");

    // Variables du Formulaire d'ajout d'une recette
    let category, title, image, ingredients, steps;

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
                alert("Recette ajoutée avec succès !");

                // Redirection
                window.location.href = '/#';

            } else {
                console.error("Erreur lors de la soumission des données", response.status);
                alert(
                    "Erreur lors de la soumission de la recette, veuillez réessayer !",
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>


{#if token}
    <h1>AJOUTER UNE RECETTE</h1>

    <form on:submit|preventDefault={handleSubmit}>
        <label for="category">Choisir une catégorie</label>
        <select bind:value={category} name="category" id="category" required>
            <option value="Entrées">Entrées</option>
            <option value="Plats">Plats</option>
            <option value="Desserts">Desserts</option>
            <option value="Boissons">Boissons</option>
        </select>

        <label for="title">Titre de la recette</label>
        <input
            bind:value={title}
            type="text"
            name="title"
            id="title"
            placeholder="Titre de la recette"
            required
        />

        <label for="image">Télécharger une photo</label>
        <!-- on:change car fichier et non texte -->
        <input
            on:change={handleFile}
            type="file"
            name="image"
            id="image"
            accept=".jpg, .jpeg, .png"
            required
        />

        <label for="ingredients">Ingrédients</label>
        <textarea
            bind:value={ingredients}
            name="ingredients"
            id="ingredients"
            placeholder="Les ingrédients"
            required
            rows="5"
        ></textarea>

        <label for="steps">Les étapes</label>
        <textarea
            bind:value={steps}
            name="steps"
            id="steps"
            placeholder="Les étapes"
            required
            rows="10"
        ></textarea>

        <input class="submit" type="submit" value="Publier la recette" />
    </form>
{/if}

<style>
    h1 {
        text-align: center;
        margin-top: 50px;
        font-size: 48px;
    }

    form {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
    }

    form label,
    form input,
    form select,
    form textarea {
        width: 100%;
        margin-bottom: 15px;
        padding: 8px;
        font-size: 24px;
    }

    form label {
        font-weight: bold;
        margin-bottom: 0px;
    }

    .submit:hover {
        background-color: #00008b;
        color: #fff;
        cursor: pointer;
        transition: background 1000ms ease-in-out;
    }

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 768px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 36px;
        }

        form label,
        form input,
        form select,
        form textarea {
            width: 100%;
            margin-bottom: 15px;
            padding: 8px;
            font-size: 18px;
        }
    }

    @media screen and (max-width: 500px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 24px;
        }

        form label,
        form input,
        form select,
        form textarea {
            width: 100%;
            margin-bottom: 15px;
            padding: 8px;
            font-size: 16px;
        }
    }
</style>
