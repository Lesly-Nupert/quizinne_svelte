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
import RecipesFilter from "./pages/RecipesFilter.svelte";
import Contact from "./pages/Contact.svelte";
import LegalNotice from "./pages/LegalNotice.svelte";
import Account from "./pages/Account.svelte";
import UpdateAccount from "./pages/UpdateAccount.svelte";

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
    "/recipes/user/:userId": RecipesByUser,
    "/recipesFilter": RecipesFilter,
    "/contact": Contact,
    "/legalNotice": LegalNotice,
    "/user/:userId": Account,
    "/user/update/:userId": UpdateAccount,
};