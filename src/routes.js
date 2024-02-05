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
import User from "./pages/User.svelte";
import Users from "./pages/Users.svelte";
import RecipesByUser from "./pages/RecipesByUser.svelte";
// import UserUpdate from "./pages/UserUpdate.svelte";
// import Favorites from "./pages/Favorites.svelte";



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
    "/users/:id": User,
    "/users/": Users,
    "/recipes/user/:id": RecipesByUser,
    // "/users/update/:id": UserUpdate,
    // "/recipes/favorites/": Favorites,
};