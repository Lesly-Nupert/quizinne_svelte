<script>
    // Variables du Formulaire Inscription
    let pseudo, email, password, errorMessageEmail;

    function validateEmail(email) {
        let emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
        return emailRegex.test(email);
    }

    // Fonction pour gérer la soumission du formulaire d'inscription
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
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
            // Indique le code HTTP si response KO
            if (!response.ok) {
                !validateEmail(email);
                errorMessageEmail =
                    "ERREUR Format d'email attendu : exemple@mail.com";

                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            console.log("Inscription réussie !");

            // Redirection
            window.location.href = "#/login";
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

<main>
    <h1>Inscription</h1>
    <section class="signup_and_login">
        <form on:submit|preventDefault={handleSubmit}>
            <label class="label_signup_login" for="pseudo">Pseudo :</label>
            <input
                bind:value={pseudo}
                class="input_signup_login"
                type="text"
                name="pseudo"
                id="pseudo"
                placeholder="pseudo"
                required
                minlength="5"
                maxlength="20"
            />

            <label class="label_signup_login" for="email">Email :</label>
            <input
                bind:value={email}
                class="input_signup_login"
                type="email"
                name="email"
                id="email"
                placeholder="exemple@mail.com"
                required
                maxlength="100"
            />
            {#if errorMessageEmail}
                <div class="error_message">
                    {errorMessageEmail}
                </div>
            {/if}

            <label class="label_signup_login" for="password"
                >Mot de passe :</label
            >
            <input
                bind:value={password}
                class="input_signup_login"
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                required
                minlength="5"
                maxlength="12"
            />

            <input class="submit" type="submit" value="S'inscrire" />
        </form>
    </section>
</main>
