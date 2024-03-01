<script>
  import { onMount } from "svelte";

  // Route dynamique
  export let params = {};
  console.log(params.id);

  // Obtention du token et ID user dans le localStorage
  let token = localStorage.getItem("TOKEN");
  let userId = localStorage.getItem("USER_ID");

  // Déconnexion du compte utilisateur après mise à jour
  function disconnect() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");
  }

  // Variables du Formulaire Modification du mot de passe
  let user = {
    email: "",
    oldPassword: "",
    newPassword: "",
    signupOk: "",
    errorMessagePassword: "",
  };

  // REGEX
  function validateOldPassword(oldPassword) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;
    return passwordRegex.test(oldPassword);
  }
  function validateNewPassword(newPassword) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;
    return passwordRegex.test(newPassword);
  }

  onMount(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}user/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    user = await response.json();
  });

  // Fonction pour gérer la soumission du formulaire d'inscription
  async function handleSubmit() {
    try {
      const data = user;
      console.log(data);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}user/updatePassword/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
          body: new URLSearchParams(data).toString(),
        }
      );
      if (!response.ok) {
        user.errorMessagePassword = "";

        if (!validateOldPassword(user.oldpassword) || !validateNewPassword(user.newpassword)) {
          user.errorMessagePassword =
            "ERREUR : Vérifier votre saisie ! Vos mots de passe doivent contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial";
        }
      
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      // Retire le message d'erreur quand le mot de passe est OK
      user.errorMessagePassword = "";

      user.signupOk =
        "Mise à jour du mot de passe réussie ! Redirection vers la page de connexion";

      disconnect();

      setTimeout(() => {
        window.location.href = "#/login";
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  }
</script>

<main>
  {#if token && userId}
    <h1>Modifier mot de passe</h1>
    <section class="signup_and_login">
      <form on:submit|preventDefault={handleSubmit}>
        <label class="label_signup_login" for="email"
          >Votre email <span aria-hidden="true">*</span> :</label
        >
        <input
          bind:value={user.email}
          class="input_signup_login"
          type="email"
          name="email"
          id="email"
          placeholder="exemple@mail.com"
          required
          aria-required="true"
          maxlength="100"
          aria-describedby="emailDetails"
          disabled
        />

        <label class="label_signup_login" for="password1"
          >Taper votre ancien mot de passe <span aria-hidden="true">*</span> :</label
        >
        <input
          bind:value={user.oldPassword}
          class="input_signup_login"
          type="password"
          name="password"
          id="password1"
          placeholder="*******"
          required
          aria-required="true"
          minlength="8"
          maxlength="12"
        />

        <label class="label_signup_login" for="password2"
          >Taper votre nouveau mot de passe <span aria-hidden="true">*</span> :</label
        >
        <input
          bind:value={user.newPassword}
          class="input_signup_login"
          type="password"
          name="password"
          id="password2"
          placeholder="*******"
          required
          aria-required="true"
          minlength="8"
          maxlength="12"
          aria-describedby="passwordDetails"
        />

        <div class="info_input" id="passwordDetails" aria-hidden="true">
          Votre nouveau mot de passe doit contenir entre 8 et 12 caractères,
          avec au moins une lettre majuscule, un chiffre et un caractère
          spécial.
        </div>

        <input class="submit" type="submit" value="Envoyer" />

        {#if user.errorMessagePassword}
        <div class="error_message" id="email" aria-live="assertive">
          {user.errorMessagePassword}
        </div>
      {/if}

        {#if user.signupOk}
          <div aria-live="polite" class="signupOk">
            {user.signupOk}
          </div>

        {/if}
      </form>
    </section>
  {/if}
</main>
