<script>
  // Variables du Formulaire Inscription
  let pseudo, email, password;

  let errorMessageEmail = "";
  let errorMessagePassword = "";
  let signupOk = "";

  // REGEX
  function validateEmail(email) {
    let emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    return emailRegex.test(email);
  }
  function validatePassword(password) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;
    return passwordRegex.test(password);
  }

  // Fonction pour gérer la soumission du formulaire d'inscription
  async function handleSubmit() {
    try {
      const data = { pseudo, email, password };
      console.log(data);

      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        },
      );
      if (!response.ok) {
        errorMessageEmail = "";
        errorMessagePassword = "";

        if (!validateEmail(email)) {
          errorMessageEmail =
            "ERREUR Format d'email attendu : exemple@mail.com";
        }

        if (!validatePassword(password)) {
          errorMessagePassword =
            "ERREUR Votre mot de passe doit contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial";
        }

        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      console.log("Inscription réussie !");

      // Retire le message d'erreur quand le formulaire est OK
      errorMessageEmail = "";
      errorMessagePassword = "";

      signupOk = "Inscription réussie ! Redirection vers la page de connexion";

      setTimeout(() => {
        window.location.href = "#/login";
      }, 1000);
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }
</script>

<main>
  <h1>Inscription</h1>
  <section class="signup_and_login">
    <form on:submit|preventDefault={handleSubmit}>
      <label class="label_signup_login" for="pseudo"
        >Créer votre pseudo <span aria-hidden="true">*</span> :</label
      >
      <input
        bind:value={pseudo}
        class="input_signup_login"
        type="text"
        name="pseudo"
        id="pseudo"
        placeholder="pseudo"
        required
        aria-required="true"
        minlength="5"
        maxlength="20"
        aria-describedby="pseudoDetails"
      />
      <div class="info_input" id="pseudoDetails" aria-hidden="true">
        Votre pseudo doit contenir au moins 5 caractères
      </div>

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

      <!-- {#if errorMessageEmail} -->
      <div class="error_message" id="email" aria-live="assertive">
        {errorMessageEmail}
      </div>
      <!-- {/if} -->

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

      <!-- {#if errorMessagePassword} -->
      <div class="error_message" id="email" aria-live="assertive">
        {errorMessagePassword}
      </div>
      <!-- {/if} -->

      <label for="checkbox" class="checkbox"
        >En cochant cette case, j'accepte que mes données personnelles soumises
        dans ce formulaire soient utilisées afin de valider mon inscription <span
          aria-hidden="true">*</span
        ></label
      >
      <input
        id="checkbox"
        type="checkbox"
        name="consent"
        required
        aria-required="true"
      />

      <input class="submit" type="submit" value="S'inscrire" />

      <!-- {#if signupOk} -->
      <div aria-live="polite" class="signupOk">{signupOk}</div>
      <!-- {/if} -->
    </form>
  </section>
</main>




<script>
  let name = '';
</script>

<input bind:value={name}>