<script>
  // Variables du Formulaire Connexion
  let email, password;
  let errorMessage = "";
  let loginOk = "";

  // Fonction d'authentification
  async function handleSubmit() {
    try {
      const data = { email, password };
      console.log(data);

      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        },
      );

      if (response.ok) {
        // On récupère le résultat au format JSON
        const result = await response.json();
        // console.log(result);

        // Puis le token
        const token = result.token;
        // On checke dans la console
        console.log(token);

        // Puis le userId de la méthode du postLogin du authControllers.js du serveur
        const userId = result.userId;
        console.log(userId);

        console.log("Connexion réussie !");

        // Mémorisation du token et userID dans le localStorage
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("USER_ID", userId);

        // Retire le message d'erreur quand c'est le login est OK
        errorMessage = "";

        loginOk = "Connexion réussie ! Redirection vers la page d'accueil";

        setTimeout(() => {
          window.location.href = "#/";
          window.location.reload();
        }, 1000);
      } else {
        errorMessage = "Email ou mot de passe incorrect. Veuillez réessayer";

        console.log(
          "Erreur : " + response.status + ", Message : " + response.statusText,
        );
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }
</script>

<main>
  <h1>Connexion</h1>
  <section class="signup_and_login">
    <form on:submit|preventDefault={handleSubmit}>
      <label class="label_signup_login" for="email"
        >Entrer votre email <span aria-hidden="true">*</span> :</label
      >
      <input
        bind:value={email}
        class="input_signup_login"
        type="email"
        name="email"
        id="email"
        placeholder="exemple@mail.com"
        required
        aria-required="true"
        maxlength="100"
        aria-describedby="emailDetails"
      />
      <div class="info_input" id="emailDetails" aria-hidden="true">
        Format d'email attendu : exemple@mail.com
      </div>

      <label class="label_signup_login" for="password"
        >Taper votre mot de passe <span aria-hidden="true">*</span> :</label
      >
      <input
        bind:value={password}
        class="input_signup_login"
        type="password"
        name="password"
        id="password"
        placeholder="*******"
        required
        aria-required="true"
        maxlength="12"
        aria-describedby="passwordDetails"
      />
      <div class="info_input" id="passwordDetails" aria-hidden="true">
        Votre mot de passe doit contenir entre 8 et 12 caractères, avec au moins
        une lettre majuscule, un chiffre et un caractère spécial.
      </div>

      <input class="submit" type="submit" value="Se connecter" />

      <!-- {#if errorMessage} -->
      <div class="error_message" aria-live="assertive">
        {errorMessage}
      </div>
      <!-- {/if} -->

      <!-- {#if loginOk} -->
      <div aria-live="polite" class="signupOk">{loginOk}</div>
      <!-- {/if} -->
    </form>
  </section>
</main>
