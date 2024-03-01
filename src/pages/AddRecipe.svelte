<script>
  // Obtention du token dans le localStorage
  let token = localStorage.getItem("TOKEN");

  // Variables du Formulaire d'ajout d'une recette
  let category,
    title,
    image,
    ingredients,
    steps,
    time_cook_hours,
    time_cook_minutes,
    difficulty,
    nb_persons,
    addRecipeOk,
    errorMessage;

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
    formData.append("time_cook_hours", time_cook_hours);
    formData.append("time_cook_minutes", time_cook_minutes);
    formData.append("difficulty", difficulty);
    formData.append("nb_persons", nb_persons);
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
        }
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
          response.status
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
    <h1>AJOUTER UNE RECETTE</h1>
    <section class="add_and_update_recipe">
      <form on:submit|preventDefault={handleSubmit}>
        <label for="category"
          >Choisir une catégorie <span aria-hidden="true">*</span></label
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
          >Titre de la recette <span aria-hidden="true">*</span></label
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
        
        <label for="image">Télécharger une photo</label>
        <input
          on:change={handleFile}
          type="file"
          name="image"
          id="image"
          accept=".jpg, .jpeg, .png"
          aria-label="Télécharger une photo"
        />

        <label for="time_cook_hours"
          >Temps de préparation en heures <span aria-hidden="true">*</span
          ></label
        >
        <input
          bind:value={time_cook_hours}
          type="number"
          name="time_cook_hours"
          id="time_cook_hours"
          placeholder="Heures"
          required
          aria-required="true"
        />

        <label for="time_cook_minutes"
          >Temps de préparation en minutes <span aria-hidden="true">*</span
          ></label
        >
        <input
          bind:value={time_cook_minutes}
          type="number"
          name="time_cook_minutes"
          id="time_cook_minutes"
          placeholder="Minutes"
          required
          aria-required="true"
        />

        <label for="difficulty"
          >Niveau de difficulté <span aria-hidden="true">*</span></label
        >
        <select
          bind:value={difficulty}
          name="difficulty"
          id="difficulty"
          required
          aria-required="true"
        >
          <option value="Facile">Facile</option>
          <option value="Moyen">Moyen</option>
          <option value="Difficile">Difficile</option>
        </select>

        <label for="nb_persons"
          >Nombre de portions <span aria-hidden="true">*</span></label
        >
        <input
          bind:value={nb_persons}
          type="number"
          name="nb_persons"
          id="nb_persons"
          placeholder="Nombre de personnes"
          required
          aria-required="true"
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
        <label for="steps">Les étapes <span aria-hidden="true">*</span></label>

        <textarea
          bind:value={steps}
          name="steps"
          id="steps"
          placeholder="Les étapes"
          required
          aria-required="true"
          rows="10"
        ></textarea>
        <input class="submit" type="submit" value="Publier la recette" />

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
