<script>
  import { link } from "svelte-spa-router";

  import { Icon } from "svelte-awesome";
  import powerOff from "svelte-awesome/icons/powerOff";
  import user from "svelte-awesome/icons/user";
  import plus from "svelte-awesome/icons/plus";

  // Obtention du token et ID user dans le localStorage
  let token = localStorage.getItem("TOKEN");
  let userId = localStorage.getItem("USER_ID");

  // Message de déconnexion
  let messageDeconnexion;

  // Deconnexion + Redirect + Rechargement de la page
  // Remove TOKEN et USER_ID du localStorage
  function disconnect() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");

    messageDeconnexion = "Déconnexion de votre compte utilisateur";

    setTimeout(() => {
      window.location.href = "#/";
      window.location.reload();
    }, 1000);
  }
</script>

<header>
  <a href="/" class="link_home" aria-label="Accès à la page d'accueil" use:link>
    <div class="quizine">Quizinne</div>
  </a>

  <div class="login">
    <!-- UTILISATEUR NON CONNECTÉ -->
    {#if !token}
      <a
        title="Inscription"
        aria-label="Accès à la page d'inscription"
        class="btn_login"
        href="/signup"
        use:link>S'inscrire</a
      >

      <a
        title="Connexion"
        aria-label="Accès à la page de connexion"
        class="btn_login"
        href="/login"
        use:link>Se connecter</a
      >

      <!-- UTILISATEUR CONNECTÉ -->
    {:else}
      <a
        class="btn_login"
        href="/addRecipe"
        aria-label="Accès à la page d'ajout d'une recette"
        use:link><Icon data={plus} width="60" height="15" /></a
      >

      <a
        class="btn_account"
        href={`/user/${userId}`}
        aria-label="Accès à mon compte utilisateur"
        use:link><Icon data={user} width="60" height="15" /></a
      >

      <button
        aria-label="Se déconnecter de son compte utilisateur"
        class="btn_logout"
        on:click={disconnect}
        ><Icon data={powerOff} width="60" height="15" /></button
      >
    {/if}

    <!-- {#if messageDeconnexion} -->
      <div class="message_deconnexion" aria-live="assertive">
        {messageDeconnexion}
      </div>
    <!-- {/if} -->
  </div>
</header>
