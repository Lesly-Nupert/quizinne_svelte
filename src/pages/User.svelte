<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");
    console.log(userId);
</script>

{#if token}
<h1>MON COMPTE</h1>

<section>
    <h2>MES INFORMATIONS</h2>

    <!-- href="/users/update/:id" -->
    <a  use:link
        href={`/users/update${userId }`}
        title="Mes infos personnelles"
        aria-label="Accès à mes infomations personnelles"
    >
        Informations du compte
    </a>

    <h2>MES RECETTES</h2>

    <!-- href="/recipes/user/:id" -->

    <a  use:link
        href={`/recipes/user/${userId }`}
        title="Liste de toutes mes recettes"
        aria-label="Accès à toutes mes recettes"
    >
        Mes créations
    </a>
</section>
{/if}

<style>
    h1 {
        text-align: center;
        margin-top: 50px;
        font-size: 48px;
    }

    section {
        max-width: 500px;
        margin: auto;
        text-align: center;
        margin-top: 20px;
    }

    h2 {
        margin: 20px;
    }

    a {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #00008b;
        margin: 50px;
    }

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 768px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 36px;
        }
    }

    @media screen and (max-width: 500px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 24px;
        }
    }
</style>
