import HomePage from "./pages/Homepage.svelte";
import Login from "./pages/Login.svelte";
import Signup from "./pages/Signup.svelte";
import Recipe from "./pages/Recipe.svelte";
import Recipes from "./pages/Recipes.svelte";
import CategoryEntries from "./pages/CategoryEntries.svelte";
import CategoryDishes from "./pages/CategoryDishes.svelte";
import CategoryDesserts from "./pages/CategoryDesserts.svelte";
import CategoryDrinks from "./pages/CategoryDrinks.svelte";
import AddRecipe from "./pages/AddRecipe.svelte";
import UpdateRecipe from "./pages/UpdateRecipe.svelte";
import RecipesByUser from "./pages/RecipesByUser.svelte";
// import CommentsbyRecipe from "./pages/CommentsbyRecipe.svelte";
// import ResultsSearchRecipes from "./pages/ResultsSearchRecipes.svelte";


export default {
    "/": HomePage,
    "/login": Login,
    "/signup": Signup,
    "/recipes/:id": Recipe,
    "/recipes": Recipes,
    "/recipes/category/entries": CategoryEntries,
    "/recipes/category/dishes": CategoryDishes,
    "/recipes/category/desserts": CategoryDesserts,
    "/recipes/category/drinks": CategoryDrinks,
    "/addRecipe": AddRecipe,
    "/recipes/update/:id": UpdateRecipe,
    "/recipes/user/:id": RecipesByUser,
    // "/comments/recipes/:recipe": CommentsbyRecipe,
    // "/resultsSearchRecipes": ResultsSearchRecipes,
};