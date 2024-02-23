<script>
    import { link } from "svelte-spa-router";
    function validateEmail(email) {
        let emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
        return emailRegex.test(email);
    }

    let pseudo, email, message, errorMessageEmail;

    // Configuration : https://web3forms.com/platforms/svelte-contact-form
    let status = "";
    const handleSubmit = async (data) => {
        status = "Submitting...";
        const formData = new FormData(data.currentTarget);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        if (!validateEmail(email)) {
            errorMessageEmail =
                "ERREUR Format d'email attendu : exemple@mail.com";
                return
        }

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
            status = result.message || "Success";
        }
    };
</script>

<main>
    <h1>Contactez-nous</h1>
    <section class="signup_and_login">
        <form
            class="signup_and_login form"
            on:submit|preventDefault={handleSubmit}
            action="https://api.web3forms.com/submit"
            method="POST"
        >
            <input
                type="hidden"
                name="access_key"
                value="9ae458c4-4aeb-43d2-aa59-95c7f0aa6315"
            />

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

            {#if errorMessageEmail}
                <div class="error_message" id="email" aria-live="assertive">
                    {errorMessageEmail}
                </div>
            {/if}

            <label for="message"
                >Tapez votre message <span aria-hidden="true">*</span> :</label
            >
            <textarea
            bind:value={message}
                class="textarea_contact"
                id="message"
                name="message"
                required
                aria-required="true"
                rows="3"
            ></textarea>

            <label for="checkbox" class="checkbox">Je consens à ce que ce site collecte et traite mes données
                personnelles soumises dans ce formulaire afin de répondre à ma
                demande <span aria-hidden="true">*</span></label>
            <input
                id="checkbox"
                type="checkbox"
                name="consent"
                required
                aria-required="true"
            />

            <input type="submit" value="Envoyer" class="submit" />

            <div hidden>{status}</div>
        </form>
    </section>
</main>

<style>
    /* .checkbox {
        margin-top: 10px;
    } */

    /* form textarea {
        width: 100%;
        margin-bottom: 15px;
        padding: 8px;
        font-size: 24px;
    } */
</style>
