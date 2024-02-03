<script>
    import Welcome from "../components/Welcome.svelte";
    import SearchRecipe from "../components/SearchRecipe.svelte";
    import LinkAllRecipes from "../components/LinkAllRecipes.svelte";
    import LastRecipes from "../components/LastRecipes.svelte";
    import ThreeLastRecipes from "../components/ThreeLastRecipes.svelte";
</script>

<section class="welcome">
    <Welcome />
</section>

<SearchRecipe />
<LinkAllRecipes />
<LastRecipes />

<section class="container_cards_recipes">
    <ThreeLastRecipes />
</section>

<style>
    .container_cards_recipes {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    .welcome{
        margin-top: 35px;
    }
</style>
