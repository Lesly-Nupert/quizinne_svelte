<script>
    // Chargement du composant dans le Document Object Model (DOM)
    // Equivalent au DOMContentLoad en JS vanilla
    import { onMount } from "svelte";

    // Obtention du token dans le localStorage
    let token = localStorage.getItem("TOKEN");

    // Variables du Formulaire Inscription
    let pseudo, email;

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Chargement des données existantes de l'utilisateur dans le composant
    onMount(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}users/${params.id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            );

            if (response.ok) {
                const user = await response.json();
                console.log(user);
                pseudo = user.pseudo;
                email = user.email;
            } else {
                console.error(
                    "Erreur lors de la récupération des infos du compte utilisateur",
                    response.status,
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    });

    // Fonction pour modifier les infos utilisateur après le onMount

    async function handleSubmit() {
        try {
            const data = { pseudo, email };
            console.log(data);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}users/update/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Bearer " + token,
                    },
                    body: new URLSearchParams(data).toString(),
                },
            );

            if (response.ok) {
                console.log("Mise à jour du compte utilisateur réussie !");
                alert("Mise à jour du compte réussie !");

                // Redirection
                window.location.href = "/#";
            } else {
                console.error("Erreur lors de la mise à jour", response.status);
                alert("Erreur lors de la mise à jour du compte utilisateur.");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>



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

        <!-- <label class="label_signup_login" for="password">Mot de passe :</label>
        <input
            bind:value={password}
            class="input_signup_login"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            required
        /> -->

        <input
            class="submit"
            type="submit"
            value="Mettre à jour mes identifiants"
        />
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