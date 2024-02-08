<script>
    // Obtention du token dans le localStorage
    let token = localStorage.getItem("TOKEN");

</script>

{#if !token}
<section>
    <h1>
        Bienvenue sur Quizine !
    </h1>
    
    <p>
        Quizine est une plateforme d'échanges de recettes.
        Découvrez les recettes de cuisine écrites par la communauté.
        Inscrivez-vous et ajoutez vos propres recettes !
    </p>
</section>
{/if}

<style>
    section{
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        border: 5px solid #5B59C7;
        border-radius: 10px;
    }

    h1{
        padding: 20px;
        font-size: 50px;
    }

    p{
        font-size: 30px;
        white-space: pre-line;
        padding-bottom: 20px;
        line-height: 1.3;
    }

    /* En dessous de */
    @media screen and (max-width: 1024px) {
        h1{
            font-size: 40px;
        }

        p{
        font-size: 25px;
    }
    }

    @media screen and (max-width: 768px) {
        h1 {
            font-size: 30px;
        }

        p{
        font-size: 20px;
    }
    }

    @media screen and (max-width: 576px) {
        h1 {
            font-size: 20px;
        }

        p{
        font-size: 16px;
    }

    }

</style>