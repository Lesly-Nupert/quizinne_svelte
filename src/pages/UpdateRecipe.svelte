<script>
    // Chargement du composant dans le Document Object Model (DOM)
    // Equivalent au DOMContentLoad en JS vanilla
    import { onMount } from 'svelte';
    
    // Obtention du token dans le localStorage
    let token = localStorage.getItem("TOKEN");

    // Variables du Formulaire de modification d'une recette
    let category, title, image, ingredients, steps;

    // Fonction pour le traitement de l'image
    function handleFile(event) {
        image = event.target.files[0];
    }

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Chargement des données existantes de la recette dans le composant
    onMount(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}recipes/${params.id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            });

            if (response.ok) {
                const recipe = await response.json();
                console.log(recipe);
                category = recipe.category;
                title = recipe.title;
                image = recipe.image;
                ingredients = recipe.ingredients;
                steps = recipe.steps;
            } else {
                console.error("Erreur lors de la récupération des détails de la recette", response.status);
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    });

    // Fonction pour modifier la recette après le onMount
    // FORMDATA car il y a un fichier à télécharger 
    async function handleSubmit() {
        const formData = new FormData();
        formData.append("category", category);
        formData.append("title", title);
        formData.append("image", image);
        formData.append("ingredients", ingredients);
        formData.append("steps", steps);

        try {

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}recipes/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: formData,
            });

            if (response.ok) {
                console.log("Recette mise à jour avec succès");
                alert("Mise à jour de la recette réussie !");

                // Redirection
                window.location.href = '/#';

            } else {
                console.error("Erreur lors de la mise à jour", response.status);
                alert("Erreur lors de la mise à jour de la recette.");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

</script>

<section class="add_and_update_recipe">
    <h1>MODIFIER LA RECETTE</h1>
    
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
    
        <input class="submit" type="submit" value="Mettre à jour la recette" />
    </form>
</section>

