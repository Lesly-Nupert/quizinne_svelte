<script>
  import { link } from "svelte-spa-router";
</script>

<footer>
  <span class="footer">Copyright 2024</span>
  <a href="#/legalNotice" use:link
    ><span class="footer">Mentions légales</span></a
  >
  <a href="#/contact" use:link><span class="footer">Contact</span></a>
</footer>
