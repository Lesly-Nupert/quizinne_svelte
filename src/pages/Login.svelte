<script>
    // Variables du Formulaire Connexion
    let email, password, errorMessage;

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

                //Redirection + Rechargement
                window.location.href = "#/";
                window.location.reload();
            } else {
                errorMessage =
                    "Email ou mot de passe incorrect. Veuillez réessayer";

                // Indique le code HTTP si response KO
                console.log(
                    "Erreur : " +
                        response.status +
                        ", Message : " +
                        response.statusText,
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
    
            <label class="label_signup_login" for="password">Mot de passe :</label>
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
    
            <input class="submit" type="submit" value="Se connecter" />
    
            {#if errorMessage}
                <div class="error_message">
                    {errorMessage}
                </div>
            {/if}
        </form>
    </section>
</main>
