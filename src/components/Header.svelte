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
                aria-label="Accès à la page d'ajout de recettes"
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
                aria-label="Bouton pour se déconnecter"
                class="btn_logout"
                on:click={disconnect}
                ><Icon data={powerOff} width="50" /></button
            >
        {/if}
    </div>
</header>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Caveat&family=Pacifico&family=Rubik+Burned&display=swap');


    .link_home {
        text-decoration: none;
        padding: 20px;
    }

    .quizine {
        font-size: 50px;
        color: #fff;
        padding: 5px;
        border-width: 6px;
        border-radius: 10px;
        font-family: 'Black Ops One', sans-serif;
        text-shadow: 2px 2px 2px #000;  
    }

    header {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 250px;
        font-size: 24px;
        border-radius: 10px;
        margin-top: 0.5px;
        border: 5px solid #5B59C7;
        /* background-color: lightgray; */
        /* background: linear-gradient(90deg, hsla(210, 71%, 55%, 1) 0%, hsla(334, 77%, 69%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(254, 68%, 9%, 1) 0%, hsla(269, 97%, 37%, 1) 33%, hsla(320, 77%, 55%, 1) 66%, hsla(316, 41%, 93%, 1) 100%); */
        /* background: linear-gradient(90deg, rgb(68, 65, 251) 0%, hsla(295, 94%, 76%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(280, 84%, 41%, 1) 0%, hsla(218, 97%, 56%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(232, 73%, 65%, 1) 0%, hsla(279, 33%, 48%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(210, 91%, 39%, 1) 0%, hsla(321, 55%, 50%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(354, 95%, 24%, 1) 0%, hsla(234, 70%, 24%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(210, 71%, 55%, 1) 0%, hsla(334, 77%, 69%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(344, 97%, 63%, 1) 0%, hsla(232, 90%, 59%, 1) 100%); */
        /* background: linear-gradient(90deg, hsla(291, 79%, 51%, 1) 0%, hsla(240, 91%, 73%, 1) 100%); */
        background: linear-gradient(90deg, hsla(210, 91%, 39%, 1) 0%, hsla(321, 55%, 50%, 1) 100%);
        height: 220px; 
    }

    .nav_header a {
        text-decoration: none;
        padding: 15px;
        color: #fff;
        text-shadow: 2px 2px 2px #000; 
    }

    .burger button {
        display: none;
        font-size: 24px;
        cursor: pointer;
        color: #00008b;
    }

    .btn_login,
    .btn_account {
        text-decoration: none;
        padding: 5px;
        margin: 10px;
        color: #fff;
        font-weight: bold;
        border: 2px solid #00008b;
        border-radius: 20px;
        text-shadow: 2px 2px 2px #000; 
    }

    .btn_logout {
        text-decoration: none;
        padding: 5px;
        margin: 10px;
        color: #fff;
        font-weight: bold;
        border: 2px solid #00008b;
        border-radius: 20px;
        font-size: 24px;
        background-color: transparent;
    }

    .btn_login:hover,
    .btn_logout:hover {
        background-color: #00008b;
        color: #fff;
    }

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 1024px) {
        .quizine {
            font-size: 30px;
        }

        header {
            font-size: 20px;
            height: 180px;
        }

        .btn_logout {
            font-size: 20px;
        }
    }

    @media screen and (max-width: 768px) {
        header {
            font-size: 18px;
            height: 200px;
        }

        .burger button {
            display: block;
            font-size: 18px;
        }

        .nav_header {
            display: none;
        }

        .nav_header.open {
            display: block;
        }

        .btn_logout {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 480px) {
        header {
            font-size: 16px;
        }

        .nav_header.open {
            display: block;
        }

        .nav_header a {
            font-size: 12px;
        }

        .btn_logout {
            font-size: 16px;
        }
    }
</style>
