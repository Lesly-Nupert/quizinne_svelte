<script>
    // Variables du Formulaire Inscription
    let pseudo, email, password;

    // Fonction pour gérer la soumission du formulaire d'inscription
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    async function handleSubmit() {
        try {
            const data = { pseudo, email, password };
            console.log(data);

            const response = await fetch(import.meta.env.VITE_API_BASE_URL + "signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(data).toString(),
            });
            // Indique le code HTTP si response KO
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            console.log("Données soumises avec succès");
            alert("Inscription réussie !");

            // Redirection 
            window.location.href = "#/login";

        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

<h1>INSCRIPTIONS <span>✍️</span></h1>

<div class="form_signup">
    <form on:submit|preventDefault={handleSubmit}>
        <label class="label_signup_login" for="pseudo">Pseudo :</label>
        <input
            bind:value={pseudo}
            class="input_signup_login"
            type="text"
            name="pseudo"
            id="pseudo"
            placeholder="Pseudo"
            required
            maxlength="20"
        />

        <label class="label_signup_login" for="email">Email :</label>
        <input
            bind:value={email}
            class="input_signup_login"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
        />

        <label class="label_signup_login" for="password">Mot de passe :</label>
        <input
            bind:value={password}
            class="input_signup_login"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            required
        />

        <input class="submit" type="submit" value="S'inscrire" />
    </form>
</div>

<style>
    h1 {
        text-align: center;
        margin-top: 50px;
        font-size: 48px;
    }

    span {
        color: #00008b;
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
