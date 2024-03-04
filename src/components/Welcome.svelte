<script>
  // Obtention du token dans le localStorage, si utilisateur connecté le message de bienvenue disparait
  let token = localStorage.getItem("TOKEN");
</script>

{#if !token}
  <section class="welcome">
    <h1>Bienvenue sur Quizinne !</h1>

    <p>
      Quizinne est une plateforme d'échanges de recettes. Découvrez les recettes
      de cuisine écrites par la communauté. Inscrivez-vous et ajoutez vos
      propres recettes !
    </p>
  </section>
{/if}
