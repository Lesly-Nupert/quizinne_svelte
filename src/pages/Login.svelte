<script>
    // Variables du Formulaire Connexion
    let email, password;

    

    // Fonction d'authentification
    async function handleSubmit() {
        try {
            const data = { email, password };
            console.log(data);

            const response = await fetch(import.meta.env.VITE_API_BASE_URL + "login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(data).toString(),
            });

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

                console.log("Données soumises avec succès");
                alert("Connexion réussie !");

                // Mémorisation du token et userID dans le localStorage
                localStorage.setItem("TOKEN", token);
                localStorage.setItem("USER_ID", userId);
                
                //Redirection + Rechargement
                window.location.href = "#/";
                window.location.reload();

            } else {
                alert("Compte utilisateur inexistant ou identifiants érronés !")

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


    <h1>CONNEXION <span>💻</span></h1>
    
    <div class="form_login">
        <form on:submit|preventDefault={handleSubmit} >
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
    
            <input class="submit" type="submit" value="Se connecter" />
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








