// src/templates/RecipeTemplate.ts
import { RecipeCollection } from "../model/RecipeCollection";
import { RecipeItem } from "../model/RecipeItem";

export class RecipeTemplate {
  constructor(
    private recipeContainer: HTMLElement,
    private recipeCollection: RecipeCollection
  ) {}

  render(): void {
    this.recipeContainer.innerHTML = "";

    const recipes = this.recipeCollection.getAllRecipes();
    recipes.forEach((recipe) => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3>${recipe.title} ${recipe.isFavorite ? "⭐" : ""}</h3>
        <p><strong>Ingredients:</strong></p>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <p><strong>Instructions:</strong></p>
        <p>${recipe.instructions}</p>
        <button class="favorite-btn" data-id="${recipe.id}">
          ${recipe.isFavorite ? "Unfavorite" : "Favorite"}
        </button>
        <button class="delete-btn" data-id="${recipe.id}">Delete</button>
      `;

      this.recipeContainer.appendChild(card);
    });

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.target as HTMLButtonElement).dataset.id!;
        this.recipeCollection.toggleFavorite(id);
        this.render();
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = (e.target as HTMLButtonElement).dataset.id!;
        this.recipeCollection.removeRecipe(id);
        this.render();
      });
    });
  }
}


