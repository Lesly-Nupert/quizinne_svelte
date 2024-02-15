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

<h1>Inscription</h1>

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

    <input class="submit" type="submit" value="S'inscrire" />

</form>

<style>
    .error_message {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
        color: darkred;
        font-weight: bolder;
        text-align: center;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 2px;
    }

    /* https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation  */

    input:invalid {
        border: red solid 3px;
    }

    input:valid:not([type="submit"]) {
        background-color: #ddffdd;
    }

    h1 {
        text-align: center;
        margin-top: 50px;
        font-size: 48px;
    }

    form {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
    }

    form label,
    form input {
        width: 100%;
        margin-bottom: 15px;
        padding: 8px;
        font-size: 24px;
    }

    form label {
        font-weight: bold;
        margin-bottom: 0px;
    }

    .submit:hover {
        background-color: #00008b;
        color: #fff;
        cursor: pointer;
        transition: background 1000ms ease-in-out;
    }

    /* Largeur d'écran inférieur à */
    @media screen and (max-width: 768px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 36px;
        }

        form label,
        form input {
            width: 100%;
            margin-bottom: 15px;
            padding: 8px;
            font-size: 18px;
        }
    }

    @media screen and (max-width: 500px) {
        h1 {
            text-align: center;
            margin-top: 50px;
            font-size: 24px;
        }

        form label,
        form input {
            width: 100%;
            margin-bottom: 15px;
            padding: 8px;
            font-size: 16px;
        }
    }
</style>
