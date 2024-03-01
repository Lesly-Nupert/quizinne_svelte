<script>
  import { link } from "svelte-spa-router";
</script>

<nav class="nav_menu">
  <a
    href="/recipes/category/entries"
    use:link
    aria-label="Accès à la catégorie des entrées">Entrées</a
  >
  <a
    href="/recipes/category/dishes"
    aria-label="Accès à la catégorie des plats"
    use:link>Plats</a
  >
  <a
    href="/recipes/category/desserts"
    aria-label="Accès à la catégorie des desserts"
    use:link>Desserts</a
  >
  <a
    href="/recipes/category/drinks"
    aria-label="Accès à la catégorie des boissons"
    use:link>Boissons</a
  >
</nav>
