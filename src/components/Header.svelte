<script>
    import { link } from "svelte-spa-router";

    import { Icon } from "svelte-awesome";
    import powerOff from "svelte-awesome/icons/powerOff";
    import user from "svelte-awesome/icons/user";
    import plus from "svelte-awesome/icons/plus";

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");
    
    // Ouvrir/fermer la navbar en mode tablette et tel portable
    let MenuOpen = false;
    function toggleMenu() {
        MenuOpen = !MenuOpen;
    }

    // Connexion
    function connect() {
        localStorage.setItem("TOKEN", "token");
    }

    // Deconnexion + Redirect + Rechargement de la page
    // Remove TOKEN et USER_ID du localStorage
    function disconnect() {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER_ID");
        
        window.location.href = "#/";
        window.location.reload();
    }
</script>

<header>
    <!-- Classes directives cela évite d'écrire une logique plus longue ou opérateurs ternaires
    https://svelte.dev/tutorial/classes -->
    <nav class="nav_header" class:open={MenuOpen}>
        <a href="/recipes/category/entries" use:link>Entrées</a>
        <a href="/recipes/category/dishes" use:link>Plats</a>
        <a href="/recipes/category/desserts" use:link>Desserts</a>
        <a href="/recipes/category/drinks" use:link>Boissons</a>
    </nav>

    <div class="burger">
        <button type="button" on:click={toggleMenu}>☰ Menu</button>
    </div>

    <a href="/" class="link_home" use:link>
        <div class="quizine">Quizine</div>
    </a>

    <div class="login">
        <!-- USER DISCONNECTED -->
        {#if !token}
            <a 
            title="Inscription"
            aria-label="Accès à la page d'inscription"
            class="btn_login" href="/signup" use:link>S'inscrire</a>

            <a 
            title="Connexion"
            aria-label="Accès à la page de connexion"
            on:clic={connect} class="btn_login" href="/login" use:link
                >Se connecter</a
            >

            <!-- USER CONNECTED -->
        {:else}
            <a  title="Ajouter une recette"
                class="btn_login"
                href="/addRecipe"
                aria-label="Accès à la page d'ajout d'une recette"
                use:link><Icon data={plus} width="50" /></a
            >

            <a  title="Consulter mes recettes"
                class="btn_account"
                href={`/recipes/user/${userId}`}
                aria-label="Accès à la liste de mes recettes"
                use:link><Icon data={user} width="50" /></a
            >
            <button
                title="Deconnexion"
                aria-label="Se déconnecter de son compte utilisateur"
                class="btn_logout"
                on:click={disconnect}
                ><Icon data={powerOff} width="50" /></button
            >
        {/if}
    </div>
</header>


