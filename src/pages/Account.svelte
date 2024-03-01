<script>
  // Routeur optimisé pour Single Page Application (SPA)
  import { link } from "svelte-spa-router";

  // Route dynamique
  export let params = {};
  console.log(params.id);

  // Obtention du token et ID user dans le localStorage
  let token = localStorage.getItem("TOKEN");
  let userId = localStorage.getItem("USER_ID");

  // Message confirmation de suppression du compte utilisateur
  let message;

  // Fonction pour vider le localStorage après suppression du compte utilisateur
  function disconnect() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");
  }

  // Fonction pour charger les identifiants des utilisateurs
  async function getUser() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        return user;
      } else {
        console.error("Erreur lors de la récupération d'un utilisateur");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }

  // Fonction pour suppression du compte utilisateur
  async function deleteAccount() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}user/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        console.log("Compte supprimé !");

        message = "Compte utilisateur supprimé avec succès !";

        disconnect();

        setTimeout(() => {
          window.location.href = "#/";
          window.location.reload();
        }, 1000);
      } else {
        console.error("Erreur Suppression", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }
</script>

<main>
  {#if token && userId}
    <h1>MON COMPTE</h1>
    <section class="account">
      {#await getUser()}
        <p>Chargement du compte utilisateur</p>
      {:then user}
        <p class="p_account">
          <span class="ident">Pseudo</span> : {user.pseudo}
        </p>
        <p class="p_account">
          <span class="ident">Email</span> : {user.email}
        </p>
        <p class="p_account">
          <span class="ident">Mot de passe</span> : ********
        </p>
      {/await}

      <a
        class="link_recipes_by_user"
        href={`/recipes/user/${userId}`}
        aria-label="Accès à la liste de mes recettes"
        use:link
        >Consulter mes recettes
      </a>

      <a
        class="link_update_account"
        href={`/user/update/${userId}`}
        aria-label="Accès à la page de modification de mon pseudo ou de mon email"
        use:link
        >Modifier mes identifiants
      </a>

      <a
        class="link_update_account"
        href={`/user/updatePassword/${userId}`}
        aria-label="Accès à la page de modification de mon mot de passe"
        use:link
        >Changer mon mot passe
      </a>

      <button on:click={deleteAccount} class="btn_delete_account" type="submit"
        >Supprimer mon compte définitivement</button
      >

      {#if message}
        <div aria-live="polite" class="signupOk">{message}</div>
      {/if}
    </section>
  {/if}
</main>
