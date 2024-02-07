<script>
    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");

    // https://svelte.dev/repl/f5acc8113ec14bc7946eff9687916fa1?version=3.4.1
    let count = 0;

    async function handleClick() {
        
        try {
            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL + "addLike",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                    body: JSON.stringify()
                },
            );

            if (response.ok) {
                count += 1;
                console.log("Like soumis avec succès");
            } else {
                console.error("Erreur lors de la soumission", response.status);
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

<button on:click={handleClick} disabled={!token}>
    {count} J'aime
</button>

<style>
    button {
        width: 100px;
        font-weight: 300;
        background: linear-gradient(
            90deg,
            hsla(277, 79%, 84%, 1) 0%,
            hsla(204, 95%, 77%, 1) 100%
        );
    }
</style>
