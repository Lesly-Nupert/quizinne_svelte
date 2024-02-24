<script>
    import { onMount } from "svelte";

    // Exporte la variable params pour récupérer l'identifiant id
    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Variables du Formulaire de mise à jour du pseudo et du mail
    let user = {
        pseudo: "",
        email: "",
        errorMessageEmail: "",
        signupOk: "",
    };

    function validateEmail(email) {
        let emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
        return emailRegex.test(email);
    }

    onMount(async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}user/${userId}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        user = await response.json();
    });

    // Fonction pour gérer la soumission du formulaire d'inscription
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    async function handleSubmit() {
        try {
            const data = user ;
            console.log(data);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/update/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Bearer " + token,
                    },
                    body: new URLSearchParams(data).toString(),
                },
            );
            if (!response.ok) {
                !validateEmail(user.email);
                user.errorMessageEmail =
                    "ERREUR Format d'email attendu : exemple@mail.com";

                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            user.signupOk = "Mise à jour réussie ! Redirection vers la page de connexion";

            setTimeout(() => {
                window.location.href = "#/login";
            }, 1000);
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>


<main>
    {#if token && userId}
    <h1>MODIFIER MES IDENTIFIANTS</h1>
    <section class="signup_and_login">
        <form on:submit|preventDefault={handleSubmit}>
            <label class="label_signup_login" for="pseudo"
                >Modifier votre pseudo <span aria-hidden="true">*</span> :</label
            >
            <input
                bind:value={user.pseudo}
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
                >Modifier votre email <span aria-hidden="true">*</span> :</label
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
            />
            <div class="info_input" id="emailDetails" aria-hidden="true">
                Format d'email attendu : exemple@mail.com
            </div>

            {#if user.errorMessageEmail}
                <div class="error_message" id="email" aria-live="assertive">
                    {user.errorMessageEmail}
                </div>
            {/if}

            <label for="checkbox" class="checkbox">Je consens à ce que ce site collecte et traite mes données personnelles soumises dans ce formulaire afin de valider mon inscription  <span aria-hidden="true">*</span></label>
            <input
                id="checkbox"
                type="checkbox"
                name="consent"
                required
                aria-required="true"
            />
            <input class="submit" type="submit" value="Envoyer" />

            {#if user.signupOk}
                <div aria-live="polite" class="signupOk">{user.signupOk}</div>
            {/if}
        </form>
    </section>
    {/if}
</main>
