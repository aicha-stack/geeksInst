// src/main.ts
import "./style.css";
import { RecipeCollection } from "./model/RecipeCollection";
import { RecipeItem } from "./model/RecipeItem";
import { RecipeTemplate } from "./templates/RecipeTemplate";

const recipeCollection = new RecipeCollection();
const recipeContainer = document.getElementById("recipeContainer")!;
const recipeTemplate = new RecipeTemplate(recipeContainer, recipeCollection);

// Initial render
recipeTemplate.render();

// Handle form submission
const form = document.getElementById("recipeEntryForm") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = (document.getElementById("recipeTitle") as HTMLInputElement).value;
  const ingredients = (document.getElementById("ingredients") as HTMLTextAreaElement).value
    .split("\n")
    .filter((i) => i.trim() !== "");
  const instructions = (document.getElementById("instructions") as HTMLTextAreaElement).value;

  const newRecipe = new RecipeItem(title, ingredients, instructions);
  recipeCollection.addRecipe(newRecipe);
  recipeTemplate.render();

  form.reset();
});

// Clear all button
const clearButton = document.getElementById("clearRecipesButton")!;
clearButton.addEventListener("click", () => {
  recipeCollection.clearAll();
  recipeTemplate.render();
});
